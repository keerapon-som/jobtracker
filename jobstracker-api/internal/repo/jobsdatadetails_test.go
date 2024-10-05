package repo

import (
	"jobtrackker/internal/config"
	"jobtrackker/internal/utils/postgresqldb"
	"log"
	"testing"
)

func TestGetDetails(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()

	repo := NewJobsdbDetail()
	data, err := repo.SelectUpdateListSuperDetail(5)
	if err != nil {
		t.Errorf("error in get all, %v", err)
	}
	log.Println(data)
}
