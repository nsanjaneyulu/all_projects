import { Controller, Get, Post, Req, Res, Body, Put, Param, HttpStatus, Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import { emsLeaveRequestCreateDto } from '../modules/emsLeaveRequest/emsLeaveRequest.dto';
import { EmsLeaveRequestService } from './emsLeaveRequest.service';

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
    @Put(':id')
    async update(@Param('id') id: string, @Body() emsLeaveRequestCreateDto: emsLeaveRequestCreateDto, @Req() req: Request,  @Res() res: Response) {
        const leaveRequestUpdate = await this.emsLeaveRequestService.find(id);
        Object.keys(emsLeaveRequestCreateDto).forEach(k => {
            leaveRequestUpdate[k] = emsLeaveRequestCreateDto[k];
        });
        leaveRequestUpdate.save();
        res.status(HttpStatus.OK).json({status: true, leaveRequestUpdate});
        // user.then(u => {
        //     u.save();
        // })
        //const emsDataUpdate = this.emsAddService.create(emsAddCreateDto); 
    }
    @Post('emsLeaveRequest')
    create(@Body() emsLeaveRequestCreateDto: emsLeaveRequestCreateDto,  @Req() req: Request,  @Res() res: Response) {
        console.log("::: userCreateDto :::", emsLeaveRequestCreateDto);
        const emsLeaveRequest = this.emsLeaveRequestService.create(emsLeaveRequestCreateDto);  
        return res.status(HttpStatus.OK).json({status: true, emsLeaveRequest});
    }
}
