package repo

type DataRepo interface {
	CreateAllTable() error
}

func NewDataRepo() DataRepo {
	return dataRepo{}
}

type dataRepo struct {
}

func (r dataRepo) CreateAllTable() error {
	repojobcount := NewJobDataRepo()
	err := repojobcount.CreateTable()
	if err != nil {
		return err
	}
	repojobscrapelist := NewJobsdbToJobScrapeListRepo()
	err = repojobscrapelist.CreateTable()
	if err != nil {
		return err
	}
	repojobsdatadetails := NewJobsdbDetail()
	err = repojobsdatadetails.CreateTable()
	if err != nil {
		return err
	}
	reposchedule := NewScheduletaskRepo()
	err = reposchedule.CreateTable()
	if err != nil {
		return err
	}
	return nil
}
