import express from 'express';
import auth from './auth'
import party from './party'
const router = express.Router();

router.use('/api/v1/', auth);
router.use('/api/v1/', party);

export default router;