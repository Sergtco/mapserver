package main

import (
	"github.com/labstack/echo/v4"
	"mapserver/handlers"
)

func main() {
	app := echo.New()
	app.GET("/", handlers.Index)
	app.Start("localhost:6969")
}
