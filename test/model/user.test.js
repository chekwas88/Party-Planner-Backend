/* eslint-disable no-undef */

import User from '@models/User';
import {Authorize} from '@/middleware';
import {connect, disconnect} from '@test/utils'


const user = {
    firstName: "john",
    lastName: "Quest",
    email: "epartyplanner@support.com",
    password: "password",
}
let newUser;
describe('Test User model', () => {
    beforeAll(async () => {
        await connect();
        newUser = await User.create(user);
    });

    afterAll(async () => {
        await User.deleteOne({email: user.email})
        await disconnect();

    })

    describe('Test User pre-hooks ', () => {
        it('should test if user password is encrypted ', async () => {
            expect(newUser.comparePassword(user.password, newUser.password)).toBe(true);
        })
    })

    describe('Test User instance methods', () => {
        it('should test if generated token is valid', async() => {
            const token = newUser.generateToken();
            const {id} = Authorize.decodeToken(token);
            expect(id).toEqual(JSON.parse(JSON.stringify(newUser._id)));
        });
    })
    
    
})


