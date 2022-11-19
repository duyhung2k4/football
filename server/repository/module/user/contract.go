package user

import (
	connect "app/config"
	"app/repository/model"
	"time"

	"gopkg.in/robfig/cron.v2"
)

func GetContract() []model.Contract {

	db := connect.Connect()

	var contracts []model.Contract

	db.Model(model.Contract{}).Where("status = ?", true).
		Preload("Pitch").Find(&contracts)

	newList := SortContract(contracts)

	return newList

}

func GetContractWithPitch(idPitch int) []model.Contract {

	db := connect.Connect()

	var contract []model.Contract

	db.Model(&model.Contract{}).
		Where("pitch_id = ?", idPitch).
		Find(&contract)

	return contract
}

func GetContractId(idUser int) []model.Contract {

	db := connect.Connect()

	var listContract []model.Contract

	db.Model(&model.Contract{}).
		Where("orderer_id = ? AND status = ?", idUser, true).
		Preload("Pitch").
		Find(&listContract)

	newList := SortContract(listContract)

	return newList
}

func GetPitchById(idPitch int) model.Pitch {

	db := connect.Connect()

	var pitch []model.Pitch

	db.Model(&model.Pitch{}).
		Where("id = ? AND status = ?", idPitch, true).
		Find(&pitch)

	return pitch[0]
}

func AddContract(contract model.Contract) bool {

	db := connect.Connect()

	isValidTime := CheckTimeContract(contract)

	if isValidTime == true {

		c := cron.New()

		c.AddFunc("@every 24h0m0s", func() {

			var changeContract []model.Contract
			db.Model(&model.Contract{}).
				Where(
					`start_time = ? AND 
					end_time = ? AND 
					orderer_id = ? AND 
					pitch_id = ?`,
					contract.StartTime,
					contract.EndTime,
					contract.OrdererId,
					contract.PitchId).
				Find(&changeContract)

			if changeContract[0].Pay == false {
				db.Model(&model.Contract{}).
					Where("id = ?", changeContract[0].Id).
					Update("status", false)
			}

			c.Stop()
		})

		c.Start()

		pitch := GetPitchById(contract.PitchId)

		money := contract.CoutTime * pitch.Money

		if contract.Arbitration == true {
			money += pitch.CoinArbitration
		}
		if contract.Ball == true {
			money += pitch.CoinBall
		}
		if contract.Water == true {
			money += pitch.CoinWater
		}

		contract.AmountOfMoney = money

		add := db.Create(&contract)
		if add.Error != nil {
			return false
		} else {
			return true
		}
	} else {
		return false
	}

}

func UpdateContract(contract model.Contract) bool {

	db := connect.Connect()

	if contract.Pay == true {
		return false
	} else {
		result := db.Model(&model.Contract{}).
			Where("id = ? AND orderer_id = ?", contract.Id, contract.OrdererId).
			Updates(&contract)
		if result.Error == nil {
			return true
		} else {
			return false
		}
	}
}

func CancelContract(contractCancel model.Contract) bool {

	db := connect.Connect()

	if contractCancel.Pay == true {
		return false
	} else {

		result := db.Model(&contractCancel).Where("id = ? AND orderer_id = ?", contractCancel.Id, contractCancel.OrdererId).
			Update("status", false)

		if result.Error == nil {
			return true
		} else {
			return false
		}
	}

}

func SortContract(listContract []model.Contract) []model.Contract {

	for i := 0; i < len(listContract)-1; i++ {

		for j := i + 1; j < len(listContract); j++ {
			startTime1, _ := time.Parse(time.RFC3339, listContract[i].StartTime)
			startTime2, _ := time.Parse(time.RFC3339, listContract[j].StartTime)

			if startTime1.After(startTime2) == true {

				c := listContract[i]

				listContract[i] = listContract[j]
				listContract[j] = c
			}
		}
	}

	return listContract
}

func CheckTimeContract(contract model.Contract) bool {

	listContrat := GetContractWithPitch(contract.PitchId)

	startTime, _ := time.Parse(time.RFC3339, contract.StartTime)
	endTime, _ := time.Parse(time.RFC3339, contract.EndTime)

	for i := 0; i < len(listContrat); i++ {

		startTimeContract, _ := time.Parse(time.RFC3339, listContrat[i].StartTime)
		endTimeContract, _ := time.Parse(time.RFC3339, listContrat[i].EndTime)

		if endTime.Before(endTimeContract) && endTime.After(startTimeContract) || endTime.Equal(endTimeContract) {
			return false
		} else if startTime.Before(endTimeContract) && startTime.After(startTimeContract) || startTime.Equal(startTimeContract) {
			return false
		} else if startTime.Before(startTimeContract) && endTimeContract.After(endTimeContract) {
			return false
		} else if startTimeContract.Equal(endTimeContract) {
			return false
		}
	}

	return true
}

func ImageAuthenticationf(contract model.Contract) bool {

	db := connect.Connect()

	result := db.Model(&model.Contract{}).Where("id = ? AND orderer_id = ?", contract.Id, contract.OrdererId).Update("image_pay", contract.ImagePay)

	if result.Error == nil {
		return true
	} else {
		return false
	}
}

func GetPitch() []model.Pitch {

	db := connect.Connect()

	var pitchs []model.Pitch

	db.Model(&model.Pitch{}).
		Where("status = ?", true).
		Find(&pitchs)

	return pitchs
}
