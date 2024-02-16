import { Connection } from "mongoose";
import { emsAddScheme } from "../../db/schema/emsAddSchema";

export const emsAddProviders = [
    {
      provide: 'EMSADD_MODEL',
      useFactory: (connection: Connection) => connection.model('emsAdd', emsAddScheme),
      inject: ['DATABASE_CONNECTION'],
    },
  ];