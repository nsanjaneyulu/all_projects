export interface IOrder {
    transactionId: string;
    email: string;
    firstName: string;
    phone:string;
    pickupLocation:string;
    pickupDate:string;
    lastName: string;
    quantity: number;
    amountPaid: number;
  }