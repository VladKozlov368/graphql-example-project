import { BuildOptions, DataTypes, Model } from 'sequelize';
const { STRING, INTEGER } = DataTypes;

import sequelize from '../db';

export class Admin extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Admin.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    modelName: 'admin',
    timestamps: true,
    paranoid: false,
  },
);

export type AdminModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Admin;
}

export default Admin as AdminModelStatic;

// Admin.sync({ force: true }).then(() => console.log("Node table created"));
