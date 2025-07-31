// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/Allroute.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';


import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());



app.use('/api', router);
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'swagger', 'swagger.json'), 'utf-8')
);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
