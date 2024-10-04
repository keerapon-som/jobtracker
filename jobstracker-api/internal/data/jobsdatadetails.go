package data

import "time"

type JobsDatadetailsData struct {
	Id             int                    `json:"id"`
	AdvertiserID   string                 `json:"advertiserId"`
	AdvertiserName string                 `json:"advertiserName"`
	Area           string                 `json:"area"`
	AreaID         int                    `json:"areaId"`
	AreaWhereValue string                 `json:"areaWhereValue"`
	CountryCode    string                 `json:"countryCode"`
	ListingDate    time.Time              `json:"listingDate"`
	RoleID         string                 `json:"roleId"`
	Title          string                 `json:"title"`
	Teaser         string                 `json:"teaser"`
	Salary         string                 `json:"salary"`
	WorkType       string                 `json:"workType"`
	SuperDetail    map[string]interface{} `json:"superDetail"`
}
