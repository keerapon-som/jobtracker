package webdata

import "time"

type JobscrapeListwebData struct {
	Index               int       `json:"index"`
	UUID                string    `json:"uuid"`
	ID                  int       `json:"id"`
	Jobname             string    `json:"jobname"`
	GetjobsCount        bool      `json:"getjobsCount"`
	GetjobsDetails      bool      `json:"getjobsDetails"`
	GetjobsSuperDetails bool      `json:"getjobsSuperDetails"`
	CreatedAt           time.Time `json:"created_at"`
}
