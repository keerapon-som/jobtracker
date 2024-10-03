package jobsdbsvc

import (
	"encoding/json"
	"fmt"
	"jobtrackker/internal/config"
	"jobtrackker/internal/data" // Add this import statement
	"jobtrackker/internal/repo"
	"log"
	"math/rand"
	"net/http"
	"time"
)

type IJobcountHistorysvc interface {
	// TickerRunsJobs()
	ScrapeJobDataToDB() error
}

func NewJobcountHistorysvc() IJobcountHistorysvc {
	return jobcountHistorysvc{}
}

type jobcountHistorysvc struct {
}

func (w jobcountHistorysvc) ScrapeJobDataToDB() error {
	config := config.GetConfig()

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

	r := repo.NewJobsdbToJobScrapeListRepo()
	jobsTocollect, err := r.GetJobListScrapeByFeature("getjobsCount")
	if err != nil {
		log.Println("Error:", err)
	}

	///
	queryString["userqueryid"] = queryString["userqueryid"][:4] + randomString(8) + queryString["userqueryid"][12:]
	queryString["userid"] = randomString(8) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(12)
	queryString["usersessionid"] = queryString["userid"]
	queryString["eventCaptureSessionId"] = randomString(8) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(12)
	queryString["seekerId"] = randomInt(8)
	queryString["solId"] = randomString(8) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(4) + "-" + randomString(12)

	var datares []data.JobDataJobsdbreq
	for _, jobDesc := range jobsTocollect {
		queryString["keywords"] = jobDesc
		url := fmt.Sprintf("%s?siteKey=TH-Main&sourcesystem=houston&userqueryid=%s&userid=%s&usersessionid=%s&eventCaptureSessionId=%s&page=%s&seekSelectAllPages=%s&keywords=%s&pageSize=%s&include=seodata&locale=th-TH&seekerId=%s&solId=%s",
			config.JobsUrls, queryString["userqueryid"], queryString["userid"], queryString["usersessionid"], queryString["eventCaptureSessionId"], queryString["page"], queryString["seekSelectAllPages"], queryString["keywords"], queryString["pageSize"], queryString["seekerId"], queryString["solId"])

		resp, err := http.Get(url)
		if err != nil {
			datares = append(datares, data.JobDataJobsdbreq{JobName: jobDesc, Count: 0, Error: err.Error()})
			continue
		}
		defer resp.Body.Close()

		var result data.JobsDataFullStruct
		err = json.NewDecoder(resp.Body).Decode(&result)
		if err != nil {
			datares = append(datares, data.JobDataJobsdbreq{JobName: jobDesc, Count: 0, Error: err.Error()})
			continue
		}
		datares = append(datares, data.JobDataJobsdbreq{JobName: jobDesc, Count: int(result.TotalCount), Error: ""})
	}

	j := repo.NewJobDataRepo()

	err = j.Insert(datares)
	if err != nil {
		return err
	}
	return nil
}

func randomString(length int) string {
	letters := []rune("abcdefghijklmnopqrstuvwxyz")
	rand.Seed(time.Now().UnixNano())
	b := make([]rune, length)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func randomInt(length int) string {
	numbers := []rune("1234567890")
	rand.Seed(time.Now().UnixNano())
	b := make([]rune, length)
	for i := range b {
		b[i] = numbers[rand.Intn(len(numbers))]
	}
	return string(b)
}
