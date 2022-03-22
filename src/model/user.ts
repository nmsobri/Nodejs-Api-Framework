import Model from './model';

interface User {
    id?: number;
    username?: string;
    password?: string;
    created_at?: string;
    updated_at?: string;
}

class UserModel extends Model {
    async findUser(username: string): Promise<User> {
        const result = await this.db.query<User>(
            `SELECT * FROM user WHERE username=?`,
            username
        );

        return result?.[0];
    }

    async updateUserRefreshToken(
        id: number,
        refreshToken: string
    ): Promise<void> {
        await this.db.query<void>(
            `UPDATE user SET refresh_token=? WHERE id=?`,
            refreshToken,
            id
        );
    }

    async createUser(username: string, password: string): Promise<void> {
        await this.db.query(
            `INSERT INTO user ( username, password ) VALUES (?, ?)`,
            username,
            password
        );
    }

    async findRefreshToken(refreshToken: string): Promise<User> {
        const result = await this.db.query(
            `SELECT * FROM user WHERE refresh_token = ?`,
            refreshToken
        );

        return result?.[0];
    }
}

export default UserModel;
