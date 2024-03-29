export enum InfoType {
  // General Info
  DB = 'DATABASE URL',
  USER = 'USER INFO',
  HELLO = 'PUBLIC API DATA',
  STATUS = 'STRIPE API STATUS',
  ORDER = 'UPDATE ORDER DATA',
  REPORT = 'UPDATE REPORT DATA',
  PAYMENT = 'UPDATE PAYMENT DATA',
  // Stripe API Errors
  STRIPE = 'CALLING STRIPE API',
  STRIPE200 = 'PAYMENT STATUS UPDATED: STRIPE',
  STRIPE201 = 'PAYMENT STATUS UPDATED: NON STRIPE',
  STRIPE400 = 'PAYMENT STATUS NOT UPDATED',
  STRIPE500 = 'STRIPE API ERROR',
}

export enum ErrorType {
  // General Errors
  API = 'API ERROR',
  DB = 'DATABASE ERROR',
  AUTH = 'UNAUTHORIZED',
  INTERNET = 'PUBLIC API ERROR',
  JSON = 'INVALID JSON',
  SHOP = 'NO SHOP FOUND',
  STRIPE = 'STRIPE API ERROR',
  PAYMENT = 'NO PAYMENT RECORD FOUND',
  // Handler Errors
  COH = 'CREATE ORDER HANDLER ERROR',
  GOH = 'ORDER DETAIL HANDLER ERROR',
  LOH = 'LIST ORDER HANDLER ERROR',
  UOH = 'UPDATE ORDER HANDLER ERROR',
  CRH = 'CREATE REPORT HANDLER ERROR',
  GRH = 'REPORT DETAIL HANDLER ERROR',
  LRH = 'LIST REPORT HANDLER ERROR',
  URH = 'UPDATE REPORT HANDLER ERROR',
  // Controller Errors
  COC = 'CREATE ORDER CONTROLLER ERROR',
  GOC = 'ORDER DETAIL CONTROLLER ERROR',
  LOC = 'LIST ORDER CONTROLLER ERROR',
  UOC = 'UPDATE ORDER CONTROLLER ERROR',
  CRC = 'CREATE REPORT CONTROLLER ERROR',
  GRC = 'REPORT DETAIL CONTROLLER ERROR',
  LRC = 'LIST REPORT CONTROLLER ERROR',
  URC = 'UPDATE REPORT CONTROLLER ERROR',
  GMC = 'MECHANIC DETAIL CONTROLLER ERROR',
  // Service Errors
  COS = 'CREATE ORDER SERVICE ERROR',
  GOS = 'ORDER DETAIL SERVICE ERROR',
  LOS = 'LIST ORDER SERVICE ERROR',
  UOS = 'UPDATE ORDER SERVICE ERROR',
  CRS = 'CREATE REPORT SERVICE ERROR',
  GRS = 'REPORT DETAIL SERVICE ERROR',
  LRS = 'LIST REPORT SERVICE ERROR',
  URS = 'UPDATE REPORT SERVICE ERROR',
}

export enum ServiceType {
  DB = 'AUTOMATE PRO DATABASE',
  STRIPE = 'PAYMENT RECORD',
  ORDER = 'ORDER SERVICE',
  REPORT = 'REPORT SERVICE',
  PAYMENT = 'PAYMENT SERVICE',
  MECHANIC = 'MECHANIC SERVICE',
  HELLO = 'PUBLIC API SERVICE',
}

export enum StatusCode {
  SUCCESS = 200,
  ERROR = 500,
}

export enum MessageType {
  SUCCESS = 'SUCCESSFUL',
  ERROR = 'ERROR',
  DB = 'DATABASE CONNECTED',
  FAIL = 'DATABASE CONNECTION FAILED',
}
