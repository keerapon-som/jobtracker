package main

import (
	"jobtrackker/handlers"
	"jobtrackker/internal/config"
	"jobtrackker/internal/repo"
	"jobtrackker/internal/utils/postgresqldb"
	"jobtrackker/internal/worker"
)

func main() {
	config := config.GetConfig()
	defer func() {
		//cleanup resources
		// mongodb.Uninit()
		// redisdb.Uninit()
		postgresqldb.Close()
		// worker.CloseZeebe()
	}()
	postgresqldb.Init(config.PostgreSQL.ConnectionString)
	repo := repo.NewDataRepo()
	err := repo.CreateAllTable()
	if err != nil {
		panic("error in create table")
	}

	// justrun one time
	// repo := repo.NewJobsdbToJobScrapeListRepo()
	// err := repo.InitialData()
	// if err != nil {
	// 	panic("error in initiate")
	// }

	// jobsdbsvc.NewJobcountHistorysvc().ScrapeJobDataToDB()
	go worker.TickerScheduler()

	app := handlers.CreateHandlers()

	app.Listen(":8080")
	// Initialize Redis client
	// redisdb.Init("localhost:6379", "exampleRedisPassword", 0)

	// Create a new StreamManager

}
