import 'reflect-metadata';
import { autoInjectable, container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthService from '@service/auth';

@autoInjectable()
class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async postLogin(req: Request, res: Response) {
        this.authService.postLogin(req, res);
    }

    async postRegister(req: Request, res: Response) {
        this.authService.postRegister(req, res);
    }

    async getRefresh(req: Request, res: Response) {
        this.authService.getRefresh(req, res);
    }

    async getLogout(req: Request, res: Response) {
        this.authService.getLogout(req, res);
    }
}

export default container.resolve(AuthController);
