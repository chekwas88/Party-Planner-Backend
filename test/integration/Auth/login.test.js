/* eslint-disable no-undef */

import {disconnect, app} from '@test/utils';

describe('test for user login', () => {
   
    afterAll(async () => {
        await disconnect()
    });
    

    it('should test for unsuccesfull login when there is an invalid input', async () => {
        const response = await app().post('/api/v1/auth/login').send({
            email: "planner@support.com",
            password: "pass",
        });
        expect(response.body.status).toBe(422)
        expect(response.body.token).toBeUndefined();
        expect(response.body.error).toBeDefined();
    });
    it('should test for unsuccesfull login when an input is empty', async () => {
        const response = await app().post('/api/v1/auth/login').send({
            
            email: "planner@support.com",
            password: "",
        });
        expect(response.body.status).toBe(422)
        expect(response.body.token).toBeUndefined();
        expect(response.body.error).toBeDefined();
    });
    

    it('should test for unsuccesfull login when unregistered user tries to login', async () => {
        const response = await app().post('/api/v1/auth/login').send({
            
            email: "plannerunregistered@support.com",
            password: "password123",
        });
        expect(response.body.status).toBe(401)
        expect(response.body.token).toBeUndefined();
        expect(response.body.error).toBe("invalid email/password");
    });

    it('should test for unsuccesfull login when wrong password is used ', async () => {
        const response = await app().post('/api/v1/auth/login').send({
            
            email: "test@support.com",
            password: "password123",
        });
        expect(response.body.status).toBe(401)
        expect(response.body.token).toBeUndefined();
        expect(response.body.error).toBe("invalid email/password");
    })
    it('should test for succesfull login', async () => {
        const response = await app().post('/api/v1/auth/login').send({
            email: "test@support.com",
            password: "password",
        });
        expect(response.body.status).toBe(200)
        expect(response.body.token).toBeDefined();
        expect(response.body.message).toBe('login was successful')
    })
})
