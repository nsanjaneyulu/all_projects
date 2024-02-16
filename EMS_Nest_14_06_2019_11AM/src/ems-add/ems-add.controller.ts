import { Controller, Get, Post, Req, Res, Body, Put, Param, HttpStatus, Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import { emsAddCreateDto } from '../modules/emsAdd/emsAdd.dto';
import { EmsAddService } from './ems-add.service';

@Controller('ems')
export class EmsAddController {
    constructor(
        private emsAddService: EmsAddService
    ) {

    }

    @Get('emsList')
    findAll(): any {
        return this.emsAddService.findAll();
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() emsAddCreateDto: emsAddCreateDto, @Req() req: Request,  @Res() res: Response) {
        const user = await this.emsAddService.find(id);
        Object.keys(emsAddCreateDto).forEach(k => {
            user[k] = emsAddCreateDto[k];
        });
        user.save();
        res.status(HttpStatus.OK).json({status: true, user});
        // user.then(u => {
        //     u.save();
        // })
        //const emsDataUpdate = this.emsAddService.create(emsAddCreateDto); 
    }
    @Post('emsAdd')
    create(@Body() emsAddCreateDto: emsAddCreateDto,  @Req() req: Request,  @Res() res: Response) {
        console.log("::: userCreateDto :::", emsAddCreateDto);
        const emsAdd = this.emsAddService.create(emsAddCreateDto);  
        return res.status(HttpStatus.OK).json({status: true, emsAdd});
    }
}
