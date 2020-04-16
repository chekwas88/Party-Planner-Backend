import express from 'express';
import {partyValidator, Authorize} from '../../middleware';
import Party from '../../controller/party';

const router = express.Router();

router.post('/create', Authorize.verifyToken,partyValidator, Party.createParty);
// router.post('/auth/login', loginValidator, UserAuth.login);

export default router;