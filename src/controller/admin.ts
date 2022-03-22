import 'reflect-metadata';
import { autoInjectable, container } from 'tsyringe';
import { Request, Response } from 'express';
import AdminService from '@service/admin';

@autoInjectable()
class AdminController {
    private adminService: AdminService;

    constructor(adminService: AdminService) {
        this.adminService = adminService;
    }

    getIndex(req: Request, res: Response) {
        this.adminService.getIndex(req, res);
    }
}

export default container.resolve(AdminController);
