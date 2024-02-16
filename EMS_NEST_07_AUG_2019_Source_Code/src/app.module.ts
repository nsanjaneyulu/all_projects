import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmsAddController } from './ems-add/ems-add.controller';
import { EmsAddService } from './ems-add/ems-add.service';
import { emsAddProviders } from './modules/emsAdd/emsAdd.providers';

import { EmsLeaveRequestController } from './emsLeaveRequest/emsLeaveRequest.controller';
import { EmsLeaveRequestService } from './emsLeaveRequest/emsLeaveRequest.service';
import { emsLeaveRequestProviders } from './modules/emsLeaveRequest/emsLeaveRequest.provider';
import { EmsAttendanceController } from './emsAttendance/emsAttendance.controller';
import { EmsAttendancetService } from './emsAttendance/emsAttendance.service';
import { emsAttendanceProviders } from './modules/emsAttendance/emsAttendance.providers';

import { DatabaseModule } from './db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, EmsAddController, EmsLeaveRequestController, EmsAttendanceController],
  providers: [AppService, EmsAddService, EmsLeaveRequestService, EmsAttendancetService, ...emsAddProviders, ...emsLeaveRequestProviders, ...emsAttendanceProviders],
})
export class AppModule {}
