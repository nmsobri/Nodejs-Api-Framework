import express from 'express';
import AdminController from '@controller/admin';

const router = express.Router();
router.get('/', AdminController.getIndex.bind(AdminController));

export default router;
