import express from 'express';
import cors from 'cors';
 import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import contacts from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export function setupServer() {
    const app = express();

    app.use(cors());
     app.use(pino());
    app.use(express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }));

    app.get('/', (req, res) => {
        res.json({
          message: 'Hello World!',
        });
      });

   app.use('/contacts',  contacts);


    app.use(notFoundHandler);

    app.use(errorHandler);

   const PORT = getEnvVar('PORT', '3000');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });


}
