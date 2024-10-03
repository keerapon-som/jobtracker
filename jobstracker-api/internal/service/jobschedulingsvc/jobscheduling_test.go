package jobschedulingsvc

import (
	"fmt"
	"jobtrackker/internal/config"
	"jobtrackker/internal/data"
	"jobtrackker/internal/data/webdata"
	"jobtrackker/internal/utils/postgresqldb"
	"testing"
)

func TestSavxxe(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	// postgresqldb.Init()

	svc := NewJobschedulingsvc()
	var mockupScheduleData = data.CreateScheduletaskData{
		Taskname:            "test",
		Tasktype:            "getjobsCount",
		Taskstatus:          "Active",
		Taskdescription:     "ฉันเป็นการทดสอบ และ ลองยิ้มมุมปาก",
		HoursTrigger:        10,
		MinuteTrigger:       10,
		ListWeekdaysTrigger: []string{"Mon", "Sun", "Sat", "Fri", "Sat", "Fri", "Sat", "Fri", "Sat", "Fri"},
	}
	rowsAffected, err := svc.CreateScheduleJob(mockupScheduleData)
	if err != nil {
		t.Error(err)
	}
	fmt.Println(rowsAffected)
}

func TestUpdate(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	// postgresqldb.Init()

	svc := NewJobschedulingsvc()
	var mockupScheduleData = webdata.Scheduletaskreq{
		UUID:                "6f7b3033-0549-4040-af59-31781abf017e",
		ID:                  3,
		Taskname:            "test",
		Tasktype:            "getjobsCount",
		Taskstatus:          "Active",
		Taskdescription:     "ฉันเป็นการทมปาก updatena",
		HoursTrigger:        1,
		MinuteTrigger:       1,
		ListWeekdaysTrigger: []string{"Mon", "Sun", "Sat"},
	}
	rowsAffected, err := svc.UpdateScheduleJob(mockupScheduleData)
	if err != nil {
		t.Error(err)
	}
	fmt.Println(rowsAffected)
}

// case "getjobsCount":
// 	go func() {
// 		countsvc := jobsdbsvc.NewJobcountHistorysvc()
// 		countsvc.ScrapeJobDataToDB()
// 	}()
// case "getjobsdetails":
