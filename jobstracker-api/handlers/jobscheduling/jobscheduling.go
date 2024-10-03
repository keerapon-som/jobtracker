package jobscheduling

import (
	"encoding/json"
	"jobtrackker/internal/data"
	"jobtrackker/internal/data/webdata"
	"jobtrackker/internal/service/jobschedulingsvc"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type JobschedulingHandler struct {
}

func (h *JobschedulingHandler) Init(root fiber.Router) {
	root.Get("/jobscheduling/", h.GetAllJobscheduling)
	root.Post("/jobscheduling/", h.CreateJobscheduling)
	root.Put("/jobscheduling/", h.UpdateJobscheduling)
	root.Delete("/jobscheduling/", h.DeleteJobscheduling)
}

func (h *JobschedulingHandler) GetAllJobscheduling(c *fiber.Ctx) error {

	pageStr := c.Query("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "page must be a number",
		})
	}
	pageSizeStr := c.Query("pagesize")
	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "pagesize must be a number",
		})
	}

	svc := jobschedulingsvc.NewJobschedulingsvc()
	var Totals int
	respData, Totals, err := svc.GetScheduleJobs(page, pageSize)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":   respData,
		"totals": Totals,
	})
}

func (h *JobschedulingHandler) CreateJobscheduling(c *fiber.Ctx) error {
	var scheduleData data.CreateScheduletaskData
	err := json.Unmarshal(c.Body(), &scheduleData)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	svc := jobschedulingsvc.NewJobschedulingsvc()
	rowsAffected, err := svc.CreateScheduleJob(scheduleData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":      err.Error(),
			"rowsAffected": rowsAffected,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":      "success",
		"rowsAffected": rowsAffected,
	})
}

func (h *JobschedulingHandler) UpdateJobscheduling(c *fiber.Ctx) error {
	var scheduleData webdata.Scheduletaskreq
	err := json.Unmarshal(c.Body(), &scheduleData)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	svc := jobschedulingsvc.NewJobschedulingsvc()

	rowsAffected, err := svc.UpdateScheduleJob(scheduleData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":      err.Error(),
			"rowsAffected": rowsAffected,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "success",
		"rowsAffected": rowsAffected,
	})
}

func (h *JobschedulingHandler) DeleteJobscheduling(c *fiber.Ctx) error {
	var scheduleData webdata.Scheduletaskreq
	err := json.Unmarshal(c.Body(), &scheduleData)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	svc := jobschedulingsvc.NewJobschedulingsvc()
	rowsAffected, err := svc.DeleteScheduleJob(scheduleData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message":      err.Error(),
			"rowsAffected": rowsAffected,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "success",
		"rowsAffected": rowsAffected,
	})
}
