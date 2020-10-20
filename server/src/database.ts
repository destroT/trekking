import mongoose, { ConnectionOptions } from 'mongoose'

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

mongoose.connect(<string>process.env.MONGODB_URI, dbOptions);
const connection = mongoose.connection;

connection.once('open', () => console.log('Mongodb connection established'));

connection.on('error', err => {
    console.log('Mongodb connection error: ', err);
    process.exit();
});
