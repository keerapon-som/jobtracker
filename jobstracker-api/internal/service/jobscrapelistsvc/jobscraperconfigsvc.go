package jobscrapelistsvc

import (
	"jobtrackker/internal/data"
	"jobtrackker/internal/data/webdata"
	"jobtrackker/internal/repo"
	"strings"
)

// Add this import statement

type IJobscrapelistsvc interface {
	// TickerRunsJobs()
	GetScrapList(page int, pageSize int) ([]webdata.JobscrapeListwebData, int, error)
	UpdateJobscrapelist(jobData data.Jobscrape_listdataupdatereq) (int64, error)
	CreateJobscrapelist(jobData data.Jobscrape_listdatacreatereq) (int64, error)
	DeleteJobscrapelist(jobData data.Jobscrape_listdataupdatereq) (int64, error)
}

func NewJobscrapelistsvc() IJobscrapelistsvc {
	return jobscrapelistsvc{}
}

type jobscrapelistsvc struct {
}

func (w jobscrapelistsvc) GetScrapList(page int, pageSize int) ([]webdata.JobscrapeListwebData, int, error) {
	r := repo.NewJobsdbToJobScrapeListRepo()
	scheduleDatas, totals, err := r.GetJobListScrapeWithPageSize(page, pageSize)

	var respData []webdata.JobscrapeListwebData
	for i, jobdata := range scheduleDatas {
		respData = append(respData, webdata.JobscrapeListwebData{
			Index:          i + 1,
			UUID:           jobdata.UUID,
			ID:             jobdata.ID,
			Jobname:        jobdata.Jobname,
			GetjobsCount:   jobdata.GetjobsCount,
			GetjobsDetails: jobdata.GetjobsDetails,
			CreatedAt:      jobdata.CreatedAt,
		})
	}
	if err != nil {
		return nil, 0, err
	}
	return respData, totals, nil
}

func (w jobscrapelistsvc) UpdateJobscrapelist(jobData data.Jobscrape_listdataupdatereq) (int64, error) {
	r := repo.NewJobsdbToJobScrapeListRepo()
	jobData.Jobname = strings.ReplaceAll(jobData.Jobname, " ", "+")
	rowsAffected, err := r.UpdateJobScrapeList(jobData)
	if err != nil {
		return 0, err
	}
	return rowsAffected, nil

}

func (w jobscrapelistsvc) CreateJobscrapelist(jobData data.Jobscrape_listdatacreatereq) (int64, error) {
	r := repo.NewJobsdbToJobScrapeListRepo()
	jobData.Jobname = strings.ReplaceAll(jobData.Jobname, " ", "+")
	rowsAffected, err := r.CreateJobScrapeList(jobData)
	if err != nil {
		return 0, err
	}
	return rowsAffected, nil
}

func (w jobscrapelistsvc) DeleteJobscrapelist(jobData data.Jobscrape_listdataupdatereq) (int64, error) {
	r := repo.NewJobsdbToJobScrapeListRepo()
	rowsAffected, err := r.DeleteJobScrapeList(jobData)
	if err != nil {
		return 0, err
	}
	return rowsAffected, nil
}
