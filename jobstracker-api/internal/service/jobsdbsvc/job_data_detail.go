package jobsdbsvc

import (
	"encoding/json"
	"fmt"
	"jobtrackker/internal/config"
	"jobtrackker/internal/data" // Add this import statement
	"jobtrackker/internal/repo"
	"log"
	"net/http"
	"strconv"
)

type IJobHistoryDetailssvc interface {
	// TickerRunsJobs()
	ScrapeToJobsDataDetails() error
	UpdateJobsSuperDetail(detailsData map[string]map[string]interface{}) error
}

func NewJobHistoryDetailssvc() IJobHistoryDetailssvc {
	return jobHistoryDetailssvc{}
}

type jobHistoryDetailssvc struct {
}

func scrapeJobs(queryString map[string]string) (responseData []data.JobsDatadetailsData, TotalPages int, err error) {
	config := config.GetConfig()

	url := fmt.Sprintf("%s?siteKey=TH-Main&sourcesystem=houston&userqueryid=%s&userid=%s&usersessionid=%s&eventCaptureSessionId=%s&page=%s&seekSelectAllPages=%s&keywords=%s&pageSize=%s&include=seodata&locale=th-TH&seekerId=%s&solId=%s",
		config.JobsUrls, queryString["userqueryid"], queryString["userid"], queryString["usersessionid"], queryString["eventCaptureSessionId"], queryString["page"], queryString["seekSelectAllPages"], queryString["keywords"], queryString["pageSize"], queryString["seekerId"], queryString["solId"])

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(data.JobDataJobsdbreq{JobName: queryString["keywords"], Count: 0, Error: err.Error()})
		return nil, 0, fmt.Errorf("failed to get URL: %w", err)
	}
	defer resp.Body.Close()

	var result data.JobsDataFullStruct
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		fmt.Println(data.JobDataJobsdbreq{JobName: queryString["keywords"], Count: 0, Error: err.Error()})
		return nil, 0, fmt.Errorf("failed to decode response: %w", err)
	}
	var returnData []data.JobsDatadetailsData
	for _, job := range result.Data {
		returnData = append(returnData, data.JobsDatadetailsData{
			Id:             job.ID,
			AdvertiserID:   job.Advertiser.ID,
			AdvertiserName: job.Advertiser.Description,
			Area:           job.Area,
			AreaID:         job.AreaID,
			AreaWhereValue: job.AreaWhereValue,
			CountryCode:    job.JobLocation.CountryCode,
			ListingDate:    job.ListingDate,
			RoleID:         job.RoleID,
			Title:          job.Title,
			Teaser:         job.Teaser,
			Salary:         job.Salary,
			WorkType:       job.WorkType,
		})
	}

	return returnData, result.TotalPages, nil
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func (w jobHistoryDetailssvc) ScrapeToJobsDataDetails() error {

	queryString := map[string]string{
		"userqueryid":           "b191235293df8eaf3a9b39e7d089e4d0-4664325",
		"userid":                "b57cf8fc-ba96-451b-a3b7-be22d28f9d8d",
		"usersessionid":         "b57cf8fc-ba96-451b-a3b7-be22d28f9d8d",
		"eventCaptureSessionId": "98524647-2ba2-466b-90d9-8812fbe476bf",
		"page":                  "1",
		"seekSelectAllPages":    "true",
		"keywords":              "Full+Stack",
		"pageSize":              "1",
		"include":               "seodata",
		"locale":                "th-TH",
		"seekerId":              "400165983",
		"solId":                 "f24de41b-3f63-4a8a-9fa0-5acb39269635",
	}

	queryString["userqueryid"] = queryString["userqueryid"][:4] + randomString(8) + queryString["userqueryid"][12:]
	queryString["userid"] = randomString(8) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(12)
	queryString["usersessionid"] = queryString["userid"]
	queryString["eventCaptureSessionId"] = randomString(8) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(12)
	queryString["seekerId"] = randomInt(8)
	queryString["solId"] = randomString(8) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(12)
	queryString["pageSize"] = fmt.Sprintf("%d", 50)

	r := repo.NewJobsdbToJobScrapeListRepo()
	jobsTocollect, err := r.GetJobListScrapeByFeature("getjobsDetails")
	if err != nil {
		log.Println("Error:", err)
	}

	var jobsDetailsToDB []data.JobsDatadetailsData

	idDuplicateChecker := []string{}

	for _, jobDesc := range jobsTocollect {
		log.Println("Searching for", jobDesc)
		queryString["keywords"] = jobDesc
		startPage := 1
		for {
			queryString["page"] = fmt.Sprintf("%d", startPage)
			respData, TotalPages, err := scrapeJobs(queryString)
			if err != nil {
				log.Println("Error:", err)
			}
			for _, job := range respData {
				if !contains(idDuplicateChecker, fmt.Sprintf("%d", job.Id)) {
					jobsDetailsToDB = append(jobsDetailsToDB, job)
					idDuplicateChecker = append(idDuplicateChecker, fmt.Sprintf("%d", job.Id))
				}
			}

			if startPage >= TotalPages {
				break
			}
			startPage++
		}
	}

	j := repo.NewJobsdbDetail()
	fmt.Println("Inserting to DB", len(jobsDetailsToDB))
	err = j.InsertOrUpdateJobs(jobsDetailsToDB)
	if err != nil {
		return err
	}
	return nil
}

func (r jobHistoryDetailssvc) UpdateJobsSuperDetail(detailsData map[string]map[string]interface{}) error {
	var ListUpdate []data.JobsDatadetailsData

	for id, value := range detailsData {
		id, err := strconv.Atoi(id)
		if err != nil {
			return err
		}
		dataToappend := data.JobsDatadetailsData{
			Id:          id,
			SuperDetail: value,
		}
		ListUpdate = append(ListUpdate, dataToappend)
	}
	j := repo.NewJobsdbDetail()
	err := j.UpdateJobsSuperDetail(ListUpdate)
	if err != nil {
		return err
	}
	return nil
}
