package repo

import (
	"errors"
	"fmt"
	"jobtrackker/internal/data"
	"jobtrackker/internal/data/db"
	"jobtrackker/internal/data/webdata"
	"jobtrackker/internal/utils/postgresqldb"
	"log"

	"github.com/lib/pq"
)

type ScheduletaskRepo interface {
	CreateTable() error
	// InsertScheduleList(data []data.Jobscrape_listdata) error
	GetScheduleDataWithPageSize(Page int, pageSize int) ([]db.ScheduletaskRepo, int, error)
	GetListSchedule() ([]db.ScheduletaskRepo, error)
	CreateScheduleData(sData data.ScheduletaskData) (int64, error)
	UpdateScheduleData(sData webdata.Scheduletaskreq) (int64, error)
	DeleteScheduleData(sData webdata.Scheduletaskreq) (int64, error)
}

func NewScheduletaskRepo() ScheduletaskRepo {
	return scheduletaskRepo{}
}

type scheduletaskRepo struct {
}

func (r scheduletaskRepo) CreateTable() error {
	db := postgresqldb.NewRepo().DB()
	if db == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	_, err := db.Exec("CREATE TABLE IF NOT EXISTS public.jobscrape_list (id SERIAL PRIMARY KEY, jobname TEXT NOT NULL, UNIQUE(jobname), getjobsCount boolean DEFAULT false, getjobsDetails boolean DEFAULT false, getjobsSuperDetails boolean DEFAULT false, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")
	if err != nil {
		log.Println("error in create table")
		return err
	}

	return nil
}

func (r scheduletaskRepo) GetListSchedule() ([]db.ScheduletaskRepo, error) {
	// Assuming you have a function to get the DB connection
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return nil, errors.New("error init db")
	}

	query := `
		SELECT id,uuid,taskname,tasktype, hours_trigger, minute_trigger, list_weekdays_trigger 
		FROM public.scheduletask 
		WHERE taskstatus = $1
	`

	rows, err := dbcon.Query(query, "Active")
	if err != nil {
		log.Println("error in query")
		return nil, err
	}
	defer rows.Close()

	var tasks []db.ScheduletaskRepo
	for rows.Next() {
		var task db.ScheduletaskRepo

		err := rows.Scan(&task.ID, &task.UUID, &task.Taskname, &task.Tasktype, &task.HoursTrigger, &task.MinuteTrigger, pq.Array(&task.ListWeekdaysTrigger))
		if err != nil {
			log.Println("error in scan")
			return nil, err
		}
		tasks = append(tasks, task)
	}

	return tasks, nil
}

func (r scheduletaskRepo) GetScheduleDataWithPageSize(page int, pageSize int) ([]db.ScheduletaskRepo, int, error) {
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return nil, 0, errors.New("error init db")
	}

	// Query to get the total number of rows
	var totalRows int
	countQuery := `SELECT COUNT(*) FROM public.scheduletask`
	err := dbcon.QueryRow(countQuery).Scan(&totalRows)
	if err != nil {
		log.Println("error in count query")
		return nil, 0, err
	}

	if totalRows == 0 || totalRows < (page-1)*pageSize {
		return nil, 0, nil
	}

	query := `
		SELECT id,uuid, taskname, tasktype, taskstatus, taskdescription, hours_trigger, minute_trigger, list_weekdays_trigger, created_at
		FROM public.scheduletask
		ORDER BY id
		LIMIT $1 OFFSET $2
	`

	offset := (page - 1) * pageSize
	rows, err := dbcon.Query(query, pageSize, offset)
	if err != nil {
		log.Println("error in query")
		return nil, 0, err
	}

	defer rows.Close()

	var tasks []db.ScheduletaskRepo
	for rows.Next() {
		var task db.ScheduletaskRepo

		err := rows.Scan(&task.ID, &task.UUID, &task.Taskname, &task.Tasktype, &task.Taskstatus, &task.Taskdescription, &task.HoursTrigger, &task.MinuteTrigger, pq.Array(&task.ListWeekdaysTrigger), &task.CreatedAt)
		if err != nil {
			log.Println("error in scan")
			return nil, 0, err
		}
		tasks = append(tasks, task)
	}

	return tasks, totalRows, nil
}

func (r scheduletaskRepo) CreateScheduleData(sData data.ScheduletaskData) (int64, error) {
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return 0, errors.New("error init db")
	}

	query := `
		INSERT INTO public.scheduletask (taskname, tasktype, taskstatus, taskdescription, hours_trigger, minute_trigger, list_weekdays_trigger)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`

	result, err := dbcon.Exec(query, sData.Taskname, sData.Tasktype, sData.Taskstatus, sData.Taskdescription, sData.HoursTrigger, sData.MinuteTrigger, pq.Array(sData.ListWeekdaysTrigger))
	if err != nil {
		log.Println("error in insert query")
		return 0, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Println("error getting rows affected")
		return 0, err
	}

	return rowsAffected, nil
}

func (r scheduletaskRepo) UpdateScheduleData(sData webdata.Scheduletaskreq) (int64, error) {
	fmt.Println("update data", sData)
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return 0, errors.New("error init db")
	}

	query := `
        UPDATE public.scheduletask
        SET taskname = $1, tasktype = $2, taskstatus = $3, taskdescription = $4, hours_trigger = $5, minute_trigger = $6, list_weekdays_trigger = $7
        WHERE id = $8 AND uuid = $9
    `

	result, err := dbcon.Exec(query, sData.Taskname, sData.Tasktype, sData.Taskstatus, sData.Taskdescription, sData.HoursTrigger, sData.MinuteTrigger, pq.Array(sData.ListWeekdaysTrigger), sData.ID, sData.UUID)
	if err != nil {
		log.Println("error in update query:", err)
		return 0, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Println("error getting rows affected:", err)
		return 0, err
	}

	return rowsAffected, nil
}

func (r scheduletaskRepo) DeleteScheduleData(sData webdata.Scheduletaskreq) (int64, error) {
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return 0, errors.New("error init db")
	}

	query := `
		DELETE FROM public.scheduletask
		WHERE id = $1 AND uuid = $2
	`

	result, err := dbcon.Exec(query, sData.ID, sData.UUID)
	if err != nil {
		log.Println("error in delete query")
		return 0, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Println("error getting rows affected")
		return rowsAffected, err
	}
	return rowsAffected, nil
}
