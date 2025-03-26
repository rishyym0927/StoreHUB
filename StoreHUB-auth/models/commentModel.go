package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	UserID uint   `gorm:"not null"` 
	User   User  
	PostID uint   `gorm:"not null"` 
	Post   Post   
	Content string `gorm:"not null"` 
}
