/* eslint-disable no-undef */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import server from '@app';
import supertest from 'supertest';
import {Party} from '@models';


dotenv.config();

mongoose.Promise = global.Promise;
export const connect = async () => await mongoose.connect(process.env.TESTDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });

export const disconnect = async () => await mongoose.connection.close();
export const app = () => supertest(server);

export const createParty = async (isPrivate) => await Party.create({
  name: 'Dance hall party',
    description: 'Invited to dance hall party where you can dance your heart out',
    venue: 'Shan Sung lair',
    theme: 'Disco',
    time: "20:00 pm",
    budget: 25000,
    expense: [
        {description: "Refreshments for atttendees", name: 'Refreshments', amount: 5000},
        {description:'Prize money for winner of the dance competition', name: 'prize', amount: 10000},
    ],
    date: "12/20/2022",
    private: isPrivate,
    owner: "5f60d2b83000b3484c5a0804", 
    created_at: Date.now(), 
    update_at: Date.now()
})

export const login = async () => await app().post('/api/v1/auth/login').send({
  email: "test@support.com",
  password: "password",
})
