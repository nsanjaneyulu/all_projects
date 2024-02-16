export interface PaymentEntity {
  webSessionID: string;
  transactionID: string;
  chargeAccountNumberToken: string;
  paymentDeviceLast4: string;
  cardHolderFirstName: string;
  cardHolderLastName: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  postalCode: string;
  chargeExpirationMMYY: string;
  chargeCVN: string;
}
