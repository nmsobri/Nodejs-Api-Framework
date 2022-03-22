import express from 'express';
import AuthController from '@controller/auth';

const router = express.Router();
router.post('/login', AuthController.postLogin.bind(AuthController));
router.post('/register', AuthController.postRegister.bind(AuthController));
router.get('/refresh', AuthController.getRefresh.bind(AuthController));
router.get('/logout', AuthController.getLogout.bind(AuthController));

export default router;
