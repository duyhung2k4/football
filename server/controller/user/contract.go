package user

import (
	"app/repository/model"
	user "app/repository/module/user"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/jwtauth/v5"
)

func GetContract(w http.ResponseWriter, r *http.Request) {

	contracts := user.GetContract()

	result, _ := json.Marshal(contracts)

	w.Write(result)
}

func GetContractId(w http.ResponseWriter, r *http.Request) {

	_, claims, _ := jwtauth.FromContext(r.Context())

	idUser := int(claims["id"].(float64))

	listContract := user.GetContractId(idUser)

	result, _ := json.Marshal(listContract)

	w.Write(result)
}

func GetPitch(w http.ResponseWriter, r *http.Request) {

	pitch := user.GetPitch()

	result, _ := json.Marshal(pitch)

	w.Write(result)
}

func AddContract(w http.ResponseWriter, r *http.Request) {

	_, claims, _ := jwtauth.FromContext(r.Context())

	idUser := int(claims["id"].(float64))

	var contract model.Contract

	json.NewDecoder(r.Body).Decode(&contract)

	//Set up End time
	start_time, _ := time.Parse(time.RFC3339, contract.StartTime)
	var minute int = 90 * contract.CoutTime
	new_start_time := start_time.Add(time.Minute * time.Duration(minute))
	strStartTime := new_start_time.String()
	arrayTime := strings.Split(strStartTime, " ")
	str_end_time := arrayTime[0] + "T" + arrayTime[1] + "+07:00"
	contract.EndTime = str_end_time

	dateEnd, _ := time.Parse(time.RFC3339, contract.EndTime)

	timeNow := time.Now()

	if timeNow.Before(dateEnd) {
		contract.Status = true
	} else {
		contract.Status = false
	}

	contract.OrdererId = idUser

	//time: 2022-10-30T09:00:00+07:00

	add := user.AddContract(contract)

	if add == true {

		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Done",
		})

		w.Write(result)
	} else {

		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Error",
		})

		w.Write(result)
	}

}

func UpdateContract(w http.ResponseWriter, r *http.Request) {

	var contract model.Contract

	json.NewDecoder(r.Body).Decode(&contract)

	_, claims, _ := jwtauth.FromContext(r.Context())

	contract.OrdererId = int(claims["id"].(float64))

	isUpdate := user.UpdateContract(contract)

	if isUpdate == true {

		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Done",
		})

		w.Write(result)
	} else {

		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Error",
		})

		w.Write(result)
	}
}

func CancelContract(w http.ResponseWriter, r *http.Request) {

	var cancelContract model.Contract

	json.NewDecoder(r.Body).Decode(&cancelContract)

	_, claims, _ := jwtauth.FromContext(r.Context())

	idUser := int(claims["id"].(float64))

	cancelContract.OrdererId = idUser

	isSucess := user.CancelContract(cancelContract)

	if isSucess == true {

		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Done",
		})

		w.Write(result)
	} else {
		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Error",
		})

		w.Write(result)
	}
}

func ImageAuthentication(w http.ResponseWriter, r *http.Request) {

	var contract model.Contract

	json.NewDecoder(r.Body).Decode(&contract)

	_, claims, _ := jwtauth.FromContext(r.Context())

	idUser := int(claims["id"].(float64))

	contract.OrdererId = idUser

	isDone := user.ImageAuthenticationf(contract)

	if isDone == true {

		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Done",
		})

		w.Write(result)
	} else {
		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Error",
		})

		w.Write(result)
	}

}
