import express from 'express';
import {signUpValidator, loginValidator} from '@middleware';
import UserAuth from '@controller/auth';

const router = express.Router();

router.post('/auth/register', signUpValidator, UserAuth.register);
router.post('/auth/login', loginValidator, UserAuth.login);

export default router;