import express from 'express';

import authRoute from './auth';
import staffRoute from './staff';
import adminRoute from './admin';
import verifyJwt from '@middleware/jwt';

const router = express.Router();

router.use('/auth', authRoute);

router.use(verifyJwt);
router.use('/staff', staffRoute);
router.use('/admin', adminRoute);

export default router;
