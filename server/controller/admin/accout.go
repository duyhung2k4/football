package admin

import (
	"app/repository/model"
	admin "app/repository/module/admin"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

func Login(w http.ResponseWriter, r *http.Request) {

	var adminLogin model.Admin

	json.NewDecoder(r.Body).Decode(&adminLogin)

	fmt.Println("Admin login: ", adminLogin)

	adminAccout := admin.CheckIsAdmin(adminLogin)

	if adminAccout.Id == 0 {

		result, _ := json.Marshal(map[string]interface{}{
			"Warn": "None Exist",
		})

		w.Write(result)
	} else {

		tokenAuth := jwtauth.New("HS256", []byte("token"), nil)

		_, tokenString, _ := tokenAuth.Encode(map[string]interface{}{
			"id":   adminAccout.Id,
			"name": adminAccout.Name,
			"code": adminAccout.Code,
		})

		cookie := http.Cookie{
			Name:     "jwt",
			Value:    tokenString,
			Path:     "/admin",
			HttpOnly: true,
			MaxAge:   60 * 60,
		}

		http.SetCookie(w, &cookie)

		result, _ := json.Marshal(map[string]interface{}{
			"Token": tokenString,
		})

		w.Write(result)
	}
}
