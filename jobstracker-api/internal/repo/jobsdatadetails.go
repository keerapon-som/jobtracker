package repo

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"jobtrackker/internal/data"
	"jobtrackker/internal/data/db"
	"jobtrackker/internal/utils/postgresqldb"
	"log"
)

type JobsdbDetail interface {
	CreateTable() error
	InsertOrUpdateJobs(jobs []data.JobsDatadetailsData) error
	UpdateJobsSuperDetail(jobs []data.JobsDatadetailsData) error
	SelectUpdateListSuperDetail(length int) ([]db.JobsDatadetailsDB, error)
	GetListDataAndTotals(page int, pagesize int) ([]db.JobsDatadetailsDB, int, error)
	GetSuperDetailByID(id int) (map[string]interface{}, error)
	UpdateSuperDetailAsPrettyFormat(id int, data map[string]interface{}) error
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
			latest_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
			superdetail JSONB
		);`)
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

func (r jobsdbDetail) UpdateJobsSuperDetail(jobs []data.JobsDatadetailsData) error {
	query := `
		UPDATE public.jobsdatadetails
		SET superdetail = $1
		WHERE id = $2
	`

	db := postgresqldb.NewRepo().DB()
	if db == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	for _, job := range jobs {
		superDetailJSON, err := json.Marshal(job.SuperDetail)
		if err != nil {
			return err
		}
		_, err = db.Exec(query, superDetailJSON, job.Id)
		if err != nil {
			log.Println("error in update super detail ", err)
			return err
		}
	}

	return nil
}

func (r jobsdbDetail) SelectUpdateListSuperDetail(length int) ([]db.JobsDatadetailsDB, error) {
	query := `
        SELECT id, advertiser_id, advertiser_name, area, area_id, area_where_value, country_code, listing_date, role_id, title, salary, teaser, work_type, latest_update, superdetail
        FROM public.jobsdatadetails
        WHERE superdetail IS NULL
        LIMIT $1
    `

	dbpg := postgresqldb.NewRepo().DB()
	if dbpg == nil {
		log.Println("db is nil")
		return nil, errors.New("error init db")
	}

	rows, err := dbpg.Query(query, length)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	jobs := []db.JobsDatadetailsDB{}
	for rows.Next() {
		job := db.JobsDatadetailsDB{}
		var superDetailJSON sql.NullString

		err := rows.Scan(
			&job.Id,
			&job.AdvertiserID,
			&job.AdvertiserName,
			&job.Area,
			&job.AreaID,
			&job.AreaWhereValue,
			&job.CountryCode,
			&job.ListingDate,
			&job.RoleID,
			&job.Title,
			&job.Salary,
			&job.Teaser,
			&job.WorkType,
			&job.LatestUpdate,
			&superDetailJSON,
		)
		if err != nil {
			return nil, err
		}

		if superDetailJSON.Valid {
			err = json.Unmarshal([]byte(superDetailJSON.String), &job.SuperDetail)
			if err != nil {
				return nil, err
			}
		} else {
			job.SuperDetail = nil
		}

		jobs = append(jobs, job)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return jobs, nil
}

func (r jobsdbDetail) GetListDataAndTotals(page int, pagesize int) ([]db.JobsDatadetailsDB, int, error) {
	query := `
		SELECT id, advertiser_id, advertiser_name, area, area_id, area_where_value, country_code, listing_date, role_id, title, salary, teaser, work_type, latest_update
		FROM public.jobsdatadetails
		WHERE superdetail ? 'job_details'
		ORDER BY id
		LIMIT $1 OFFSET $2
	`

	dbpg := postgresqldb.NewRepo().DB()
	if dbpg == nil {
		log.Println("db is nil")
		return nil, 0, errors.New("error init db")
	}

	rows, err := dbpg.Query(query, pagesize, (page-1)*pagesize)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	jobs := []db.JobsDatadetailsDB{}
	for rows.Next() {
		job := db.JobsDatadetailsDB{}
		var superDetailJSON sql.NullString

		err := rows.Scan(
			&job.Id,
			&job.AdvertiserID,
			&job.AdvertiserName,
			&job.Area,
			&job.AreaID,
			&job.AreaWhereValue,
			&job.CountryCode,
			&job.ListingDate,
			&job.RoleID,
			&job.Title,
			&job.Salary,
			&job.Teaser,
			&job.WorkType,
			&job.LatestUpdate,
		)
		if err != nil {
			return nil, 0, err
		}

		if superDetailJSON.Valid {
			err = json.Unmarshal([]byte(superDetailJSON.String), &job.SuperDetail)
			if err != nil {
				return nil, 0, err
			}
		} else {
			job.SuperDetail = nil
		}

		jobs = append(jobs, job)
	}

	if err := rows.Err(); err != nil {
		return nil, 0, err
	}

	totalRows := 0
	err = dbpg.QueryRow("SELECT COUNT(*) FROM public.jobsdatadetails").Scan(&totalRows)
	if err != nil {
		return nil, 0, err
	}

	return jobs, totalRows, nil
}

func (r jobsdbDetail) GetSuperDetailByID(id int) (map[string]interface{}, error) {
	query := `
		SELECT superdetail
		FROM public.jobsdatadetails
		WHERE id = $1
	`

	dbpg := postgresqldb.NewRepo().DB()
	if dbpg == nil {
		log.Println("db is nil")
		return nil, errors.New("error init db")
	}

	var superDetailJSON sql.NullString
	err := dbpg.QueryRow(query, id).Scan(&superDetailJSON)
	if err != nil {
		return nil, err
	}

	if superDetailJSON.Valid {
		superDetail := map[string]interface{}{}
		err = json.Unmarshal([]byte(superDetailJSON.String), &superDetail)
		if err != nil {
			return nil, err
		}
		return superDetail, nil
	}

	return nil, nil
}

func (r jobsdbDetail) UpdateSuperDetailAsPrettyFormat(id int, data map[string]interface{}) error {
	query := `
		UPDATE public.jobsdatadetails
		SET superdetail = $1
		WHERE id = $2
	`

	db := postgresqldb.NewRepo().DB()
	if db == nil {
		log.Println("db is nil")
		return errors.New("error init db")
	}

	superDetailJSON, err := json.Marshal(data)
	if err != nil {
		return err
	}
	_, err = db.Exec(query, superDetailJSON, id)
	if err != nil {
		log.Println("error in update super detail ", err)
		return err
	}

	return nil
}
