import express from 'express';
import {partyValidator, Authorize} from '../../middleware';
import Party from '../../controller/party';


const router = express.Router();

router.post('/create', Authorize.verifyToken,partyValidator, Party.createParty);
router.get('/events', Authorize.acknowledgeToken, Party.getParties);
router.get('/events/:id', Authorize.acknowledgeToken, Party.getParty);


export default router;