package handlers

import (
	"github.com/labstack/echo/v4"
	"mapserver/view"
	"net/http"
)

func Index(ctx echo.Context) error {
	return renderView(ctx, view.App(), http.StatusOK)
}
