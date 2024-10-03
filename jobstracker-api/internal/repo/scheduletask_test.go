package repo

import (
	"fmt"
	"jobtrackker/internal/config"
	"jobtrackker/internal/utils/postgresqldb"
	"testing"
)

func TestGexxlZZ(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	repo := NewScheduletaskRepo()
	data, err := repo.GetListSchedule()
	if err != nil {
		fmt.Println("error in get all", err)
	}
	fmt.Println(data)
}

func TestGetScheduleDataWithPageSize(t *testing.T) {
	config := config.GetConfig()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)

	defer postgresqldb.Close()
	repo := NewScheduletaskRepo()
	data, total, err := repo.GetScheduleDataWithPageSize(2, 10)
	if err != nil {
		fmt.Println("error in get all", err)
	}
	fmt.Println(data)
	fmt.Println(total)
}
