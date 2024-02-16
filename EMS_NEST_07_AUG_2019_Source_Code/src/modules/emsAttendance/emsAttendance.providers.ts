import { Connection } from "mongoose";
import { emsAttendanceScheme } from "../../db/schema/emsAttendanceSchema";

export const emsAttendanceProviders = [
    {
      provide: 'EMSLATTENDENCE_MODEL',
      useFactory: (connection: Connection) => connection.model('emsAttendance', emsAttendanceScheme),
      inject: ['DATABASE_CONNECTION'],
    },
  ];