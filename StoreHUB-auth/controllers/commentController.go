package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rishyym0927/StoreHUB-auth/initializers"
	"github.com/rishyym0927/StoreHUB-auth/models"
)

// CreateComment creates a new comment
func CreateComment(c *gin.Context) {
    postID := c.Param("postId")
    
    var body struct {
        Content string `json:"content" binding:"required"`
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


    var post models.Post
    if err := initializers.DB.First(&post, postID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
        return
    }


    comment := models.Comment{
        UserID:  currentUser.ID,
        PostID:  post.ID,
        Content: body.Content,
    }

    if err := initializers.DB.Create(&comment).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to create comment",
            "details": err.Error(),
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message": "Comment added successfully",
        "comment": comment,
    })
}

// GetPostComments retrieves all comments for a specific post
func GetPostComments(c *gin.Context) {
    postID := c.Param("postId")

   
    if postID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
        return
    }

    
    var post models.Post
    if err := initializers.DB.First(&post, postID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
        return
    }

   
    var comments []models.Comment
    result := initializers.DB.
        Preload("User"). 
        Where("post_id = ?", postID).
        Order("created_at DESC"). 
        Find(&comments)
    
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to retrieve comments",
            "details": result.Error.Error(),
        })
        return
    }

  
    response := gin.H{
        "comments": comments,
        "total_comments": len(comments),
        "post_id": postID,
    }

   
    if len(comments) == 0 {
        response["comments"] = []models.Comment{}
    }

    c.JSON(http.StatusOK, response)
}


func GetCommentsByUser(c *gin.Context) {
    userID := c.Param("userId")

 
    if userID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }


    var user models.User
    if err := initializers.DB.First(&user, userID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    
    var comments []models.Comment
    result := initializers.DB.
        Preload("Post"). 
        Where("user_id = ?", userID).
        Order("created_at DESC").
        Find(&comments)
    
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to retrieve user comments",
            "details": result.Error.Error(),
        })
        return
    }


    response := gin.H{
        "comments": comments,
        "total_comments": len(comments),
        "user_id": userID,
    }

 
    if len(comments) == 0 {
        response["comments"] = []models.Comment{}
    }

    c.JSON(http.StatusOK, response)
}