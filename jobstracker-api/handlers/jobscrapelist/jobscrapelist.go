package jobscrapelist

import (
	"encoding/json"
	"jobtrackker/internal/data"
	"jobtrackker/internal/service/jobscrapelistsvc"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type JobscrapelistHandler struct {
}

func (h *JobscrapelistHandler) Init(root fiber.Router) {
	root.Get("/jobscrapelist/", h.GetAllJobscrapelist)
	root.Put("/jobscrapelist/", h.UpdateJobscrapelist)
	root.Post("/jobscrapelist/", h.CreateJobscrapelist)
	root.Delete("/jobscrapelist/", h.DeleteJobscrapelist)
}

func (h *JobscrapelistHandler) GetAllJobscrapelist(c *fiber.Ctx) error {

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

	svc := jobscrapelistsvc.NewJobscrapelistsvc()
	var Totals int
	respData, Totals, err := svc.GetScrapList(page, pageSize)
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

func (h *JobscrapelistHandler) UpdateJobscrapelist(c *fiber.Ctx) error {
	var scheduleData data.Jobscrape_listdataupdatereq

	err := json.Unmarshal(c.Body(), &scheduleData)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	svc := jobscrapelistsvc.NewJobscrapelistsvc()
	rowsAffected, err := svc.UpdateJobscrapelist(scheduleData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "success",
		"rowsAffected": rowsAffected,
	})

}

func (h *JobscrapelistHandler) CreateJobscrapelist(c *fiber.Ctx) error {
	var scheduleData data.Jobscrape_listdatacreatereq
	err := json.Unmarshal(c.Body(), &scheduleData)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	svc := jobscrapelistsvc.NewJobscrapelistsvc()
	id, err := svc.CreateJobscrapelist(scheduleData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
			"id":      id,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "success",
		"id":      id,
	})
}

func (h *JobscrapelistHandler) DeleteJobscrapelist(c *fiber.Ctx) error {
	var scheduleData data.Jobscrape_listdataupdatereq
	err := json.Unmarshal(c.Body(), &scheduleData)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid request body",
		})
	}

	svc := jobscrapelistsvc.NewJobscrapelistsvc()
	rowsAffected, err := svc.DeleteJobscrapelist(scheduleData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "success",
		"rowsAffected": rowsAffected,
	})
}
