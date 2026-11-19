export interface Drink {
  id: number
  name: string
  pricePerLiter: number
  volume: number
}

export interface PromoCode {
  code: string
  discountPercent: number
}