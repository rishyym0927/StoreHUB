package models

import "gorm.io/gorm"


type Sandbox struct {
	gorm.Model
	UserID      uint   `gorm:"not null"` 
	User        User   `gorm:"foreignKey:UserID"`
	Title       string `gorm:"not null"`
	Description string `gorm:"not null"`
	Elink        string `gorm:"not null"`
}
