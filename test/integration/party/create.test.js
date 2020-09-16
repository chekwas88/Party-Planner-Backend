/* eslint-disable no-undef */
import {disconnect, app, login} from '@test/utils';
import {Party} from '@models';

describe('test party/event creation', () => {
    let token;
    let party_id;
    beforeEach(async () => {
        const response =  await login();
        token = response.body.token;

    });
    
    afterAll(async () => {
        await Party.deleteOne({_id: party_id});
        await disconnect();
    });

    it('should test for unsuccessful party creation when no Authorization is provided', async () => {
        const response = await app()
        .post('/api/v1/events')
        .send({
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
            date: "12/20/2022"
        })
        expect(response.body.status).toBe(403);
        expect(response.body.error).toBe('No authorization is provided');
    });

    it('should test for unsuccessful party creation when invalid Authorization is provided', async () => {
        const response = await app()
        .post('/api/v1/events')
        .set('Authorization', 'invalid token')
        .send({
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
            date: "12/20/2022"
        });
        party_id = response.body.id
        expect(response.body.status).toBe(401);
        expect(response.body.error).toBe('token not verified');
    });
    
    it('should test for successful party creation', async () => {
         const response = await app()
        .post('/api/v1/events')
        .set('Authorization', `${token}`)
        .send({
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
            date: "12/20/2022"
        });
        expect(response.body.status).toBe(201);
        expect(response.body.message).toBe('Party created successfully');
    })
});
