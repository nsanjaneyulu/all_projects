import * as mongoose from "mongoose";

export const emsLeaveRequestScheme = new mongoose.Schema({
    userName: String,
    leaveType: String,
    fromDate: Object,
    toDate: Object,
    noOfDays: String,
    leaveReason: String,
    leaveStatus: String
})