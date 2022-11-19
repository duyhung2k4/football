package admin

import (
	"app/repository/model"
	admin "app/repository/module/admin"
	contract "app/repository/module/user"
	"encoding/json"
	"net/http"
)

func GetContract(w http.ResponseWriter, r *http.Request) {

	listContract := admin.GetContract()

	result, _ := json.Marshal(listContract)

	w.Write(result)

}

func AuthorizationContract(w http.ResponseWriter, r *http.Request) {

	var contract model.Contract

	json.NewDecoder(r.Body).Decode(&contract)

	isAuthContract := admin.AuthorizationContract(contract)

	if isAuthContract == true {
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

	var contractPitch model.Contract

	json.NewDecoder(r.Body).Decode(&contractPitch)

	isCancel := contract.CancelContract(contractPitch)

	if isCancel == true {
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
