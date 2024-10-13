package jobsdbsvc

import (
	"fmt"
	"jobtrackker/internal/config"
	"jobtrackker/internal/utils/postgresqldb"
	"testing"
)

func TestSavxxe(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	// postgresqldb.Init()

	svc := NewJobHistoryDetailssvc()
	svc.ScrapeToJobsDataDetails()
}

func TestSavxxe2(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	// postgresqldb.Init()

	svc := NewJobHistoryDetailssvc()
	data, totals, err := svc.GetListDataAndTotals(1, 10)
	if err != nil {
		t.Errorf("error in get all, %v", err)
	}
	fmt.Println("Data is ", data)
	fmt.Println(totals)
}

func TestGetSuperDetailByID(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	// postgresqldb.Init()

	svc := NewJobHistoryDetailssvc()
	data, err := svc.GetSuperDetailByID(75050939)
	if err != nil {
		t.Errorf("error in get all, %v", err)
	}
	fmt.Println("Data is ", data)
}

func TestUpdateSuperDetailAsPrettyFormat(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	// postgresqldb.Init()

	svc := NewJobHistoryDetailssvc()
	prettyData, err := svc.UpdateSuperDetailAsPrettyFormat(73258946)
	if err != nil {
		t.Errorf("error in get all, %v", err)
	}
	fmt.Println("Data is ", prettyData)
}
