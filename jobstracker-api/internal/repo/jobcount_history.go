package repo

import (
	"errors"
	"jobtrackker/internal/data"
	"jobtrackker/internal/data/db"
	"jobtrackker/internal/utils/postgresqldb"
	"log"
)

type JobDataRepo interface {
	CreateTable() error
	GetJobData() ([]db.JobDataJobsdb, error)
	Insert(listToInsert []data.JobDataJobsdbreq) error
}

func NewJobDataRepo() JobDataRepo {
	return jobDataRepo{}
}

type jobDataRepo struct {
}

func (r jobDataRepo) CreateTable() error {
	db := postgresqldb.NewRepo().DB()
	if db == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	// defer postgresql.Close()

	_, err := db.Exec("CREATE TABLE IF NOT EXISTS public.jobcount_history (id SERIAL PRIMARY KEY, jobname TEXT, count INT, collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, error TEXT)")
	if err != nil {
		log.Println("error in create table")
		return err
	}

	return nil
}

func (r jobDataRepo) GetJobData() ([]db.JobDataJobsdb, error) {
	// Assuming you have a function to get the DB connection
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return nil, errors.New("error init db")
	}
	rows, err := dbcon.Query("SELECT * FROM public.jobcount_history")
	if err != nil {
		log.Println("error in query")
		return nil, err
	}
	defer rows.Close()

	var jobDataList []db.JobDataJobsdb
	for rows.Next() {
		var jobData db.JobDataJobsdb
		err := rows.Scan(&jobData.ID, &jobData.JobName, &jobData.Count, &jobData.CollectedAt)
		if err != nil {
			log.Println("error in scan")
			return nil, err
		}
		jobDataList = append(jobDataList, jobData)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return jobDataList, nil
}

func (r jobDataRepo) Insert(listToInsert []data.JobDataJobsdbreq) error {

	db := postgresqldb.NewRepo().DB()
	if db == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	// defer postgresql.Close()

	tx, err := db.Begin()
	if err != nil {
		log.Println("error in begin tx")
		return err
	}

	stmt, err := tx.Prepare("INSERT INTO public.jobcount_history (jobname, count) VALUES ($1, $2)")
	if err != nil {
		log.Println("error in prepare stmt")
		return err
	}

	for _, jobData := range listToInsert {
		_, err = stmt.Exec(jobData.JobName, jobData.Count)
		if err != nil {
			log.Println("error in exec stmt")
			return err
		}
	}

	err = tx.Commit()
	if err != nil {
		log.Println("error in commit tx")
		return err
	}

	return nil
}
