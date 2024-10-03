package handlers

import "github.com/gofiber/fiber/v2"

type FormHandler struct {
}

func (h *FormHandler) Init(root fiber.Router) {
	root.Get("/formbpmn", h.FormbpmnElement)
}

func (h *FormHandler) FormbpmnElement(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "helloza",
	})
}
