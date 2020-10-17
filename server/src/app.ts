import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from './routes/auth.routes';


/**
 * Init
 */
;
const app = express();
dotenv.config();

/**
 * App configuration
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());

/**
 * Middleware configuration
 */

/**
 * Routes configuration
 */
app.use('/api/auth', authRoutes);

export default app;