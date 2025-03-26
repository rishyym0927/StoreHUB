package models

import "gorm.io/gorm"


type Post struct {
	gorm.Model
	UserID       uint     `gorm:"not null"` 
	User         User    
	Title        string   `gorm:"not null"`
	Description  string   `gorm:"not null"`
	Images       string   `gorm:"type:text"` 
	CodeSnippet  string   `gorm:"type:text"`
	Framework    string   `gorm:"not null"`
	ComponentType string  `gorm:"not null"`
	Likes        []Like   `gorm:"constraint:OnDelete:CASCADE;"`
	Comments     []Comment `gorm:"constraint:OnDelete:CASCADE;"`
}
