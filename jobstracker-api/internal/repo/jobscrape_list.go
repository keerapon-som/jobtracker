package repo

import (
	"errors"
	"fmt"
	"jobtrackker/internal/data"
	"jobtrackker/internal/data/db"
	"jobtrackker/internal/utils/postgresqldb"
	"log"
	"strings"
)

type JobsdbToJobScrapeListRepo interface {
	CreateTable() error
	InsertJobList(data []data.Jobscrape_listdata) error
	GetJobListScrapeByFeature(feature string) ([]string, error)
	GetJobListScrapeWithPageSize(page int, pageSize int) ([]db.Jobscrape_listrepo, int, error)
	InitialData() error
	UpdateJobScrapeList(jobData data.Jobscrape_listdataupdatereq) (int64, error)
	CreateJobScrapeList(jobData data.Jobscrape_listdatacreatereq) (int64, error)
	DeleteJobScrapeList(jobData data.Jobscrape_listdataupdatereq) (int64, error)
}

func NewJobsdbToJobScrapeListRepo() JobsdbToJobScrapeListRepo {
	return jobsdbToJobScrapeListRepo{}
}

type jobsdbToJobScrapeListRepo struct {
}

func (r jobsdbToJobScrapeListRepo) CreateTable() error {
	db := postgresqldb.NewRepo().DB()
	if db == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	// Enable the uuid-ossp extension
	_, err := db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
	if err != nil {
		log.Println("error enabling uuid-ossp extension:", err)
		return err
	}

	// Create the table with the uuid column
	_, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS public.jobscrape_list (
            id SERIAL PRIMARY KEY,
            uuid UUID NOT NULL DEFAULT gen_random_uuid(),
            jobname TEXT NOT NULL,
            UNIQUE(jobname),
            getjobsCount BOOLEAN DEFAULT false,
            getjobsDetails BOOLEAN DEFAULT false,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `)
	if err != nil {
		log.Println("error in create table:", err)
		return err
	}

	return nil
}

func (r jobsdbToJobScrapeListRepo) InsertJobList(data []data.Jobscrape_listdata) error {
	// Assuming you have a function to get the DB connection

	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	query := `
		INSERT INTO public.jobscrape_list (jobname, getjobsCount, getjobsDetails)
		VALUES ($1, $2, $3)
		ON CONFLICT (jobname) DO NOTHING;
	`

	tx, err := dbcon.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}

	stmt, err := tx.Prepare(query)
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to prepare statement: %w", err)
	}
	defer stmt.Close()

	for _, job := range data {
		_, err := stmt.Exec(job.Jobname, job.GetjobsCount, job.GetjobsDetails)
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to execute statement: %w", err)
		}
	}

	err = tx.Commit()
	if err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}
	return nil
}

func (r jobsdbToJobScrapeListRepo) GetJobListScrapeByFeature(feature string) ([]string, error) {
	dbcon := postgresqldb.NewRepo().DB()
	var jobDataList db.Jobscrape_listrepo
	if dbcon == nil {
		log.Println("db is nil")
		return []string{}, errors.New("error init db")
	}
	rows, err := dbcon.Query(fmt.Sprintf(`SELECT jobname FROM public.jobscrape_list WHERE %s = true`, feature))
	if err != nil {
		log.Println("error in query")
		return []string{}, err
	}
	defer rows.Close()

	var jobData []string
	for rows.Next() {
		err := rows.Scan(&jobDataList.Jobname)
		if err != nil {
			log.Println("error in scan")
			return []string{}, err
		}
		jobData = append(jobData, jobDataList.Jobname)
	}

	if err = rows.Err(); err != nil {
		return []string{}, err
	}

	return jobData, nil
}

func (r jobsdbToJobScrapeListRepo) InitialData() error {
	alljobs := []string{
		"Full stack", "Python", "Golang", "Frontend", "Backend", "Java", "Data science", "PHP", "C++",
		"Ruby", "C#", "Swift", "Kotlin", "Objective-C", "Rust", "Scala", "JavaScript", "TypeScript",
		"React", "Angular", "Vue", "Node.js", "Django", "Flask", "Spring", "Laravel", "Express",
		"Ruby on Rails", "ASP.NET", "iOS", "Android", "React Native", "Flutter", "Xamarin", "Unity",
		"DevOps", "Machine learning", "Artificial intelligence", "Cloud computing", "Cybersecurity",
		"Blockchain", "Mobile development", "Web development", "Software engineering", "Data analysis", "UI/UX design",
	}

	modifiedList := make([]string, len(alljobs))
	for i, item := range alljobs {
		modifiedList[i] = strings.ReplaceAll(item, " ", "+")
	}

	var dataToinert []data.Jobscrape_listdata
	for _, v := range modifiedList {
		dataToinert = append(dataToinert, data.Jobscrape_listdata{
			Jobname:        v, // Assuming the correct field name is JobTitle
			GetjobsCount:   true,
			GetjobsDetails: false,
		})
	}

	err := r.InsertJobList(dataToinert)
	if err != nil {
		log.Println("error in save" + err.Error())
		return err
	}
	return nil
}

func (r jobsdbToJobScrapeListRepo) GetJobListScrapeWithPageSize(page int, pageSize int) ([]db.Jobscrape_listrepo, int, error) {
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return nil, 0, errors.New("error init db")
	}

	query := `
		SELECT id,uuid,jobname, getjobsCount, getjobsDetails, created_at
		FROM public.jobscrape_list
		LIMIT $1 OFFSET $2
	`

	rows, err := dbcon.Query(query, pageSize, (page-1)*pageSize)
	if err != nil {
		log.Println("error in query")
		return nil, 0, err
	}
	defer rows.Close()

	var jobs []db.Jobscrape_listrepo
	for rows.Next() {
		var job db.Jobscrape_listrepo

		err := rows.Scan(&job.ID, &job.UUID, &job.Jobname, &job.GetjobsCount, &job.GetjobsDetails, &job.CreatedAt)
		if err != nil {
			log.Println("error in scan")
			return nil, 0, err
		}
		jobs = append(jobs, job)
	}

	if err = rows.Err(); err != nil {
		return nil, 0, err
	}

	totalRows, err := dbcon.Query("SELECT COUNT(*) FROM public.jobscrape_list")
	if err != nil {
		log.Println("error in query")
		return nil, 0, err
	}
	defer totalRows.Close()

	var total int
	for totalRows.Next() {
		err := totalRows.Scan(&total)
		if err != nil {
			log.Println("error in scan")
			return nil, 0, err
		}
	}

	return jobs, total, nil
}

func (r jobsdbToJobScrapeListRepo) UpdateJobScrapeList(jobData data.Jobscrape_listdataupdatereq) (int64, error) {
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return 0, errors.New("error init db")
	}

	query := `
		UPDATE public.jobscrape_list
		SET jobname = $1, getjobsCount = $2, getjobsDetails = $3
		WHERE id = $4 and uuid = $5
	`

	result, err := dbcon.Exec(query, jobData.Jobname, jobData.GetjobsCount, jobData.GetjobsDetails, jobData.ID, jobData.UUID)
	if err != nil {
		log.Println("error in update")
		return 0, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Println("error getting rows affected")
		return 0, err
	}

	return rowsAffected, nil
}

func (r jobsdbToJobScrapeListRepo) CreateJobScrapeList(jobData data.Jobscrape_listdatacreatereq) (int64, error) {
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return 0, errors.New("error init db")
	}

	query := `
		INSERT INTO public.jobscrape_list (jobname, getjobsCount, getjobsDetails)
		VALUES ($1, $2, $3)
		RETURNING id
	`

	var id int
	err := dbcon.QueryRow(query, jobData.Jobname, jobData.GetjobsCount, jobData.GetjobsDetails).Scan(&id)
	if err != nil {
		log.Println("error in insert")
		return 0, err
	}

	return int64(id), nil
}

func (r jobsdbToJobScrapeListRepo) DeleteJobScrapeList(jobData data.Jobscrape_listdataupdatereq) (int64, error) {
	dbcon := postgresqldb.NewRepo().DB()
	if dbcon == nil {
		log.Println("db is nil")
		return 0, errors.New("error init db")
	}

	query := `
		DELETE FROM public.jobscrape_list
		WHERE id = $1 and uuid = $2
	`

	result, err := dbcon.Exec(query, jobData.ID, jobData.UUID)
	if err != nil {
		log.Println("error in delete")
		return 0, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Println("error getting rows affected")
		return 0, err
	}

	return rowsAffected, nil
}
