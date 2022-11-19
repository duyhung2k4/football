package routers

import (
	admin "app/controller/admin"
	user "app/controller/user"
	middlewares "app/middlewares"
	contractAdmin "app/repository/module/admin"

	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
	"gopkg.in/robfig/cron.v2"
)

var tokenAuth *jwtauth.JWTAuth

func Router() {

	app := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})
	app.Use(cors.Handler)
	tokenAuth := jwtauth.New("HS256", []byte("token"), nil)

	c := cron.New()

	c.AddFunc("@every 0h30m0s", contractAdmin.ChangeAge)

	c.Start()

	app.Post("/login", admin.Login)
	app.Route("/admin", func(r chi.Router) {

		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)
		r.Use(middlewares.CheckIsAdmin)

		r.Get("/contract", admin.GetContract)
		r.Get("/pitch", admin.GetPitch)
		r.Post("/addPitch", admin.AddPitch)
		r.Post("/updatePitch", admin.UpdatePitch)
		r.Post("/cancelPitch", admin.CancelPitch)
		r.Post("/cancelContract", admin.CancelContract)
		r.Post("/authContract", admin.AuthorizationContract)
	})

	app.Route("/user", func(r chi.Router) {

		r.Get("/contract", user.GetContract)
		r.Post("/login", user.Login)
		r.Post("/signin", user.SignIn)
	})

	app.Route("/user_post", func(r chi.Router) {

		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)
		r.Use(middlewares.CheckIsUser)

		r.Get("/contract", user.GetContractId)
		r.Get("/pitch", user.GetPitch)
		r.Post("/imageauth", user.ImageAuthentication)
		r.Post("/addContract", user.AddContract)
		r.Post("/updateContract", user.UpdateContract)
		r.Post("/cancelContract", user.CancelContract)
	})

	http.ListenAndServe(":3000", app)

}
