package models

import "gorm.io/gorm"


type Like struct {
	gorm.Model
	UserID uint `gorm:"not null"`
	User   User
	PostID uint `gorm:"not null"` 
	Post   Post 
}
