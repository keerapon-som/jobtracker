package postgresqldb

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

type PostgresRepo interface {
	DB() *sql.DB
}

func NewRepo() PostgresRepo {
	return postgresRepo{}
}

type postgresRepo struct {
}

var db *sql.DB

// "user=exporterTest_user password=exporterTest_password dbname=exporterTest sslmode=disable"
func Init(connStr string) {
	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	// defer db.Close()

	// Verify the connection
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Successfully connected to PostgreSQL!")

}

func (r postgresRepo) DB() *sql.DB {
	return db
}

func Close() {
	db.Close()
}
