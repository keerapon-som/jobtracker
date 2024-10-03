package jobsdbsvc

import (
	"jobtrackker/internal/config"
	"jobtrackker/internal/utils/postgresqldb"
	"testing"
)

func TestSave(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	// postgresqldb.Init()

	svc := NewJobcountHistorysvc()
	svc.ScrapeJobDataToDB()
}
