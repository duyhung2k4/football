package admin

import (
	"app/repository/model"
	admin "app/repository/module/admin"
	"encoding/json"
	"net/http"
)

func GetPitch(w http.ResponseWriter, r *http.Request) {

	pitchs := admin.GetPitch()

	result, _ := json.Marshal(pitchs)

	w.Write(result)
}

func AddPitch(w http.ResponseWriter, r *http.Request) {

	var pitch model.Pitch

	json.NewDecoder(r.Body).Decode(&pitch)

	isValid := admin.CheckIsPitch(pitch)

	if isValid == true {

		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Exist",
		})

		w.Write(result)
	} else {
		admin.AddPitch(pitch)

		result, _ := json.Marshal(map[string]interface{}{
			"Text": "Done",
		})

		w.Write(result)
	}

}

func UpdatePitch(w http.ResponseWriter, r *http.Request) {

	var pitch model.Pitch

	json.NewDecoder(r.Body).Decode(&pitch)

	isUpdate := admin.UpdatePitch(pitch)

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

func CancelPitch(w http.ResponseWriter, r *http.Request) {

	var pitch model.Pitch

	json.NewDecoder(r.Body).Decode(&pitch)

	isCancel := admin.CancelPitch(pitch)

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
