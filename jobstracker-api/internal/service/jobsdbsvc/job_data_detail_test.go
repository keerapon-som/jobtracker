package jobsdbsvc

import (
	"jobtrackker/internal/config"
	"jobtrackker/internal/utils/postgresqldb"
	"testing"
)

func TestSavxxe(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	// postgresqldb.Init()

	svc := NewJobHistoryDetailssvc()
	svc.ScrapeToJobsDataDetails()
}
