package main

import (
	"log"
	"time" // Added for time.Time
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// Database connection details
	dsn := "root:Ayush1raj@@@tcp(127.0.0.1:3306)/storehub?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	// Run database migrations
	err = db.AutoMigrate(
		&User{}, // Add all models to migrate here
	)
	if err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	log.Println("Database migration completed successfully!")
}

// User model
type User struct {
	ID        uint      `gorm:"primaryKey"`
	Username  string    `gorm:"unique;not null"`
	Email     string    `gorm:"unique;not null"`
	Password  string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}
