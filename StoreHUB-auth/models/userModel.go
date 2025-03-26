package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName    string    `gorm:"not null"`
	LastName     string    `gorm:"not null"`
	Username     string    `gorm:"unique;not null"`
	Email        string    `gorm:"unique;not null"`
	Password     string    `gorm:"not null"`
	ProfilePhoto string    `gorm:"default:'default-profile.png'"`
	Bio          string    `gorm:"type:text"` 
	Status       string    `gorm:"type:varchar(50);default:'active'"` // Account status
	Posts        []Post    `gorm:"constraint:OnDelete:CASCADE;"` // Relation to Posts
	Likes        []Like    `gorm:"constraint:OnDelete:CASCADE;"` // Relation to Likes
	Comments     []Comment `gorm:"constraint:OnDelete:CASCADE;"` // Relation to Comments
	Sandbox      []Sandbox `gorm:"constraint:OnDelete:CASCADE;"` // Relation to Sandbox
}
