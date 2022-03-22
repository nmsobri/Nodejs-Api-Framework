import bcrypt from 'bcrypt';
import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '@model/user';
import { autoInjectable } from 'tsyringe';
import { Request, Response } from 'express';

dotEnv.config();

type Person = {
    username: string;
    password: string;
    refreshToken?: string;
};

@autoInjectable()
class AuthService {
    private userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async postLogin(req: Request, res: Response) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Missing username or password' });
            return;
        }

        const foundUser = await this.userModel.findUser(username);

        if (!foundUser) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const isValidPass = await bcrypt.compare(password, foundUser.password!);

        if (!isValidPass) {
            res.status(401).json({ message: 'Failed login' });
            return;
        }

        // create jwt access token
        const accessToken = jwt.sign(
            { username: foundUser.username, id: foundUser.id },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '10 minutes' } // 10 minute
        );

        // create jwt refresh token
        const refreshToken = jwt.sign(
            { username: foundUser.username, id: foundUser.id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: '7 days' } // 7day
        );

        await this.userModel.updateUserRefreshToken(
            foundUser.id!,
            refreshToken
        );

        res.cookie('jwt', refreshToken, {
            httpOnly: true, // make this cookie not available to client js
            maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
            sameSite: 'none',
        });

        res.status(200).json({ access_token: accessToken });
    }

    async postRegister(req: Request, res: Response) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({
                message: 'Missing username or password in the body request',
            });
        }

        const existingUser = await this.userModel.findUser(username);

        if (existingUser) {
            res.status(409).json({
                message: 'User with such username already exist',
            });

            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userModel.createUser(username, hashedPassword);

        res.status(201).json({ message: 'Successfully created new user' });
    }

    async getRefresh(req: Request, res: Response) {
        const cookies = req.cookies;
        const refreshToken = cookies['jwt'];

        if (!refreshToken) {
            res.sendStatus(401);
            return;
        }

        const foundUser = await this.userModel.findRefreshToken(refreshToken);

        if (!foundUser) {
            res.sendStatus(403);
            return;
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
            (err: any, decoded: any) => {
                if (err) {
                    res.sendStatus(403);
                    return;
                }

                // create jwt access token
                const accessToken = jwt.sign(
                    { username: decoded.username, id: foundUser.id },
                    process.env.ACCESS_TOKEN_SECRET!,
                    { expiresIn: '10 minutes' } // 10 minutes
                );

                res.status(200).json({ access_token: accessToken });
                return;
            }
        );
    }

    async getLogout(req: Request, res: Response) {
        // On client side, need to delete access token or else
        // user still have valid session as long as the access token is valid
        const cookies = req.cookies;
        const refreshToken = cookies['jwt'];

        if (!refreshToken) {
            res.sendStatus(204);
            return;
        }

        const foundUser = await this.userModel.findRefreshToken(refreshToken);

        if (!foundUser) {
            res.sendStatus(204);
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
            (err: any, decoded: any) => {
                if (err) {
                    res.sendStatus(403);
                    return;
                }

                // update user refresh token
                console.log('userid:', decoded.id);
                this.userModel.updateUserRefreshToken(decoded.id, '');
            }
        );

        res.clearCookie('jwt');
        res.sendStatus(204);
    }
}

export default AuthService;
