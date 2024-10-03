package db

import "time"

type ScheduletaskRepo struct {
	ID                  int       `json:"id"`
	UUID                string    `json:"uuid"`
	Taskname            string    `json:"taskname"`
	Tasktype            string    `json:"tasktype"`
	Taskstatus          string    `json:"taskstatus"`
	Taskdescription     string    `json:"taskdescription"`
	HoursTrigger        int       `json:"hours_trigger"`
	MinuteTrigger       int       `json:"minute_trigger"`
	ListWeekdaysTrigger []string  `json:"list_weekdays_trigger"`
	CreatedAt           time.Time `json:"created_at"`
}
