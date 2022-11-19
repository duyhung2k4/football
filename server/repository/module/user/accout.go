package user

import (
	connect "app/config"
	"app/repository/model"
)

func CheckIsUser(user model.Orderer) model.Orderer {

	db := connect.Connect()

	var listUSer []model.Orderer

	db.Where("name = ? AND pass = ? AND phone = ?", user.Name, user.Pass, user.Phone).Find(&listUSer)

	if len(listUSer) == 0 {
		notUser := model.Orderer{
			Id:    0,
			Name:  "",
			Pass:  "",
			Phone: "",
		}

		return notUser
	} else {
		return listUSer[0]
	}

}

func CheckIsUserSignIn(user model.Orderer) bool {

	db := connect.Connect()
	var listUser []model.Orderer

	db.Where("phone = ?", user.Phone).Find(&listUser)

	if len(listUser) != 0 {
		return true
	} else {
		return false
	}

}

func AddUser(user model.Orderer) {

	db := connect.Connect()

	db.Create(&user)
}
