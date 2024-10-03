package web

import "github.com/gofiber/fiber/v2"

type HTTPHandler interface {
	Init(root fiber.Router)
}

// HandlerRegistrator
type HandlerRegistrator struct {
	Handlers []HTTPHandler
}

// Register the handlers
func (m *HandlerRegistrator) Register(h ...HTTPHandler) {
	m.Handlers = append(m.Handlers, h...)
}

// Init the handlers
func (m *HandlerRegistrator) Init(root fiber.Router) {
	for _, h := range m.Handlers {
		h.Init(root)
	}
}
