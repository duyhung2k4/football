package config

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {

	sql := "host=localhost user=postgres password=123456 dbname=football port=5000 sslmode=disable"

	db, err := gorm.Open(postgres.Open(sql), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	return db
}
