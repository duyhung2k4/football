package model

type Orderer struct {
	Id    int `gorm:"primaryKey"`
	Name  string
	Pass  string
	Phone string
}

type Contract struct {
	Id            int `gorm:"pirmaryKey"`
	AmountOfMoney int
	Ball          bool
	Water         bool
	Arbitration   bool
	Status        bool
	Pay           bool
	CoutTime      int
	OrdererId     int
	PitchId       int
	Pitch         Pitch   `gorm:"foreignKey:PitchId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Orderer       Orderer `gorm:"foreignKey:OrdererId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	StartTime     string
	EndTime       string
	ImagePay      string
}

type ImageAuthContract struct {
	Id        int
	LinkImage string
}
