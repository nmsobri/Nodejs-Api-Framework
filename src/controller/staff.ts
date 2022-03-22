import 'reflect-metadata';
import { autoInjectable, container } from 'tsyringe';
import { Request, Response } from 'express';
import StaffService from '@service/staff';

@autoInjectable()
class StaffController {
    private staffService: StaffService;

    constructor(staffService: StaffService) {
        this.staffService = staffService;
    }

    getAllStaff(req: Request, res: Response) {
        this.staffService.getAllStaff(req, res);
    }

    postStaff(req: Request, res: Response) {
        this.staffService.postStaff(req, res);
    }

    putStaff(req: Request, res: Response) {
        this.staffService.putStaff(req, res);
    }

    deleteStaff(req: Request, res: Response) {
        this.staffService.deleteStaff(req, res);
    }

    getStaff(req: Request, res: Response) {
        this.staffService.getStaff(req, res);
    }
}

export default container.resolve(StaffController);
