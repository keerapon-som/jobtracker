package handlers

import "github.com/gofiber/fiber/v2"

type Privatetest struct {
}

func (h *Privatetest) Init(root fiber.Router) {
	root.Get("/privatetest", h.FormbpmnElement)
}

func (h *Privatetest) FormbpmnElement(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "helloza Privatetest",
	})
}
