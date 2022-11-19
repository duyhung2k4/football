package middleware

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

func CheckIsAdmin(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		_, claims, _ := jwtauth.FromContext(r.Context())

		if claims["code"] == nil {

			result, _ := json.Marshal(map[string]interface{}{
				"Warn": "Not is Admin",
			})

			w.Write(result)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}
