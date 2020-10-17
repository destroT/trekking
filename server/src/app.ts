import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
// Import Routes
import authRoutes from './routes/auth.routes';
import { SECRET, __PROD__ } from './config/constants'


/**
 * Init
 */
const app = express();
dotenv.config();

/**
 * App configuration
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

/**
 * Middleware configuration
 */
try {
    app.use(session({
        name: "qid",
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: __PROD__,
            maxAge: 1000 * 60 * 60 * 24 * 365 * 7 // 7 years
        }
    }));
} catch (e) {
    console.log('Error creating the session', e);
}

/**
 * Routes configuration
 */
app.use('/api/auth', authRoutes);

export default app;