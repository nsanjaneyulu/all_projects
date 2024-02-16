import { Injectable, Inject, Put, Param, Body } from "@nestjs/common";
import { Model } from "mongoose";
import { EmsLeaveRequest } from "../modules/emsLeaveRequest/emsLeaveRequest.model";
import { emsLeaveRequestCreateDto } from "../modules/emsLeaveRequest/emsLeaveRequest.dto";
@Injectable()
export class EmsLeaveRequestService {
    constructor(
        @Inject('EMSLEAVEREQUEST_MODEL') private emsLeaveRequestModel: Model<EmsLeaveRequest>
    ) {

    }
    async create(emsLeaveRequestCreateDto: emsLeaveRequestCreateDto): Promise<EmsLeaveRequest> {
        const emsLeaveRequestNew = new this.emsLeaveRequestModel(emsLeaveRequestCreateDto);
        return await emsLeaveRequestNew.save();
    }
    async findAll(): Promise<EmsLeaveRequest[]> {
        return await this.emsLeaveRequestModel.find().exec();
    }
    async find(id): Promise<EmsLeaveRequest> {
        return await this.emsLeaveRequestModel.findById(id);
    }
}
