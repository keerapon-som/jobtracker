package data

import "time"

type JobDataJobsdbreq struct {
	JobName string `json:"jobname"`
	Count   int    `json:"count"`
	Error   string `json:"error"`
}

type JobsDataFullStruct struct {
	Data []struct {
		Advertiser struct {
			ID          string `json:"id"`
			Description string `json:"description"`
		} `json:"advertiser"`
		Area               string `json:"area,omitempty"`
		AreaID             int    `json:"areaId,omitempty"`
		AreaWhereValue     string `json:"areaWhereValue,omitempty"`
		AutomaticInclusion bool   `json:"automaticInclusion"`
		Branding           struct {
			ID     string `json:"id"`
			Assets struct {
				Logo struct {
					Strategies struct {
						JdpLogo  string `json:"jdpLogo"`
						SerpLogo string `json:"serpLogo"`
					} `json:"strategies"`
				} `json:"logo"`
			} `json:"assets"`
		} `json:"branding,omitempty"`
		BulletPoints   []string `json:"bulletPoints"`
		Classification struct {
			ID          string `json:"id"`
			Description string `json:"description"`
		} `json:"classification"`
		CompanyName                    string `json:"companyName,omitempty"`
		CompanyProfileStructuredDataID int    `json:"companyProfileStructuredDataId"`
		DisplayStyle                   struct {
			Search string `json:"search"`
		} `json:"displayStyle,omitempty"`
		DisplayType        string `json:"displayType"`
		ListingDateDisplay string `json:"listingDateDisplay"`
		Location           string `json:"location"`
		LocationID         int    `json:"locationId"`
		LocationWhereValue string `json:"locationWhereValue"`
		ID                 int    `json:"id"`
		IsPremium          bool   `json:"isPremium"`
		IsStandOut         bool   `json:"isStandOut"`
		JobLocation        struct {
			Label        string `json:"label"`
			CountryCode  string `json:"countryCode"`
			SeoHierarchy []struct {
				ContextualName string `json:"contextualName"`
			} `json:"seoHierarchy"`
		} `json:"jobLocation"`
		ListingDate time.Time `json:"listingDate"`
		Logo        struct {
			ID          string      `json:"id"`
			Description interface{} `json:"description"`
		} `json:"logo"`
		RoleID      string `json:"roleId,omitempty"`
		Salary      string `json:"salary"`
		SolMetadata struct {
			SearchRequestToken string `json:"searchRequestToken"`
			Token              string `json:"token"`
			JobID              string `json:"jobId"`
			Section            string `json:"section"`
			SectionRank        int    `json:"sectionRank"`
			JobAdType          string `json:"jobAdType"`
			Tags               struct {
				MordorFlights string `json:"mordor__flights"`
				MordorS       string `json:"mordor__s"`
			} `json:"tags"`
		} `json:"solMetadata"`
		SubClassification struct {
			ID          string `json:"id"`
			Description string `json:"description"`
		} `json:"subClassification"`
		Teaser           string `json:"teaser"`
		Title            string `json:"title"`
		Tracking         string `json:"tracking"`
		WorkType         string `json:"workType"`
		WorkArrangements struct {
			Data []struct {
				ID    string `json:"id"`
				Label struct {
					Text string `json:"text"`
				} `json:"label"`
			} `json:"data"`
		} `json:"workArrangements"`
		IsPrivateAdvertiser bool `json:"isPrivateAdvertiser"`
		Tags                []struct {
			Type  string `json:"type"`
			Label string `json:"label"`
		} `json:"tags,omitempty"`
		SearchInsights struct {
			UnmatchedKeywords []string `json:"unmatchedKeywords"`
		} `json:"searchInsights,omitempty"`
	} `json:"data"`
	Title                string `json:"title"`
	TotalCount           int    `json:"totalCount"`
	TotalPages           int    `json:"totalPages"`
	PaginationParameters struct {
		SeekSelectAllPages bool `json:"seekSelectAllPages"`
		HadPremiumListings bool `json:"hadPremiumListings"`
	} `json:"paginationParameters"`
	Info struct {
		TimeTaken  int    `json:"timeTaken"`
		Source     string `json:"source"`
		Experiment string `json:"experiment"`
	} `json:"info"`
	UserQueryID string `json:"userQueryId"`
	SortMode    []struct {
		IsActive bool   `json:"isActive"`
		Name     string `json:"name"`
		Value    string `json:"value"`
	} `json:"sortMode"`
	SolMetadata struct {
		RequestToken  string `json:"requestToken"`
		Token         string `json:"token"`
		Keywords      string `json:"keywords"`
		SortMode      string `json:"sortMode"`
		PageSize      int    `json:"pageSize"`
		PageNumber    int    `json:"pageNumber"`
		TotalJobCount int    `json:"totalJobCount"`
		Tags          struct {
			MordorSearchMarket     string `json:"mordor:searchMarket"`
			MordorResultCountRst   string `json:"mordor:result_count_rst"`
			MordorResultCountVec   string `json:"mordor:result_count_vec"`
			MordorRt               string `json:"mordor:rt"`
			MordorVsRetrievedCount string `json:"mordor_vs:retrieved_count"`
			MordorCountVec         string `json:"mordor:count_vec"`
			MordorFlights          string `json:"mordor__flights"`
			MordorCountRst         string `json:"mordor:count_rst"`
			MordorCountIr          string `json:"mordor:count_ir"`
			MordorResultCountIr    string `json:"mordor:result_count_ir"`
			ChaliceSearchAPISolID  string `json:"chalice-search-api:solId"`
		} `json:"tags"`
	} `json:"solMetadata"`
	Facets struct {
	} `json:"facets"`
	JoraCrossLink struct {
		CanCrossLink bool `json:"canCrossLink"`
	} `json:"joraCrossLink"`
	SearchParams struct {
		Sitekey               string `json:"sitekey"`
		Sourcesystem          string `json:"sourcesystem"`
		Userqueryid           string `json:"userqueryid"`
		Userid                string `json:"userid"`
		Usersessionid         string `json:"usersessionid"`
		Eventcapturesessionid string `json:"eventcapturesessionid"`
		Page                  string `json:"page"`
		Seekselectallpages    string `json:"seekselectallpages"`
		Keywords              string `json:"keywords"`
		Pagesize              string `json:"pagesize"`
		Include               string `json:"include"`
		Locale                string `json:"locale"`
		Seekerid              string `json:"seekerid"`
		Solid                 string `json:"solid"`
	} `json:"searchParams"`
}
