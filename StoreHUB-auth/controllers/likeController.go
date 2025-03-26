package controllers

import (
    "github.com/gin-gonic/gin"
    "github.com/rishyym0927/StoreHUB-auth/initializers"
    "github.com/rishyym0927/StoreHUB-auth/models"
	"net/http"
)


func CreateLike(c *gin.Context) {
    postID := c.Param("postId")
    
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

   
    var existingLike models.Like
    result := initializers.DB.Where("user_id = ? AND post_id = ?", currentUser.ID, postID).First(&existingLike)
    if result.Error == nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "You have already liked this post"})
        return
    }

 
    like := models.Like{
        UserID: currentUser.ID,
        PostID: post.ID,
    }

    if err := initializers.DB.Create(&like).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "error": "Failed to create like",
            "details": err.Error(),
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message": "Post liked successfully",
        "like": like,
    })
}