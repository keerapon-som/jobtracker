package repo

import (
	"jobtrackker/internal/config"
	"jobtrackker/internal/data"
	"jobtrackker/internal/utils/postgresqldb"
	"log"
	"testing"
)

func TestSave(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	repo := NewJobDataRepo()
	repo.Insert([]data.JobDataJobsdbreq{
		{
			JobName: "Software Engineer",
			Count:   100,
		},
	})
}

func TestGetall(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	repo := NewJobDataRepo()
	data, err := repo.GetJobData()
	if err != nil {
		t.Errorf("error in get all")
	}
	log.Println(data)
}
