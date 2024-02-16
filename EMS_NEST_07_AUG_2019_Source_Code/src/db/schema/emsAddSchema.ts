import * as mongoose from "mongoose";

export const emsAddScheme = new mongoose.Schema({
    empName: String,
    phoneNumber: Number,
    userName: String,
    password: String,
    retypePassword: String,
    fullName: String,
    sex: Object,
    nationality: String,
    martialStatus: String,
    dob: Object,
    joiningDate: Object,
    bloodGroup: Object,
    policy: Boolean,
    slider: Object,
    contactNumber: Number,
    personalEmail: String,
    designation: String,
    address: String,
    city: String,
    pinCode: Number
})