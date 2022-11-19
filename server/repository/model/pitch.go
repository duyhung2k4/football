package model

type Pitch struct {
	Id              int `gorm:"primaryKey"`
	Money           int
	Index           int
	Status          bool
	CoinBall        int
	CoinWater       int
	CoinArbitration int
	AmountOfPeople  int
}
