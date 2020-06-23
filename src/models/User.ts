import {BuildOptions, DataTypes, Model} from 'sequelize';
import sequelize from '../db';
import {Admin} from "./Admin";

const {STRING, INTEGER} = DataTypes;

export class User extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: STRING,
            allowNull: false,
        },
        lastName: {
            type: STRING,
            allowNull: false,
        },
        email: {
            type: STRING,
            allowNull: false,
        },
        password: {
            type: STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'user',
        timestamps: true,
        paranoid: false,
    },
);

export type UserModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): User;
}

export default User as UserModelStatic;

// User.sync({ force: true }).then(() => console.log("Node table created"));
