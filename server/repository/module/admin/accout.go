package admin

import (
	connect "app/config"
	"app/repository/model"
	"fmt"
)

func CheckIsAdmin(adminLogin model.Admin) model.Admin {

	db := connect.Connect()

	var admin []model.Admin

	fmt.Println("Admin: ", adminLogin)

	db.Where("name = ? AND pass = ? AND code = ?", adminLogin.Name, adminLogin.Pass, adminLogin.Code).Find(&admin)

	if len(admin) == 0 {

		newAdmin := model.Admin{
			Id:   0,
			Name: "",
			Pass: "",
			Code: "",
		}

		return newAdmin
	}

	return admin[0]
}
