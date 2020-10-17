import mongoose, { ConnectionOptions } from 'mongoose'
import { MONGODB_URI } from './config/constants';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect(MONGODB_URI, dbOptions);
const connection = mongoose.connection;

connection.once('open', () => console.log('Mongodb connection established'));

connection.on('error', err => {
    console.log('Mongodb connection error: ', err);
    process.exit();
})