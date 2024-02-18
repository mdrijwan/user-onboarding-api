export interface DateUpdate {
  prefer_date: string
  pickedup_at: string
}

export interface ReportUpdate {
  automate_checkup_report: string
  order_checkup_report: string
}

export interface GeneralUpdate {
  vehicle_location: string
  pay_now: boolean
  is_autoshop_order: boolean
}
