package middleware

import (
	"github.com/gofiber/fiber/v2"
)

func AuthRequired(c *fiber.Ctx) error {
	cookie := c.Cookies("auth")
	if cookie != "valid-auth-token" { //Cookie auth=valid-auth-token
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}
	return c.Next()
}
