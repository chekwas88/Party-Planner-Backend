/* eslint-disable no-undef */
import dotenv from 'dotenv';
import {Authorize} from '@middleware';
import {Response, Request} from '@test/factory';

dotenv.config();


describe('test for middleware authorizations', () => {
    let generalToken;
    beforeAll(() => {
        generalToken = Authorize.generateToken({id: "abc"})
    });

    it('should test for token generation', () => {
       const token = Authorize.generateToken({id: "abc"});
       expect(token).toBeDefined()
    });
    it('should be able to decode token', () => {
        const {id} = Authorize.decodeToken(generalToken);
        expect(id).toEqual("abc");
    })

    describe('Token verification', () => {
        
        it('should be able to verify token', () => {
            const headers = {
                authorization: generalToken
            }
            const req = new Request(headers);
            
            const res = {}
            const next = jest.fn();
            Authorize.verifyToken(req, res, next);
            expect(req.user.id).toBe('abc');
            expect(next).toHaveBeenCalled()
        });
        it('should return 403 error when there is no token', () => {
            const headers = {
            }
            const req = new Request(headers);
            const res = new Response()
            const next = jest.fn();
            const status = jest.spyOn(res, 'status');
            const json = jest.spyOn(res, 'json')
            Authorize.verifyToken(req, res, next);
            expect(next).toHaveBeenCalledTimes(0)
            expect(status).toHaveBeenCalledWith(403)
            expect(json).toHaveBeenCalledWith(JSON.parse(JSON.stringify({status: 403, error: 'No authorization is provided'})))
            
        });
        it('should return 401 error when invalid token is provided', () => {
            const headers = {
                authorization: "The man Who can't be move"
            }
            const res = new Response()
            const req = new Request(headers);
            const next = jest.fn();
            const status = jest.spyOn(res, 'status');
            const json = jest.spyOn(res, 'json')
            Authorize.verifyToken(req, res, next);
            expect(next).toHaveBeenCalledTimes(0)
            expect(status).toHaveBeenCalledWith(401)
            expect(json).toHaveBeenCalledWith(JSON.parse(JSON.stringify({status: 403, error: 'token not verified'})))
            
        })
    })

    describe('acknowledge token', () => {
        
        it('should be able to acknowledge and return valid user token', () => {
           
            const headers = {
                authorization: generalToken
            }
            
            const res = {}
            const req = new Request(headers);
            const next = jest.fn();
            Authorize.acknowledgeToken(req, res, next);
            expect(req.user.id).toBe('abc');
            expect(next).toHaveBeenCalled()
        });
        it('should call the next function when there is no authorization provided', () => {
            const headers = {
            }
            
            const res = {}
            const req = new Request(headers);
            const next = jest.fn();
            Authorize.acknowledgeToken(req, res, next);
            expect(next).toHaveBeenCalled()
            
        });
        it('should call the next function when there is an ivalid token', () => {
            const headers = {
                authorization: "in the shallow"
            }
            
            const res = {}
            const req = new Request(headers);
            const next = jest.fn();
            Authorize.acknowledgeToken(req, res, next);
            expect(next).toHaveBeenCalled()
            
        })
    })
    
})
