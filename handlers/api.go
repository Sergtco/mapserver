package handlers

import (
	"net/http"

	"github.com/a-h/templ"
	"github.com/labstack/echo/v4"
)

func renderView(ctx echo.Context, t templ.Component, status int) error {
	ctx.Response().WriteHeader(status)
	if err := t.Render(ctx.Request().Context(), ctx.Response().Writer); err != nil {
		ctx.Response().WriteHeader(http.StatusInternalServerError)
		return err
	}
	return nil
}
