import { Sequelize } from 'sequelize';
import config from '../../config/config';


// export const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/C1XQT9p8w&inWUxymCi@qUDFu1Nym!SdH6Fn2MK4izlKZ98Vx4');
export const sequelize = new Sequelize('postgres://postgres:C1XQT9p8w&inWUxymCi@qUDFu1Nym!SdH6Fn2MK4izlKZ98Vx4@localhost:5432/postgres');

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

if (process.env.NODE_ENV !== 'test') {
  // sequelize.sync({ alter: true });
}

export default sequelize;
