package main

import (
	"net/http"
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/rishyym0927/StoreHUB-auth/config"
	"github.com/rishyym0927/StoreHUB-auth/controllers"
	"github.com/rishyym0927/StoreHUB-auth/initializers"
	"github.com/rishyym0927/StoreHUB-auth/middlewares"
	"github.com/rishyym0927/StoreHUB-auth/routes"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDatabase()
	config.InitRedis()
	initializers.InitLogger()
	initializers.InitPrometheus()
}

func main() {

	initializers.SugarLogger.Info("Server is starting...")
	r := gin.Default()

	// CORS middleware configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173","http://16.171.63.105:3000","https://store-hub-sandy.vercel.app","http://ec2-16-171-63-105.eu-north-1.compute.amazonaws.com:3000","https://a600-2401-4900-884a-9283-7d25-319f-7caa-cc6.ngrok-free.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	r.Use(func(c *gin.Context) {
		// Increment the request counter for the method and endpoint
		initializers.RequestCounter.WithLabelValues(c.Request.Method, c.FullPath()).Inc()
		c.Next()
	})

	// Prometheus /metrics endpoint
	r.GET("/metrics", gin.WrapH(promhttp.Handler()))

	// Example route where requestCounter is incremented
	r.GET("/", func(c *gin.Context) {
		// Increment the request counter for this route and method
		initializers.RequestCounter.WithLabelValues(c.Request.Method, "/").Inc()
		c.JSON(http.StatusOK, gin.H{
			"message": "Request allowed, Github Actions on the go, final change",
			"time":    time.Now(),
		})
	})

	// Authentication routes
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)

	r.GET("/validate", middlewares.RequireAuth, controllers.Validate)

	// User routes
	r.GET("/users", middlewares.RequireAuth, controllers.GetAllUsers)
	r.GET("/users/email/:email", middlewares.RequireAuth, controllers.GetUserByEmail)
	r.GET("/users/username/:username", middlewares.RequireAuth, controllers.GetUserByUsername)
	r.POST("/users/:email/photo", middlewares.RequireAuth, controllers.UploadPhoto)
	r.DELETE("/users/:email", middlewares.RequireAuth, controllers.DeleteUser)
	r.GET("/users/me", middlewares.RequireAuth, controllers.GetCurrentUser)

	// Post routes
	r.POST("/posts", middlewares.RequireAuth, controllers.CreatePost)
	r.GET("/posts", middlewares.RequireAuth, controllers.GetAllPosts)
	r.GET("/posts/:id", middlewares.RequireAuth, controllers.GetPostByID)

	// Comment routes
	r.POST("/comments/:postId", middlewares.RequireAuth, controllers.CreateComment)
	r.GET("/comments/:postId", middlewares.RequireAuth, controllers.GetPostComments)

	// WebSocket routes
	routes.WebSocketRoutes(r)
	
	//chats
	r.GET("/chats", middlewares.RequireAuth, controllers.GetChats)

	// Like routes
	r.POST("/likes", middlewares.RequireAuth, controllers.CreateLike)

	// Sandbox routes
	r.POST("/sandbox", middlewares.RequireAuth, controllers.CreateSandbox)
	r.GET("/sandbox", middlewares.RequireAuth, controllers.GetAllSandboxes)
	r.GET("/sandbox/:id", middlewares.RequireAuth, controllers.GetSandboxByID)

	// Run the server
	initializers.SugarLogger.Info("Server running on port 3000")
	r.Run(":3000")
}
