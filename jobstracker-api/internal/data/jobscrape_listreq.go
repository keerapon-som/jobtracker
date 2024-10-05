package data

type Jobscrape_listdata struct {
	Jobname        string `json:"jobname"`
	GetjobsCount   bool   `json:"getjobsCount"`
	GetjobsDetails bool   `json:"getjobsDetails"`
}

type Jobscrape_listdataupdatereq struct {
	ID             int    `json:"id"`
	UUID           string `json:"uuid"`
	Jobname        string `json:"jobname"`
	GetjobsCount   bool   `json:"getjobsCount"`
	GetjobsDetails bool   `json:"getjobsDetails"`
}

type Jobscrape_listdatacreatereq struct {
	Jobname        string `json:"jobname"`
	GetjobsCount   bool   `json:"getjobsCount"`
	GetjobsDetails bool   `json:"getjobsDetails"`
}
