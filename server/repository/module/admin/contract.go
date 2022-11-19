package admin

import (
	connect "app/config"
	"app/repository/model"
	contract "app/repository/module/user"
	"time"
)

func AuthorizationContract(contract model.Contract) bool {

	db := connect.Connect()

	result := db.Model(&model.Contract{}).Where("id = ?", contract.Id).Update("pay", true)

	if result.Error == nil {
		return true
	} else {
		return false
	}
}

func GetContract() []model.Contract {

	db := connect.Connect()

	var contracts []model.Contract

	db.Model(&model.Contract{}).
		Where("status = ?", true).
		Preload("Pitch").
		Find(&contracts)

	return contracts

}

func ChangeAge() {

	db := connect.Connect()

	listContract := contract.GetContract()

	timeNow := time.Now()

	for i := 0; i < len(listContract); i++ {

		timeEnd, _ := time.Parse(time.RFC3339, listContract[i].EndTime)

		if timeNow.After(timeEnd) == true {
			db.Model(&model.Contract{}).Where("id = ?", listContract[i].Id).Update("status", false)
		}
	}
}
