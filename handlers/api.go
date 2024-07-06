package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
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

func BestPoints(ctx echo.Context) error {
    // raw JSON 
    rawBytes, err := io.ReadAll(ctx.Request().Body)
    if err != nil {
        return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
    }

    req, err := http.NewRequest("POST", modelUrl + "/best_points", bytes.NewBuffer(rawBytes))
    if err != nil {
        return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "Error creating request"})
    }
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "Error performing request"})
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "Internal error"})
    }
    return ctx.JSON(http.StatusOK, body)
}

func Evaluate(ctx echo.Context) error {
    // raw JSON 
    rawBytes, err := io.ReadAll(ctx.Request().Body)
    if err != nil {
        return ctx.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
    }

    req, err := http.NewRequest("POST", modelUrl + "/evaluate", bytes.NewBuffer(rawBytes))
    if err != nil {
        return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "Error creating request"})
    }
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "Error performing request"})
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": "Internal error"})
    }
    return ctx.JSON(http.StatusOK, body)
}
