package model

type Admin struct {
	Id   int `gorm:"primaryKey"`
	Name string
	Pass string
	Code string
}

type AdminLogin struct {
	Name string
	Pass string
	Code string
}
