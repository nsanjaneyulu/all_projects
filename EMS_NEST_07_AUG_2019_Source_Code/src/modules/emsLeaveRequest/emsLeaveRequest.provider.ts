import { Connection } from "mongoose";
import { emsLeaveRequestScheme } from "../../db/schema/leaveRequestScheme";

export const emsLeaveRequestProviders = [
    {
      provide: 'EMSLEAVEREQUEST_MODEL',
      useFactory: (connection: Connection) => connection.model('emsLeaveRequest', emsLeaveRequestScheme),
      inject: ['DATABASE_CONNECTION'],
    },
  ];