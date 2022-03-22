import { autoInjectable } from 'tsyringe';
import { Request, Response } from 'express';
import StaffModel from '@model/staff';

@autoInjectable()
class StaffService {
    private staffModel: StaffModel;

    constructor(staffModel: StaffModel) {
        this.staffModel = staffModel!;
    }

    async getAllStaff(req: Request, res: Response) {
        const allStaff = await this.staffModel.getAllStaff();
        res.json(allStaff);
    }

    async postStaff(req: Request, res: Response) {
        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            res.status(400).json({ message: 'Missing firstName or lastName' });
            return;
        }

        await this.staffModel.createStaff(firstName, lastName);
        res.status(201).json({ message: 'Successfully create user' });
    }

    async putStaff(req: Request, res: Response) {
        const _id = req.params.id;

        if (!_id) {
            res.status(400).json({ message: 'Missing params id' });
            return;
        }

        const id = parseInt(_id);

        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            res.status(400).json({ message: 'Missing firstName or lastName' });
            return;
        }

        const foundStaff = await this.staffModel.findStaff(id);

        if (!foundStaff) {
            res.status(400).json({ message: 'No such staff with that id' });
            return;
        }

        await this.staffModel.updateStaff(id, firstName, lastName);
        res.status(200).json({ message: 'Successfully update staff' });
    }

    async deleteStaff(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (!id) {
            res.status(400).json({ message: 'Missing params id' });
            return;
        }

        await this.staffModel.deleteStaff(id);
        res.status(200).json({ message: 'Successfully delete staff' });
    }

    async getStaff(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (!id) {
            res.status(400).json({ message: 'Missing params id' });
            return;
        }

        const foundUser = await this.staffModel.findStaff(id);

        if (!foundUser) {
            res.status(400).json({ message: 'No such user with that id' });
            return;
        }

        res.status(200).json(foundUser);
    }
}

export default StaffService;
