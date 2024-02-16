import { Document } from 'mongoose';

export interface EmsLeaveRequest extends Document  {
    userName: string,
    leaveType: string,
    fromDate: object,
    toDate: object,
    noOfDays: string,
    leaveReason: string
}