package admin

import (
	connect "app/config"
	"app/repository/model"
)

func GetPitch() []model.Pitch {

	db := connect.Connect()

	var pitchs []model.Pitch

	db.Model(&model.Pitch{}).
		Find(&pitchs)

	return pitchs
}

func AddPitch(pitch model.Pitch) {

	db := connect.Connect()

	db.Create(&pitch)

}

func CheckIsPitch(pitch model.Pitch) bool {

	db := connect.Connect()

	var listPitch []model.Pitch

	db.Where("index = ?", pitch.Index).Find(&listPitch)

	if len(listPitch) == 0 {
		return false
	} else {
		return true
	}
}

func UpdatePitch(pitch model.Pitch) bool {

	db := connect.Connect()

	isValid := CheckIsPitch(pitch)

	if isValid == true {
		db.Model(&model.Pitch{}).Where("id = ?", pitch.Id).Updates(pitch)
		db.Model(&model.Pitch{}).Where("id = ?", pitch.Id).Update("status", pitch.Status)
		return true
	} else {
		return false
	}

}

func CancelPitch(pitch model.Pitch) bool {

	db := connect.Connect()

	result := db.Model(&model.Pitch{}).Where("id = ?", pitch.Id).Update("status", false)

	if result.Error == nil {
		return true
	} else {
		return false
	}

}
