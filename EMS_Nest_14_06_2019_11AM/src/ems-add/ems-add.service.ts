import { Injectable, Inject, Put, Param, Body } from "@nestjs/common";
import { Model } from "mongoose";
import { EmsAdd } from "../modules/emsAdd/emsAdd.model";
import { emsAddCreateDto } from "../modules/emsAdd/emsAdd.dto";
@Injectable()
export class EmsAddService {
    constructor(
        @Inject('EMSADD_MODEL') private emsAddModel: Model<EmsAdd>
    ) {

    }
    async create(emsAddCreateDto: emsAddCreateDto): Promise<EmsAdd> {
        const emsAddNew = new this.emsAddModel(emsAddCreateDto);
        return await emsAddNew.save();
    }
    async findAll(): Promise<EmsAdd[]> {
        return await this.emsAddModel.find().exec();
    }
    async find(id): Promise<EmsAdd> {
        return await this.emsAddModel.findById(id);
    }
}
