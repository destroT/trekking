import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import exampleRoute from './routes/index'

/**
 * Init
 */
;
const app = express();
dotenv.config();

/**
 * App configuration
 */
app.use(express.json());
app.use(cors());
app.use(helmet());

/**
 * Middleware configuration
 */

/**
 * Routes configuration
 */
app.use('/', exampleRoute);


/**
 * Server Activation
 */
import { PORT } from './config/constants';
app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));