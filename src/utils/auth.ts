import { Auth, JwtAdmin } from '../types';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const SALT_ROUND = 10;


/**
 * Email validator
 *
 * @return boolean
 */
export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const verifyToken = (token: string): JwtAdmin => {
  return jwt.verify(token, process.env.JWT_SECRET) as JwtAdmin;
};


/**
 * Encrypt password
 *
 * @return hashed password
 */
export const encryptCredential = async (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const SALT = bcrypt.genSaltSync(SALT_ROUND);

    bcrypt.hash(password, SALT, null, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });


/**
 * Compare password and hashed password value
 *
 * @return boolean
 */
export const validateCredential = async (
  value: string,
  hashedValue: string,
): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
  bcrypt.compare(value, hashedValue, (err, res) => {
    if (err) {
      return reject(err);
    }
    resolve(res);
  });
});


/**
 * Create pair of accessToken and refreshToken
 *
 * @return { accessToken, refreshToken }
 */
export const createTokensPair = async (
  sub: string,
  role: number,
): Promise<Auth> => {

    console.log(process.env.NODE_ENV);
    console.log(process.env.APPLICATION_NAME);
    console.log(process.env.JWT_SECRET);
    console.log(process.env.JWT_ACCESS_TOKEN_LIFE);
    console.log(process.env.JWT_REFRESH_TOKEN_LIFE);

    const applicationName = "myLifeOS";
    const jwtSecret = "r@N0&Vj5dy#lOc*Na@yT3zalccIiJb";
    const accessTokenLife = "30m";
    const refreshTokenLife = "30d";

  const accessToken = jwt.sign(
    {
      iss: applicationName,
      sub,
      role,
      action: 'access-token',
    },
    jwtSecret,
    {
      expiresIn: +1000,
    },
  );

  const refreshToken = jwt.sign(
    {
      iss: applicationName,
      sub,
      role,
      action: 'refresh-token',
    },
      jwtSecret,
    {
      expiresIn: +(1000 * 60),
    },
  );

  return {
    accessToken,
    refreshToken,
  };
}


