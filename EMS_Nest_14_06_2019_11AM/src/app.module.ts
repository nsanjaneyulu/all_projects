import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmsAddController } from './ems-add/ems-add.controller';
import { EmsAddService } from './ems-add/ems-add.service';
import { emsAddProviders } from './modules/emsAdd/emsAdd.providers';

import { EmsLeaveRequestController } from './emsLeaveRequest/emsLeaveRequest.controller';
import { EmsLeaveRequestService } from './emsLeaveRequest/emsLeaveRequestService';
import { emsLeaveRequestProviders } from './modules/emsLeaveRequest/emsLeaveRequest.provider';

import { DatabaseModule } from './db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, EmsAddController, EmsLeaveRequestController],
  providers: [AppService, EmsAddService, EmsLeaveRequestService, ...emsAddProviders, ...emsLeaveRequestProviders],
})
export class AppModule {}
