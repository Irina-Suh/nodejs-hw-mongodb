import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import contacts from './routers/contacts.js';

export function setupServer() {
    const app = express();

    app.use(cors());
    app.use(pino());
    app.use(express.json());

    app.get('/', (req, res) => {
        res.json({
          message: 'Hello World!',
        });
      });

    app.use('/contacts',  contacts);

    app.use((req, res) => {
        res.status(404).json({ message: 'Not found' });
    });


   const PORT = getEnvVar('PORT', '3000');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });


}
