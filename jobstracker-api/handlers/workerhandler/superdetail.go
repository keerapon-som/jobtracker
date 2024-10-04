package workerhandler

import (
	"encoding/json"
	"jobtrackker/internal/service/jobsdbsvc"

	"github.com/gofiber/fiber/v2"
)

type WorkerHandler struct {
}

func (h *WorkerHandler) Init(root fiber.Router) {
	root.Put("/workerhandler/", h.UpdateJobSuperDetail)
}
func (h *WorkerHandler) UpdateJobSuperDetail(c *fiber.Ctx) error {
	var detailsData map[string]map[string]interface{}

	err := json.Unmarshal(c.Body(), &detailsData)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	svc := jobsdbsvc.NewJobHistoryDetailssvc()
	err = svc.UpdateJobsSuperDetail(detailsData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "success",
		"rowsAffected": "",
	})

}
