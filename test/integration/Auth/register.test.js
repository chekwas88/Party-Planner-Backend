/* eslint-disable no-undef */


import {disconnect, app} from '@test/utils';
import {User} from '@models';

const user = {
    firstName: "john",
    lastName: "Quest",
    email: "eparty@support.com",
    password: "password",
}
describe('test for user registration', () => {
   
    afterAll(async () => {
        await User.deleteOne({email: user.email});
        await disconnect()
    })
    it('should test for succesfull registration', async() => {
        const response = await app().post('/api/v1/auth/register').send(user);
        expect(response.body.status).toBe(201);
        expect(response.body.message).toBe('signup was successful');

        expect(response.body.token).toBeDefined();
    })

    it('should test for unsuccesfull registration when there is an invalid input', async() => {
        const response = await app().post('/api/v1/auth/register').send({
            firstName: "john",
            lastName: "Quest",
            email: "eparty@support.com",
            password: "pass",
        });
        expect(response.body.status).toBe(422)
        expect(response.body.token).toBeUndefined();
        expect(response.body.error).toBeDefined();
    });
    it('should test for unsuccesfull registration when an input is empty', async() => {
        const response = await app().post('/api/v1/auth/register').send({
            firstName: "john",
            lastName: "Quest",
            email: "eparty@support.com",
            password: "",
        });

        expect(response.body.status).toBe(422)
        expect(response.body.token).toBeUndefined();
        expect(response.body.error).toBeDefined();
    });

    it('should test for unsuccesfull registration when email(unique key) already exits', async() => {
        
        const response = await app().post('/api/v1/auth/register').send(user);

        expect(response.body.status).toBe(401)
        expect(response.body.token).toBeUndefined();
        expect(response.body.error).toBe('This user already exists');
    })
})
