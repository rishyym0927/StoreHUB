package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	
	"github.com/rishyym0927/StoreHUB-auth/config"
	"github.com/rishyym0927/StoreHUB-auth/initializers"
	"github.com/rishyym0927/StoreHUB-auth/models"
)


func generateCacheKey(prefix string, params ...string) string {
    key := prefix
    for _, param := range params {
        key += ":" + param
    }
    return key
}

// GetAllPosts with Redis caching
func GetAllPosts(c *gin.Context) {
   
    cacheKey := generateCacheKey("posts")

  
    cachedPosts, err := config.RDB.Get(config.Ctx, cacheKey).Result()
    if err == nil {
       
        var processedPosts []gin.H
        if err := json.Unmarshal([]byte(cachedPosts), &processedPosts); err == nil {
            c.JSON(http.StatusOK, gin.H{
                "posts": processedPosts,
                "count": len(processedPosts),
                "cached": true,
            })
            fmt.Printf("Cache hit for key: %v\n", cacheKey);
            return
        }
    }

    
    var posts []models.Post
    
  
    query := initializers.DB.Preload("User").
        Preload("Likes").
        Preload("Likes.User").
        Preload("Comments").
        Preload("Comments.User")

   

    // Execute query
    result := query.Find(&posts)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to retrieve posts",
            "details": result.Error.Error(),
        })
        return
    }

   
    processedPosts := make([]gin.H, len(posts))
    for i, post := range posts {
        var images []string
        if post.Images != "" {
            json.Unmarshal([]byte(post.Images), &images)
        }

     
        likes := make([]gin.H, len(post.Likes))
        for j, like := range post.Likes {
            likes[j] = gin.H{
                "id": like.ID,
                "user": gin.H{
                    "id":       like.User.ID,
                    "username": like.User.Username,
                },
            }
        }

      
        comments := make([]gin.H, len(post.Comments))
        for j, comment := range post.Comments {
            comments[j] = gin.H{
                "id":      comment.ID,
                "content": comment.Content,
                "user": gin.H{
                    "id":       comment.User.ID,
                    "username": comment.User.Username,
                },
                "createdAt": comment.CreatedAt,
            }
        }

        processedPosts[i] = gin.H{
            "id":            post.ID,
            "title":         post.Title,
            "description":   post.Description,
            "images":        images,
            "codeSnippet":   post.CodeSnippet,
            "framework":     post.Framework,
            "componentType": post.ComponentType,
            "user": gin.H{
                "id":       post.User.ID,
                "username": post.User.Username,
            },
            "likes":    likes,
            "comments": comments,
            "createdAt": post.CreatedAt,
        }
    }

    // Cache the processed posts
    postsJSON, err := json.Marshal(processedPosts)
    if err == nil {
  
        config.RDB.Set(config.Ctx, cacheKey, string(postsJSON), 5*time.Minute)
    }

    c.JSON(http.StatusOK, gin.H{
        "posts": processedPosts,
        "count": len(processedPosts),
    })
}

// GetPostByID with Redis caching
func GetPostByID(c *gin.Context) {
    postID := c.Param("id")
    cacheKey := generateCacheKey("post", postID)

    // Try to get from cache first
    cachedPost, err := config.RDB.Get(config.Ctx, cacheKey).Result()
    if err == nil {
        
        var postResponse gin.H
        if err := json.Unmarshal([]byte(cachedPost), &postResponse); err == nil {
            postResponse["cached"] = true
            c.JSON(http.StatusOK, postResponse)
            return
        }
    }

    var post models.Post
    result := initializers.DB.
        Preload("User").
        Preload("Likes").
        Preload("Likes.User").
        Preload("Comments").
        Preload("Comments.User").
        First(&post, postID)

    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Post not found",
            "details": result.Error.Error(),
        })
        return
    }

 
    var images []string
    if post.Images != "" {
        json.Unmarshal([]byte(post.Images), &images)
    }

  
    likes := make([]gin.H, len(post.Likes))
    for j, like := range post.Likes {
        likes[j] = gin.H{
            "id": like.ID,
            "user": gin.H{
                "id":       like.User.ID,
                "username": like.User.Username,
            },
        }
    }

 
    comments := make([]gin.H, len(post.Comments))
    for j, comment := range post.Comments {
        comments[j] = gin.H{
            "id":      comment.ID,
            "content": comment.Content,
            "user": gin.H{
                "id":       comment.User.ID,
                "username": comment.User.Username,
            },
            "createdAt": comment.CreatedAt,
        }
    }

    postResponse := gin.H{
        "id":            post.ID,
        "title":         post.Title,
        "description":   post.Description,
        "images":        images,
        "codeSnippet":   post.CodeSnippet,
        "framework":     post.Framework,
        "componentType": post.ComponentType,
        "user": gin.H{
            "id":       post.User.ID,
            "username": post.User.Username,
        },
        "likes":    likes,
        "comments": comments,
        "createdAt": post.CreatedAt,
    }

 
    postJSON, err := json.Marshal(postResponse)
    if err == nil {
   
        config.RDB.Set(config.Ctx, cacheKey, string(postJSON), 5*time.Minute)
    }

    c.JSON(http.StatusOK, postResponse)
}

