package handlers

import (
	"jobtrackker/handlers/jobscan"
	"jobtrackker/handlers/jobscheduling"
	"jobtrackker/handlers/jobscrapelist"
	"jobtrackker/handlers/workerhandler"
	"jobtrackker/internal/web"
	"jobtrackker/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	// Add this import
)

func CreateHandlers() *fiber.App {
	app := fiber.New()

	// Enable CORS for all routes
	app.Use(cors.New())
	// Public routes
	public := app.Group("/api")
	registerPublicHandlers(public)

	private := app.Group("/api/private", middleware.AuthRequired)
	registerPrivateHandlers(private)

	return app
}

// registerPublicHandlers register public handlers and Init them
func registerPublicHandlers(root fiber.Router) {

	handlers := web.HandlerRegistrator{}

	// TODO: register your handlers here
	handlers.Register(
		new(FormHandler),
		new(jobscan.JobscanHandler),
		new(jobscheduling.JobschedulingHandler),
		new(jobscrapelist.JobscrapelistHandler),
		new(workerhandler.WorkerHandler),
	)

	handlers.Init(root)
}

// registerPrivateHandlers register private handlers and Init them
func registerPrivateHandlers(root fiber.Router) {

	handlers := web.HandlerRegistrator{}
	handlers.Register(
		new(Privatetest),
	)

	handlers.Init(root)

}
