package repo

import (
	"fmt"
	"jobtrackker/internal/config"
	"jobtrackker/internal/data"
	"jobtrackker/internal/utils/postgresqldb"
	"log"
	"strings"
	"testing"
)

func TestInitiate(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	r := NewJobsdbToJobScrapeListRepo()
	err := r.InitialData()
	if err != nil {
		t.Errorf("error in initiate")
	}

}

func TestSaveEIEI(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	xx := NewJobsdbToJobScrapeListRepo()
	alljobs := []string{
		"Full stack", "Python", "Golang", "Frontend", "Backend", "Java", "Data science", "PHP", "C++",
		"Ruby", "C#", "Swift", "Kotlin", "Objective-C", "Rust", "Scala", "JavaScript", "TypeScript",
		"React", "Angular", "Vue", "Node.js", "Django", "Flask", "Spring", "Laravel", "Express",
		"Ruby on Rails", "ASP.NET", "iOS", "Android", "React Native", "Flutter", "Xamarin", "Unity",
		"DevOps", "Machine learning", "Artificial intelligence", "Cloud computing", "Cybersecurity",
		"Blockchain", "Mobile development", "Web development", "Software engineering", "Data analysis", "UI/UX design",
	}

	modifiedList := make([]string, len(alljobs))
	for i, item := range alljobs {
		modifiedList[i] = strings.ReplaceAll(item, " ", "+")
	}

	var dataToinert []data.Jobscrape_listdata
	for _, v := range modifiedList {
		dataToinert = append(dataToinert, data.Jobscrape_listdata{
			Jobname:        v, // Assuming the correct field name is JobTitle
			GetjobsCount:   true,
			GetjobsDetails: false,
		})
	}

	err := xx.InsertJobList(dataToinert)
	if err != nil {
		t.Errorf("error in save")
	}
}

func TestGetallZZ(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	repo := NewJobsdbToJobScrapeListRepo()
	data, err := repo.GetJobListScrapeByFeature("getjobsDetails")
	if err != nil {
		t.Errorf("error in get all")
	}
	log.Println(data)
}

func TestCreateTable(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	repo := NewJobsdbToJobScrapeListRepo()
	err := repo.CreateTable()
	if err != nil {
		t.Errorf("error in create table")
	}
}

func TestGetDataWithPageSize(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	repo := NewJobsdbToJobScrapeListRepo()
	data, Totals, err := repo.GetJobListScrapeWithPageSize(1, 50)
	if err != nil {
		t.Errorf("error in get data with page size")
	}
	fmt.Println(data)
	fmt.Println(Totals)
}
