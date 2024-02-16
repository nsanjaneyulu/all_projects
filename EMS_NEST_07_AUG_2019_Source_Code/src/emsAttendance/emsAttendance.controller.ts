import { Controller, Get, Post, Req, Res, Body, Put, Param, HttpStatus, Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import { emsAttendanceCreateDto } from '../modules/emsAttendance/emsAttendance.dto';
import { EmsAttendancetService } from './emsAttendance.service';

@Controller('ems')
export class EmsAttendanceController {
    constructor(
        private emsAttendancetService: EmsAttendancetService
    ) {

    }
    @Get('emsAttendanceList')
    findAll(): any {
        console.log("test");
        return this.emsAttendancetService.findAll();
    }
   
    @Post('emsAttendanceAdd')
    create(@Body() emsAttendanceCreateDto: emsAttendanceCreateDto,  @Req() req: Request,  @Res() res: Response) {
        console.log("::: userCreateDto :::", emsAttendanceCreateDto);
        const emsAttendance = this.emsAttendancetService.create(emsAttendanceCreateDto);  
        return res.status(HttpStatus.OK).json({status: true, emsAttendance});
    }
}
