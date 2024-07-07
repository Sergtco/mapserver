package handlers

import (
	"mapserver/view"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Index(ctx echo.Context) error {
	return renderView(ctx, view.App(), http.StatusOK)
}
