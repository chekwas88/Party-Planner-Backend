/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '@routes';
import mongoose from 'mongoose';


dotenv.config();
let databaseURI;
if (process.env.NODE_ENV === 'production') {
  databaseURI = process.env.PRODB;
} else if (process.env.NODE_ENV === 'test') {
  databaseURI = process.env.TESTDB;
}else {
    databaseURI = process.env.DEVDB;
}

mongoose.Promise = global.Promise;
mongoose.connect(databaseURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});



export const PORT = process.env.PORT;

export default app;
