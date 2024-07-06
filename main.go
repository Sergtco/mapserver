package main

import (
	"github.com/labstack/echo/v4"
	"mapserver/handlers"
)

func main() {
	app := echo.New()
	app.GET("/", handlers.Index)
	app.GET("/evaluate", handlers.Evaluate)
	app.GET("/best_points", handlers.BestPoints)
	app.Static("/api/static", "static")
	app.Start("localhost:6969")
}
