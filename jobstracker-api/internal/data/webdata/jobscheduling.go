package webdata

import "time"

type ScheduletaskWeb struct {
	Index               int       `json:"index"`
	UUID                string    `json:"uuid"`
	ID                  int       `json:"id"`
	Taskname            string    `json:"taskname"`
	Tasktype            string    `json:"tasktype"`
	Taskstatus          string    `json:"taskstatus"`
	Taskdescription     string    `json:"taskdescription"`
	HoursTrigger        int       `json:"hours_trigger"`
	MinuteTrigger       int       `json:"minute_trigger"`
	ListWeekdaysTrigger []string  `json:"list_weekdays_trigger"`
	CreatedAt           time.Time `json:"created_at"`
}

type Scheduletaskreq struct {
	UUID                string   `json:"uuid"`
	ID                  int      `json:"id"`
	Taskname            string   `json:"taskname"`
	Tasktype            string   `json:"tasktype"`
	Taskstatus          string   `json:"taskstatus"`
	Taskdescription     string   `json:"taskdescription"`
	HoursTrigger        int      `json:"hours_trigger"`
	MinuteTrigger       int      `json:"minute_trigger"`
	ListWeekdaysTrigger []string `json:"list_weekdays_trigger"`
}
