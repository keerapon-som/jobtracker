package db

import (
	"time"

	_ "github.com/lib/pq"
)

// CREATE TABLE public.jobscrape_list (
//     id SERIAL PRIMARY KEY,
//     jobname TEXT NOT NULL, UNIQUE(jobname),
//     getjobsCount boolean DEFAULT false,
//     getjobsDetails boolean DEFAULT false,
// );

type Jobscrape_listrepo struct {
	ID             int       `json:"id"`
	UUID           string    `json:"uuid"`
	Jobname        string    `json:"jobname"`
	GetjobsCount   bool      `json:"getjobsCount"`
	GetjobsDetails bool      `json:"getjobsDetails"`
	CreatedAt      time.Time `json:"created_at"`
}