// Update and Delete methods to invalidate cache
func UpdatePost(c *gin.Context) {
    postID := c.Param("id")

    var body struct {
        Title         string   `json:"title"`
        Description   string   `json:"description"`
        Images        []string `json:"images"`
        CodeSnippet   string   `json:"codeSnippet"`
        Framework     string   `json:"framework"`
        ComponentType string   `json:"componentType"`
    }

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var post models.Post
    result := initializers.DB.First(&post, postID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Post not found",
            "details": result.Error.Error(),
        })
        return
    }

    if body.Title != "" {
        post.Title = body.Title
    }
    if body.Description != "" {
        post.Description = body.Description
    }
    if len(body.Images) > 0 {
        imagesJSON, err := json.Marshal(body.Images)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process images"})
            return
        }
        post.Images = string(imagesJSON)
    }
    if body.CodeSnippet != "" {
        post.CodeSnippet = body.CodeSnippet
    }
    if body.Framework != "" {
        post.Framework = body.Framework
    }
    if body.ComponentType != "" {
        post.ComponentType = body.ComponentType
    }

    result = initializers.DB.Save(&post)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to update post",
            "details": result.Error.Error(),
        })
        return
    }

    // Invalidate cache for this specific post and clear all posts caches
    config.RDB.Del(config.Ctx, 
        generateCacheKey("post", fmt.Sprintf("%v", postID)),
        generateCacheKey("posts"),
    )

    c.JSON(http.StatusOK, gin.H{
        "message": "Post updated successfully",
        "post": post,
    })
}

func DeletePost(c *gin.Context) {
    postID := c.Param("id")

    var post models.Post
    result := initializers.DB.First(&post, postID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{
            "error": "Post not found",
            "details": result.Error.Error(),
        })
        return
    }

    result = initializers.DB.Delete(&post)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to delete post",
            "details": result.Error.Error(),
        })
        return
    }

   
    config.RDB.Del(config.Ctx, 
        generateCacheKey("post", fmt.Sprintf("%v", postID)),
        generateCacheKey("posts"),
    )

    c.JSON(http.StatusOK, gin.H{
        "message": "Post deleted successfully",
    })
}

func CreatePost(c *gin.Context) {
    var body struct {
        Title         string   `json:"title" binding:"required"`
        Description   string   `json:"description" binding:"required"`
        Images        []string `json:"images"`
        CodeSnippet   string   `json:"codeSnippet"`
        Framework     string   `json:"framework"`
        ComponentType string   `json:"componentType"`
    }

    if err := c.ShouldBindJSON(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    user, exists := c.Get("user")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        return
    }

    currentUser, ok := user.(*models.User)
    if !ok {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user type"})
        return
    }

    var imagesJSON []byte
    var err error
   
    if len(body.Images) == 0 {
        body.Images = []string{"../assets/default_image.jpg"}
    }
    imagesJSON, err = json.Marshal(body.Images)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process images"})
        return
    }

    post := models.Post{
        UserID:        currentUser.ID,
        Title:         body.Title,
        Description:   body.Description,
        Images:        string(imagesJSON),  // Store as a JSON string
        CodeSnippet:   body.CodeSnippet,
        Framework:     body.Framework,
        ComponentType: body.ComponentType,
    }

  
    result := initializers.DB.Create(&post)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to create post", 
            "details": result.Error.Error(),
        })
        return
    }

    err = config.SendPostCreationEmail(currentUser.Email, currentUser.FirstName, post)
    if err != nil {
        fmt.Printf("Error sending email: %v\n", err)
    }


    config.RDB.Del(config.Ctx, "posts")
    fmt.Printf("Deleted cache for keys:\n")

    c.JSON(http.StatusOK, gin.H{
        "message": "Post created successfully", 
        "post": post,
    })
}