/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import mongoose from 'mongoose';


dotenv.config();
// const isProduction = process.env.NODE_ENV === 'production';
const databaseURI = `mongodb://${process.env.devUser}:${process.env.devPassword}@ds039768.mlab.com:39768/party-planner`;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('devuser',process.env.devPassword)



app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3300, () => {
    mongoose.connect(databaseURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    mongoose.connection.once('open', () => {
        console.log('connected to database');
    });
    console.log(`Listening on port ${server.address().port}`);
});

export default app;
