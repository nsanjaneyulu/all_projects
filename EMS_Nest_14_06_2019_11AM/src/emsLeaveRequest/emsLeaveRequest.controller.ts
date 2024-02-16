import { Controller, Get, Post, Req, Res, Body, Put, Param, HttpStatus, Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import { emsLeaveRequestCreateDto } from '../modules/emsLeaveRequest/emsLeaveRequest.dto';
import { EmsLeaveRequestService } from './emsLeaveRequestService';

@Controller('ems')
export class EmsLeaveRequestController {
    constructor(
        private emsLeaveRequestService: EmsLeaveRequestService
    ) {

    }
    @Get('emsLeaveStatus')
    findAll(): any {
        return this.emsLeaveRequestService.findAll();
    }
   
    @Post('emsLeaveRequest')
    create(@Body() emsLeaveRequestCreateDto: emsLeaveRequestCreateDto,  @Req() req: Request,  @Res() res: Response) {
        console.log("::: userCreateDto :::", emsLeaveRequestCreateDto);
        const emsLeaveRequest = this.emsLeaveRequestService.create(emsLeaveRequestCreateDto);  
        return res.status(HttpStatus.OK).json({status: true, emsLeaveRequest});
    }
}
