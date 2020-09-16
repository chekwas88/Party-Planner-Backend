import express from 'express';
import {partyValidator, Authorize} from '../../middleware';
import Party from '@controller/party';


const router = express.Router();

router.post('/events', Authorize.verifyToken,partyValidator, Party.createParty);
router.get('/events', Authorize.acknowledgeToken, Party.getParties);
router.get('/events/:id', Authorize.acknowledgeToken, Party.getParty);
router.delete('/events/:id', Authorize.acknowledgeToken, Party.deleteParty);
router.put('/events/:id', Authorize.acknowledgeToken, Party.updateParty);



export default router;