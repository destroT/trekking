import app from  './app'
import './database'

/**
 * Server Activation
 */
import { PORT } from './config/constants';
app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));