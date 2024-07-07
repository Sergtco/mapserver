package main

import (
	"github.com/labstack/echo/v4"
	"mapserver/handlers"
)

func main() {
	app := echo.New()
	app.GET("/", handlers.Index)
	app.POST("/evaluate", handlers.Evaluate)
	app.POST("/best_points", handlers.BestPoints)
	app.Static("/api/static", "static")
	app.Start("0.0.0.0:6969")
	// app.Start("127.0.0.1:6969")
}
