const mongoose = require('mongoose');
const app = require('./app');
const server = require('http').createServer(app);
require('dotenv').config()
mongoose.Promise = global.Promise;

const port = process.env.port || 1996;
console.log(process.env.mongodbUri)
const {connection: db} = mongoose;
mongoose.connect(process.env.mongodbUri, {
    useCreateIndex: true,
    useNewUrlParser: true
});


db.once('open', () => console.log('Connected to mongodb'));
db.once('disconnected', () => console.log('Disconnected from mongodb'));
db.on('error', err => console.log(`Error connecting to mongodb `, err));

server.listen(port, () => {
    console.log('Listening on port', port);
});


