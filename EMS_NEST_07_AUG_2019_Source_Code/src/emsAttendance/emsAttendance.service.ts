import { Injectable, Inject, Put, Param, Body } from "@nestjs/common";
import { Model } from "mongoose";
import { EmsAttendance } from "../modules/emsAttendance/emsAttendance.model";
import { emsAttendanceCreateDto } from "../modules/emsAttendance/emsAttendance.dto";
@Injectable()
export class EmsAttendancetService {
    constructor(
        @Inject('EMSLATTENDENCE_MODEL') private emsAttendanceListModel: Model<EmsAttendance>
    ) {

    }
    async create(emsAttendanceCreateDto: emsAttendanceCreateDto): Promise<EmsAttendance> {
        const emsAttendanceNew = new this.emsAttendanceListModel(emsAttendanceCreateDto);
        return await emsAttendanceNew.save();
    }
    async findAll(): Promise<EmsAttendance[]> {
        console.log("test");
        return await this.emsAttendanceListModel.find().exec();
    }
    // async find(id): Promise<EmsLeaveRequest> {
    //     return await this.emsLeaveRequestModel.findById(id);
    // }
}
