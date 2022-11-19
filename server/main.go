package main

import (
	connect "app/config"
	model "app/repository/model"
	"app/routers"
)

func main() {

	db := connect.Connect()

	db.AutoMigrate(
		model.Orderer{},
		model.Contract{},
		model.Pitch{},
		model.Admin{},
	)

	routers.Router()
}
