import { PaymentEntity } from "./PaymentEntity";

export interface OrderEntity {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  products: Array<any>;
  pickUpLocationId: string;
  pickUpLocationName: string;
  paymentAmount: number;
  paymentStatus?: string;
  pickUpDate?: Date;
  paymentCard: PaymentEntity;
  isActive: boolean;
}
