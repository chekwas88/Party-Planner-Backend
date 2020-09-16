/* eslint-disable no-undef */
import {disconnect, app, createParty, login} from '@test/utils';
import {Party, User} from '@models';
import mongoose from 'mongoose';


const user = {
    firstName: "john",
    lastName: "Quest",
    email: "testParty@support.com",
    password: "password",
}
describe('test party/event', () => {
    let token,newToken, party, privateParty;
    beforeAll(async () => {
        const response = await login();
        token = response.body.token;
        privateParty = await createParty(true);
        party = await createParty(false);
        const res = await app().post('/api/v1/auth/register').send(user);
        newToken = res.body.token;
    });
   
    afterAll(async () => {
        await Party.deleteMany({});
        await User.deleteOne({email: user.email});
        await disconnect();
       
    });

    describe('get /api/v1/events/:1d', () => {
        it('should test for getting specific public party', async () => {
            
            const response = await app()
            .get(`/api/v1/events/${party._id}`)


            expect(response.body.status).toBe(200);
            expect(response.body.message).toBe('success');
        });

        it('should test for getting specific private party', async () => {
            const response = await app()
            .get(`/api/v1/events/${privateParty._id}`)
            .set('Authorization', `${token}`)
            expect(response.body.status).toBe(200);
            expect(response.body.message).toBe('success');
        });

        it('should test for getting a private party not owned', async () => {
            const response = await app()
            .get(`/api/v1/events/${privateParty._id}`)
            .set('Authorization', `${newToken}`)
            

            expect(response.body.status).toBe(401);
            expect(response.body.error).toBe('Unauthorized to view this resource');
        });
        it('should test for 404 error', async () => {
            const id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
            const response = await app()
            .get(`/api/v1/events/${id}`)
            expect(response.body.status).toBe(404);
            expect(response.body.error).toBe('not found');
        });

       
    })

    describe('get /api/v1/events', () => {
        it('should test for getting public parties', async () => {
            const response = await app()
            .get('/api/v1/events')
            expect(response.body.status).toBe(200);
            expect(response.body.message).toBe('success');
        });

        it('should test for getting parties(private and public)', async () => {
            
            const response = await app()
            .get(`/api/v1/events`)
            .set('Authorization', `${token}`)
            expect(response.body.status).toBe(200);
            expect(response.body.message).toBe('success');
        });

    });

    describe('put /api/v1/events/:1d', () => {
        it('should test for updating a party', async () => {
            const response = await app()
            .put(`/api/v1/events/${privateParty._id}`)
            .set('Authorization', `${token}`)
            .send({
                budget: 40000,
                theme: 'Rock n Roll'
            })
            expect(response.body.status).toBe(201);
            expect(response.body.message).toBe('Party updated successfully');
        });

        it('should test for updating a party not owned', async () => {
            const response = await app()
            .put(`/api/v1/events/${privateParty._id}`)
            .set('Authorization', `${newToken}`)
            .send({
                budget: 50000,
                theme: 'Hip Hop'
            });

            expect(response.body.status).toBe(401);
            expect(response.body.error).toBe('You are not authorize to update this resource');
        });

        it('should test for 404 error', async () => {
            const id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
            const response = await app()
            .put(`/api/v1/events/${id}`)
            .set('Authorization', `${token}`);

            expect(response.body.status).toBe(404);
            expect(response.body.error).toBe('not found');
        });
    });

    describe('delete /api/v1/events/:1d', () => {

        it('should test for deleting a party not owned', async () => {
            const response = await app()
            .delete(`/api/v1/events/${privateParty._id}`)
            .set('Authorization', `${newToken}`)

            expect(response.body.status).toBe(401);
            expect(response.body.error).toBe('You are not authorized to perform this action');
        });
        it('should test for 404 error', async () => {
            const id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
            const response = await app()
            .delete(`/api/v1/events/${id}`)
            .set('Authorization', `${token}`);

            expect(response.body.status).toBe(404);
            expect(response.body.error).toBe('not found');
        });
        it('should test for deleteing a party', async () => {
            const response = await app()
            .delete(`/api/v1/events/${privateParty._id}`)
            .set('Authorization', `${token}`)
            expect(response.body.status).toBe(200);
            expect(response.body.message).toBe('Party deleted Successfully');
        });

        

        
    })
  
});
