package db

import "time"

type JobsDatadetailsDB struct {
	Index          int       `json:"index"`
	Id             int       `json:"id"`
	AdvertiserID   string    `json:"advertiserId"`
	AdvertiserName string    `json:"advertiserName"`
	Area           string    `json:"area"`
	AreaID         int       `json:"areaId"`
	AreaWhereValue string    `json:"areaWhereValue"`
	CountryCode    string    `json:"countryCode"`
	ListingDate    time.Time `json:"listingDate"`
	RoleID         string    `json:"roleId"`
	Title          string    `json:"title"`
	Salary         string    `json:"salary"`
	Teaser         string    `json:"teaser"`
	WorkType       string    `json:"workType"`
	LatestUpdate   time.Time `json:"latest_update"`
	Error          string    `json:"error"`
}
