package worker

import (
	"fmt"
	"jobtrackker/internal/config"
	"jobtrackker/internal/data"
	"jobtrackker/internal/utils/postgresqldb"
	"testing"
	"time"
)

func TestTicker(t *testing.T) {

	mockupListTrigger := []data.ScheduletaskData{
		{
			Taskname:            "ScrapeJobsDB",
			Tasktype:            "Scrape",
			Taskstatus:          "Active",
			Taskdescription:     "Scrape JobsDB at 23:30 every weekday",
			HoursTrigger:        16,
			MinuteTrigger:       14,
			ListWeekdaysTrigger: []string{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"},
		},
		{
			Taskname:            "ScrapeJobsDB",
			Tasktype:            "Scrape",
			Taskstatus:          "Active",
			Taskdescription:     "Scrape JobsDB at 12:45 every Monday, Tuesday, Thursday, Friday",
			HoursTrigger:        16,
			MinuteTrigger:       15,
			ListWeekdaysTrigger: []string{"Monday", "Tuesday", "Thursday", "Friday", "Saturday"},
		},
		{
			Taskname:            "ScrapeJobsDB",
			Tasktype:            "Scrape",
			Taskstatus:          "Active",
			Taskdescription:     "Scrape JobsDB at 12:45 every Monday, Tuesday, Thursday, Friday",
			HoursTrigger:        16,
			MinuteTrigger:       15,
			ListWeekdaysTrigger: []string{"Monday", "Tuesday", "Thursday", "Friday"},
		},
	}

	ticker := time.NewTicker(1 * time.Minute)
	defer ticker.Stop()
	fmt.Println("Ticker started")

	for range ticker.C {
		now := time.Now()
		hours := now.Hour()
		minutes := now.Minute()
		weekday := now.Weekday().String()

		for _, task := range mockupListTrigger {
			if task.Taskstatus == "Active" && task.HoursTrigger == hours && task.MinuteTrigger == minutes && contains(task.ListWeekdaysTrigger, weekday) {
				fmt.Printf("Triggering task: %s - %s\n", task.Taskname, task.Taskdescription)
				// Call the function to perform the task, e.g., svc.ScrapeJobDataToDB()
			}
		}
	}
}

func TestTickerScheduler(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	TickerScheduler()
}

func TestTickSuperDetail(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	TickerGetJobsSuperDetail()
}
