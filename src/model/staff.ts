import Model from './model';

interface Staff {
    id?: number;
    firstName?: string;
    lastName?: string;
    created_at?: string;
    updated_at?: string;
}

class StaffModel extends Model {
    async getAllStaff(): Promise<Staff[]> {
        const result = await this.db.query(`SELECT * FROM staff`);
        return result;
    }

    async createStaff(firstName: string, lastName: string): Promise<void> {
        await this.db.query(
            `INSERT INTO staff ( first_name, last_name ) VALUES (?, ?)`,
            firstName,
            lastName
        );
    }

    async findStaff(id: number): Promise<Staff> {
        const result = await this.db.query(
            `SELECT * FROM staff WHERE id=?`,
            id
        );

        return result?.[0];
    }

    async updateStaff(
        id: number,
        firstName: string,
        lastName: string
    ): Promise<void> {
        await this.db.query(
            `UPDATE staff set first_name=?, last_name=? WHERE id =?`,
            firstName,
            lastName,
            id
        );
    }

    async deleteStaff(id: number): Promise<void> {
        await this.db.query(`DELETE FROM staff WHERE id=?`, id);
    }
}

export default StaffModel;
