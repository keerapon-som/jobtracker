package repo

import (
	"errors"
	"fmt"
	"jobtrackker/internal/data"
	"jobtrackker/internal/utils/postgresqldb"
	"log"
)

type JobsdbDetail interface {
	CreateTable() error
	InsertOrUpdateJobs(jobs []data.JobsDatadetailsData) error
	// GetListSchedule()
}

func NewJobsdbDetail() JobsdbDetail {
	return jobsdbDetail{}
}

type jobsdbDetail struct {
}

func (r jobsdbDetail) CreateTable() error {
	db := postgresqldb.NewRepo().DB()
	if db == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS public.jobsdatadetails (
			id INTEGER PRIMARY KEY NOT NULL,
			advertiser_id TEXT NOT NULL,
			advertiser_name TEXT NOT NULL,
			area TEXT NOT NULL,
			area_id INTEGER NOT NULL,
			area_where_value TEXT NOT NULL,
			country_code TEXT NOT NULL,
			listing_date TIMESTAMP NOT NULL,
			role_id TEXT NOT NULL,
			title TEXT NOT NULL,
			salary TEXT NOT NULL,
			teaser TEXT NOT NULL,
			work_type TEXT NOT NULL,
			latest_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		)`)
	if err != nil {
		log.Println("error in create table")
		return err
	}

	return nil
}

func (r jobsdbDetail) InsertOrUpdateJobs(jobs []data.JobsDatadetailsData) error {
	query := `
        INSERT INTO public.jobsdatadetails (
            id, advertiser_id, advertiser_name, area, area_id, area_where_value, country_code, listing_date, role_id, title, salary, teaser, work_type, latest_update
        ) VALUES
    `

	values := []interface{}{}
	for i, job := range jobs {
		query += fmt.Sprintf("($%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, CURRENT_TIMESTAMP),",
			i*13+1, i*13+2, i*13+3, i*13+4, i*13+5, i*13+6, i*13+7, i*13+8, i*13+9, i*13+10, i*13+11, i*13+12, i*13+13)
		values = append(values, job.Id, job.AdvertiserID, job.AdvertiserName, job.Area, job.AreaID, job.AreaWhereValue, job.CountryCode, job.ListingDate, job.RoleID, job.Title, job.Salary, job.Teaser, job.WorkType)
	}

	query = query[:len(query)-1] // Remove the trailing comma

	query += `
        ON CONFLICT (id) DO UPDATE SET
            advertiser_id = EXCLUDED.advertiser_id,
            advertiser_name = EXCLUDED.advertiser_name,
            area = EXCLUDED.area,
            area_id = EXCLUDED.area_id,
            area_where_value = EXCLUDED.area_where_value,
            country_code = EXCLUDED.country_code,
            listing_date = EXCLUDED.listing_date,
            role_id = EXCLUDED.role_id,
            title = EXCLUDED.title,
            salary = EXCLUDED.salary,
            teaser = EXCLUDED.teaser,
            work_type = EXCLUDED.work_type,
            latest_update = CURRENT_TIMESTAMP;
    `
	db := postgresqldb.NewRepo().DB()
	if db == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	_, err := db.Exec(query, values...)
	return err
}
