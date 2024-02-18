export interface FilterOrder {
  created_at?: string
  is_autoshop_order: boolean
  page?: number
  page_size?: number
  shop: string
  status?: string
  license_plate?: string
  name?: string
  mobile?: string
  condition?: string
}

export interface CreateReport {
  car_id: string
  created_at?: string
  img_urls?: string[]
  inspection_items: object
  name: string
  type: string
  remarks?: string
  service_category: string
  status: string
  updated_at?: string
}

export interface UpdateReport {
  inspection_items?: object
  remarks?: string
  status: string
  published_at?: string
  updated_at: string
}

export interface FilterReport {
  status?: string
  type?: string
  remarks?: string
  page?: number
  page_size?: number
}

export interface UpdatePayment {
  status: string
  updated_at: string
}

export interface PaymentDto {
  paymentRec: string
  orderStatus: string
  paymentGateway: string
}
