package user

import (
	"app/repository/model"
	user "app/repository/module/user"
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

func SignIn(w http.ResponseWriter, r *http.Request) {

	var userSignIn model.Orderer

	json.NewDecoder(r.Body).Decode(&userSignIn)

	isValid := user.CheckIsUserSignIn(userSignIn)

	if isValid == true {

		result, _ := json.Marshal(map[string]interface{}{
			"Warn": "Phone is exist",
		})

		w.Write(result)
	} else {

		user.AddUser(userSignIn)
		userAddContract := user.CheckIsUser(userSignIn)

		tokenAuth := jwtauth.New("HS256", []byte("token"), nil)

		_, tokenString, _ := tokenAuth.Encode(map[string]interface{}{
			"id":    userAddContract.Id,
			"name":  userAddContract.Name,
			"phone": userAddContract.Phone,
		})

		cookie := http.Cookie{
			Name:     "jwt",
			Value:    tokenString,
			Path:     "/user_post",
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

func Login(w http.ResponseWriter, r *http.Request) {

	var userLogin model.Orderer

	json.NewDecoder(r.Body).Decode(&userLogin)

	isValid := user.CheckIsUser(userLogin)

	if isValid.Id != 0 {

		tokenAuth := jwtauth.New("HS256", []byte("token"), nil)

		_, tokenString, _ := tokenAuth.Encode(map[string]interface{}{
			"id":    isValid.Id,
			"name":  isValid.Name,
			"phone": isValid.Phone,
		})

		cookie := http.Cookie{
			Name:     "jwt",
			Value:    tokenString,
			Path:     "/user_post",
			HttpOnly: true,
			MaxAge:   60 * 60,
		}

		http.SetCookie(w, &cookie)

		result, _ := json.Marshal(map[string]interface{}{
			"Token": tokenString,
		})

		w.Write(result)
	} else {
		result, _ := json.Marshal(map[string]interface{}{
			"Text": "None Exsit",
		})

		w.Write(result)
	}

}
