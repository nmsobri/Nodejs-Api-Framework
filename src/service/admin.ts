import { autoInjectable } from 'tsyringe';
import { Request, Response } from 'express';

@autoInjectable()
class AdminService {
    getIndex(req: Request, res: Response) {
        res.json({ message: 'This is admin page' });
    }
}

export default AdminService;
