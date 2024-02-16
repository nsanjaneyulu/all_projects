import { Document } from 'mongoose';

export interface EmsAttendance extends Document  {
    empId: string,
    userName: string,
    empName: string,
    designation: string,
    attendance: string,
}