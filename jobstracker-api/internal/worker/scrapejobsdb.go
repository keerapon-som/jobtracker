package worker

import (

	// Add this import statement

	"fmt"
	"io"
	"jobtrackker/internal/cache/jobschedulingcache"
	"jobtrackker/internal/config"
	"jobtrackker/internal/data/db"
	"jobtrackker/internal/repo"
	"jobtrackker/internal/service/jobsdbsvc"
	"net/http"
	"strings"
	"sync"
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

var once sync.Once

func Checkalldb() {
	once.Do(func() {
		collectr := repo.NewJobsdbToJobScrapeListRepo()
		collectr.CreateTable()
		datar := repo.NewJobDataRepo()
		datar.CreateTable()
	})
}

func TickerGetJobsSuperDetail() {
	// svc := jobsdbsvc.NewJobHistoryDetailssvc()
	// ticker := time.NewTicker(1 * time.Minute)
	// defer ticker.Stop()

	// for range ticker.C {
	// 	now := time.Now()
	// 	if now.Minute() == 0 || now.Minute() == 30 {
	// 		go svc.ScrapeToJobsDataDetails()
	// 	}
	// }
	config := config.GetConfig()
	PythonServerPath := config.PythonServerPath

	url := PythonServerPath + "/scrape-job"
	method := "POST"

	payload := strings.NewReader(`{` + "" + `"listId":["79281362","78728644","79237400"]` + "" + `}`)

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
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
		log.Debug("Current time: ", now)
		ScheduleTrigger = cacheManager.GetScheduleTaskCache()
		log.Debug("ScheduleTrigger: ", ScheduleTrigger)
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
