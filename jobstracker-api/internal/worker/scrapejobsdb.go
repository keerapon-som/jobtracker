package worker

import (

	// Add this import statement

	"jobtrackker/internal/cache/jobschedulingcache"
	"jobtrackker/internal/data/db"
	"jobtrackker/internal/repo"
	"jobtrackker/internal/service/jobsdbsvc"
	"time"

	"github.com/gofiber/fiber/v2/log"
)

func TickerRunsJobs() {
	svc := jobsdbsvc.NewJobcountHistorysvc()
	ticker := time.NewTicker(1 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		now := time.Now()
		if now.Minute() == 0 || now.Minute() == 30 {
			go svc.ScrapeJobDataToDB()
		}
	}
}

func TickerGetJobsSuperDetail() {
	scrapeLength := 30
	svc := jobsdbsvc.NewJobHistoryDetailssvc()
	svc.TrickerWorkerScrapeSuperDetail(scrapeLength)
}

func TickerScheduler() {
	var ScheduleTrigger []db.ScheduletaskRepo
	cacheManager := jobschedulingcache.GetInstance()

	ticker := time.NewTicker(1 * time.Minute)
	defer ticker.Stop()
	log.Debug("Starting TickerScheduler")

	for range ticker.C {
		now := time.Now()
		hours := now.Hour()
		minutes := now.Minute()
		weekday := now.Weekday().String()
		// log.Debug("Current time: ", now)
		ScheduleTrigger = cacheManager.GetScheduleTaskCache()
		// log.Debug("ScheduleTrigger: ", ScheduleTrigger)
		// do every five minute
		if now.Minute()%5 == 0 {
			go TickerGetJobsSuperDetail() // scrape job details every 1 minutes
			log.Debug("Triggering task: TickerGetJobsSuperDetail")
		}

		if len(ScheduleTrigger) == 0 {
			r := repo.NewScheduletaskRepo()
			ScheduleTrigger, err := r.GetListSchedule()
			log.Debug("Get schedule data from DB: ")
			if err != nil {
				log.Error("Error in getting schedule data from DB: ", err)
			}
			cacheManager.SetScheduleTaskCache(ScheduleTrigger)
		}
		for _, task := range ScheduleTrigger {
			if task.HoursTrigger == hours && task.MinuteTrigger == minutes && contains(task.ListWeekdaysTrigger, convertToWeekdays(weekday)) {
				switch task.Tasktype {
				case "getjobsCount":
					go func() {
						log.Debug("Triggering task: getjobsCount for id: ", task.ID, " Taskname: ", task.Taskname)
						countsvc := jobsdbsvc.NewJobcountHistorysvc()
						countsvc.ScrapeJobDataToDB()
					}()
				case "getjobsdetails":
					go func() {
						log.Debug("Triggering task: getjobsdetails for id: ", task.ID, " Taskname: ", task.Taskname)
						detailsvc := jobsdbsvc.NewJobHistoryDetailssvc()
						detailsvc.ScrapeToJobsDataDetails()
					}()
				default:
					log.Error("Task type not found: ", task.Tasktype)
				}
			}
		}
	}
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func convertToWeekdays(day string) string {

	switch day {
	case "Sunday":
		day = "Sun"
	case "Monday":
		day = "Mon"
	case "Tuesday":
		day = "Tues"
	case "Wednesday":
		day = "Wed"
	case "Thursday":
		day = "Thu"
	case "Friday":
		day = "Fri"
	case "Saturday":
		day = "Sat"
	}
	return day
}
