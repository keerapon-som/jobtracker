package jobschedulingsvc

import (
	"fmt"
	"jobtrackker/internal/cache/jobschedulingcache"
	"jobtrackker/internal/data"
	"jobtrackker/internal/data/db"
	"jobtrackker/internal/data/webdata"
	"jobtrackker/internal/repo"

	"github.com/gofiber/fiber/v2/log"
)

// Add this import statement

type IJobschedulingsvc interface {
	// TickerRunsJobs()
	GetScheduleJobs(page int, pageSize int) ([]webdata.ScheduletaskWeb, int, error)
	CreateScheduleJob(sData data.CreateScheduletaskData) (int64, error)
	UpdateScheduleJob(sData webdata.Scheduletaskreq) (int64, error)
	DeleteScheduleJob(sData webdata.Scheduletaskreq) (int64, error)
	// UpdateScheduleJob(data webdata.ScheduletaskWeb) error
}

func NewJobschedulingsvc() IJobschedulingsvc {
	return jobschedulingsvc{}
}

type jobschedulingsvc struct {
}

func (w jobschedulingsvc) GetScheduleJobs(page int, pageSize int) ([]webdata.ScheduletaskWeb, int, error) {
	r := repo.NewScheduletaskRepo()
	scheduleDatas, totals, err := r.GetScheduleDataWithPageSize(page, pageSize)

	var respData []webdata.ScheduletaskWeb
	for i, scheduledata := range scheduleDatas {
		respData = append(respData, webdata.ScheduletaskWeb{
			Index:               i + 1,
			UUID:                scheduledata.UUID,
			ID:                  scheduledata.ID,
			Taskname:            scheduledata.Taskname,
			Tasktype:            scheduledata.Tasktype,
			Taskstatus:          scheduledata.Taskstatus,
			Taskdescription:     scheduledata.Taskdescription,
			HoursTrigger:        scheduledata.HoursTrigger,
			MinuteTrigger:       scheduledata.MinuteTrigger,
			ListWeekdaysTrigger: scheduledata.ListWeekdaysTrigger,
			CreatedAt:           scheduledata.CreatedAt,
		})
	}
	if err != nil {
		return nil, 0, err
	}
	return respData, totals, nil
}

func (w jobschedulingsvc) CreateScheduleJob(scheduleData data.CreateScheduletaskData) (int64, error) {
	r := repo.NewScheduletaskRepo()

	err := ValidateJobscheduleTable(webdata.Scheduletaskreq{
		Taskname:            scheduleData.Taskname,
		Tasktype:            scheduleData.Tasktype,
		Taskstatus:          scheduleData.Taskstatus,
		Taskdescription:     scheduleData.Taskdescription,
		HoursTrigger:        scheduleData.HoursTrigger,
		MinuteTrigger:       scheduleData.MinuteTrigger,
		ListWeekdaysTrigger: scheduleData.ListWeekdaysTrigger,
	})
	if err != nil {
		return 0, err
	}

	var NondupWeekdays []string
	for _, day := range scheduleData.ListWeekdaysTrigger {
		if !contains(NondupWeekdays, day) {
			NondupWeekdays = append(NondupWeekdays, day)
		}
	}

	rowsAffected, err := r.CreateScheduleData(data.ScheduletaskData{
		Taskname:            scheduleData.Taskname,
		Tasktype:            scheduleData.Tasktype,
		Taskstatus:          scheduleData.Taskstatus,
		Taskdescription:     scheduleData.Taskdescription,
		HoursTrigger:        scheduleData.HoursTrigger,
		MinuteTrigger:       scheduleData.MinuteTrigger,
		ListWeekdaysTrigger: NondupWeekdays,
	})
	if err != nil {
		return 0, err
	}

	cacheManager := jobschedulingcache.GetInstance()
	log.Debug("Set schedule task data list")
	cacheManager.SetScheduleTaskCache([]db.ScheduletaskRepo{})
	return rowsAffected, nil
}

func (w jobschedulingsvc) UpdateScheduleJob(scheduleData webdata.Scheduletaskreq) (int64, error) {
	r := repo.NewScheduletaskRepo()

	err := ValidateJobscheduleTable(scheduleData)
	if err != nil {
		return 0, err
	}

	var NondupWeekdays []string
	for _, day := range scheduleData.ListWeekdaysTrigger {
		if !contains(NondupWeekdays, day) {
			NondupWeekdays = append(NondupWeekdays, day)
		}
	}

	rowsEffect, err := r.UpdateScheduleData(webdata.Scheduletaskreq{
		UUID:                scheduleData.UUID,
		ID:                  scheduleData.ID,
		Taskname:            scheduleData.Taskname,
		Tasktype:            scheduleData.Tasktype,
		Taskstatus:          scheduleData.Taskstatus,
		Taskdescription:     scheduleData.Taskdescription,
		HoursTrigger:        scheduleData.HoursTrigger,
		MinuteTrigger:       scheduleData.MinuteTrigger,
		ListWeekdaysTrigger: NondupWeekdays,
	})
	if err != nil {
		return 0, err
	}

	cacheManager := jobschedulingcache.GetInstance()
	cacheManager.SetScheduleTaskCache([]db.ScheduletaskRepo{})

	return rowsEffect, nil
}

func (w jobschedulingsvc) DeleteScheduleJob(scheduleData webdata.Scheduletaskreq) (int64, error) {
	r := repo.NewScheduletaskRepo()
	rowsAffected, err := r.DeleteScheduleData(webdata.Scheduletaskreq{
		UUID: scheduleData.UUID,
		ID:   scheduleData.ID,
	})
	if err != nil {
		return rowsAffected, err
	}

	cacheManager := jobschedulingcache.GetInstance()
	cacheManager.SetScheduleTaskCache([]db.ScheduletaskRepo{})

	return rowsAffected, nil
}

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func ValidateJobscheduleTable(jobschedule webdata.Scheduletaskreq) error {
	var dayList = []string{"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"}
	var taskTypeList = []string{"getjobsCount", "getjobsdetails"}
	var taskStatusList = []string{"Active", "Deactive"}
	var hoursTriggerCheck = 24
	var minuteTriggerCheck = 60

	if len(jobschedule.ListWeekdaysTrigger) > 7 || len(jobschedule.ListWeekdaysTrigger) < 1 {
		return fmt.Errorf("invalid day %s", jobschedule.ListWeekdaysTrigger)
	}

	for _, day := range jobschedule.ListWeekdaysTrigger {
		if !contains(dayList, day) {
			return fmt.Errorf("invalid day %s", day)
		}
	}

	if !contains(taskTypeList, jobschedule.Tasktype) {
		return fmt.Errorf("invalid task type %s", jobschedule.Tasktype)
	}

	if !contains(taskStatusList, jobschedule.Taskstatus) {
		return fmt.Errorf("invalid task status %s", jobschedule.Taskstatus)
	}

	if jobschedule.HoursTrigger > hoursTriggerCheck {
		return fmt.Errorf("invalid hours %d", jobschedule.HoursTrigger)
	}

	if jobschedule.MinuteTrigger > minuteTriggerCheck {
		return fmt.Errorf("invalid minute %d", jobschedule.MinuteTrigger)
	}

	return nil
}
