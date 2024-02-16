import * as mongoose from "mongoose";

export const emsAttendanceScheme = new mongoose.Schema({

    empId: String,
    userName: String,
    empName: String,
    designation: String,
    attendance: String,
})