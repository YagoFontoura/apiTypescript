import mongoose from 'mongoose';
const env = require('./env.json')


mongoose.connect(env.URL_DATABASE,{useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

export = mongoose;