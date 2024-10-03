package db

import (
	"time"

	_ "github.com/lib/pq"
)

type JobDataJobsdb struct {
	ID          int       `json:"id"`
	JobName     string    `json:"jobname"`
	Count       int       `json:"count"`
	CollectedAt time.Time `json:"collected_at"`
}
