export interface PaymentMethod {  
  cardType: string,
  cardId: number,
}

export interface Card extends PaymentMethod {
  userName: string,
  cardNumber: number,
  month: number,
  year: number,
  safeCode: number,  
}

export interface Invoice extends PaymentMethod {
  email: string,
}

export interface SmsLoan extends PaymentMethod {
  mobileNumber: number
}

export interface Swish extends PaymentMethod {
  mobileNumber: number
}

export const PaymentMethods: PaymentMethod[] = [
  
  {
    cardType: "Betalkort",
    cardId: 1,
    userName: "",
    cardNumber: 0,
    month: 1,
    year: 23,
    safeCode: 111,  
  } as Card,
  {
    cardType: "Faktura",
    cardId: 2,
    email: "david@sensei.se",
  } as Invoice,
  {
    cardType: "SMS-lån",
    cardId: 3,
    mobileNumber: +467012345678

  } as SmsLoan,
  {
    cardType: "Swish",
    cardId: 4,
    mobileNumber: +467012345678
  } as Swish

]



