package data

import "time"

type ScheduletaskData struct {
	Taskname            string    `json:"taskname"`
	Tasktype            string    `json:"tasktype"`
	Taskstatus          string    `json:"taskstatus"`
	Taskdescription     string    `json:"taskdescription"`
	HoursTrigger        int       `json:"hours_trigger"`
	MinuteTrigger       int       `json:"minute_trigger"`
	ListWeekdaysTrigger []string  `json:"list_weekdays_trigger"`
	CreatedAt           time.Time `json:"created_at"`
}

type CreateScheduletaskData struct {
	Taskname            string   `json:"taskname"`
	Tasktype            string   `json:"tasktype"`
	Taskstatus          string   `json:"taskstatus"`
	Taskdescription     string   `json:"taskdescription"`
	HoursTrigger        int      `json:"hours_trigger"`
	MinuteTrigger       int      `json:"minute_trigger"`
	ListWeekdaysTrigger []string `json:"list_weekdays_trigger"`
}

type ScheduletaskDataList struct {
	Tasktype            string   `json:"tasktype"`
	HoursTrigger        int      `json:"hours_trigger"`
	MinuteTrigger       int      `json:"minute_trigger"`
	ListWeekdaysTrigger []string `json:"list_weekdays_trigger"`
}
