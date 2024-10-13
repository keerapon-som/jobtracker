package jobscan

import (
	"jobtrackker/internal/service/jobsdbsvc"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type JobscanHandler struct {
}

func (h *JobscanHandler) Init(root fiber.Router) {
	root.Get("/jobscan/", h.GetJobList)
	root.Get("/jobscan/:id", h.GetSuperDetailByID)
	root.Patch("/jobscan/:id", h.UpdateSuperDetailAsPrettyFormat)
	// root.Put("/jobscan/", h.UpdateJobscrapelist)
	// root.Post("/jobscan/", h.CreateJobscrapelist)
	// root.Delete("/jobscan/", h.DeleteJobscrapelist)
}

func (h *JobscanHandler) GetJobList(c *fiber.Ctx) error {

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

	svc := jobsdbsvc.NewJobHistoryDetailssvc()
	var Totals int
	respData, Totals, err := svc.GetListDataAndTotals(page, pageSize)
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

func (h *JobscanHandler) GetSuperDetailByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id must be a number",
		})
	}

	svc := jobsdbsvc.NewJobHistoryDetailssvc()
	respData, err := svc.GetSuperDetailByID(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": respData,
	})
}

func (h *JobscanHandler) UpdateSuperDetailAsPrettyFormat(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id must be a number",
		})
	}

	svc := jobsdbsvc.NewJobHistoryDetailssvc()
	prettyData, err := svc.UpdateSuperDetailAsPrettyFormat(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "success",
		"data":    prettyData,
	})
}

// func (h *JobscanHandler) UpdateJobscrapelist(c *fiber.Ctx) error {
// 	var scheduleData data.Jobscrape_listdataupdatereq

// 	err := json.Unmarshal(c.Body(), &scheduleData)
// 	if err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "invalid request body",
// 		})
// 	}

// 	svc := jobscrapelistsvc.NewJobscrapelistsvc()
// 	rowsAffected, err := svc.UpdateJobscrapelist(scheduleData)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": err.Error(),
// 		})
// 	}

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message":      "success",
// 		"rowsAffected": rowsAffected,
// 	})

// }

// func (h *JobscanHandler) CreateJobscrapelist(c *fiber.Ctx) error {
// 	var scheduleData data.Jobscrape_listdatacreatereq
// 	err := json.Unmarshal(c.Body(), &scheduleData)
// 	if err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "invalid request body",
// 		})
// 	}

// 	svc := jobscrapelistsvc.NewJobscrapelistsvc()
// 	id, err := svc.CreateJobscrapelist(scheduleData)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": err.Error(),
// 			"id":      id,
// 		})
// 	}

// 	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
// 		"message": "success",
// 		"id":      id,
// 	})
// }

// func (h *JobscanHandler) DeleteJobscrapelist(c *fiber.Ctx) error {
// 	var scheduleData data.Jobscrape_listdataupdatereq
// 	err := json.Unmarshal(c.Body(), &scheduleData)
// 	if err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "invalid request body",
// 		})
// 	}

// 	svc := jobscrapelistsvc.NewJobscrapelistsvc()
// 	rowsAffected, err := svc.DeleteJobscrapelist(scheduleData)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": err.Error(),
// 		})
// 	}

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message":      "success",
// 		"rowsAffected": rowsAffected,
// 	})
// }
