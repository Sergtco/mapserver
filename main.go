package main

import (
	"mapserver/view"
	"net/http"

	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
)

func index(ctx echo.Context) error {
	return renderView(ctx, view.App(), http.StatusOK)
}

func renderView(ctx echo.Context, t templ.Component, status int) error {
	if err := t.Render(ctx.Request().Context(), ctx.Response().Writer); err != nil {
		return err
	}
	return nil
}

func main() {
	app := echo.New()
	app.GET("/", index)
	app.Start("localhost:6969")
}
