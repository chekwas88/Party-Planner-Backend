import express from 'express';
import auth from './auth'
import party from './party'
const router = express.Router();

router.use('/', auth);
router.use('/', party);

export default router;