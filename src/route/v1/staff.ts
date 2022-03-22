import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import StaffController from '@controller/staff';

const router = express.Router();
router.get('/', StaffController.getAllStaff.bind(StaffController));
router.post('/', StaffController.postStaff.bind(StaffController));
router.put('/:id', StaffController.putStaff.bind(StaffController));
router.delete('/:id', StaffController.deleteStaff.bind(StaffController));
router.get('/:id', StaffController.getStaff.bind(StaffController));

export default router;
