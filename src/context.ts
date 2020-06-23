import {PubSub} from 'graphql-subscriptions';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import {JwtAdmin} from './types';
import {Request} from 'apollo-server';
import {Admin} from './models/Admin';
import models, {ModelType} from './models';
import {SevenBoom as Boom} from 'graphql-apollo-errors';

const { JWT_SECRET } = process.env;

export interface MyContext {
  verifyRefreshToken: () => Promise<Admin>;
  requireAdmin: () => Promise<Admin>;
  verifyAdmin: () => JwtAdmin;
  models: ModelType;
  pubsub: PubSub;
  appSecret: string;
  user: User;
}

export interface ExpressContext {
  req: Request;
  res: Response;
  connection?: any;
}

const pubsub = new PubSub();

// eslint-disable-next-line
export const getToken = (req: Express.Request & any): string => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};


/**
 * Verify JWT token
 *
 * @return JwtAdmin
 */
export const verifyJWT = (token: string): JwtAdmin => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtAdmin;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw Boom.forbidden(
        `Token expired ${moment(error.expiredAt)
          .format('D MMMM YYYY, HH:mm:ss')}`,
      );
    } else {
      throw Boom.unauthorized('Authorization token is not valid');
    }
  }
};


/**
 * Verify Admin by token
 *
 * @return JwtAdmin
 */
export const verifyAdmin = (token: string): JwtAdmin => {
  return jwt.verify(token, JWT_SECRET) as JwtAdmin;
};

class User {
  verifyRefreshToken() {

  }
}

const user = new User();

/**
 * Create GraphQL context
 *
 * @return context: MyContext
 */
export function createContext(ctx: ExpressContext): MyContext {
  const request = ctx.req;

  return {

    user: user,

    /**
     * Checks the token and the type of token must be refresh
     *
     * @return Admin
     */
    verifyRefreshToken: (): Promise<Admin> => {
      const { Admin: adminModel } = models;
      const token = getToken(request);

      if (!token) {
        throw Boom.unauthorized('Authorization required in the request header');
      }

      try {
        const admin: JwtAdmin = verifyJWT(token);
        const { sub, action } = admin;

        if (action !== 'refresh-token') {
          throw Boom.unauthorized('refreshToken is required in the request header');
        }

        return adminModel.findOne({
          where: {
            id: sub,
          },
          raw: true,
        });
      } catch (err) {
        // Return always 401 error for refresh token
        if (err.output?.payload?.message.startsWith('Token expired')) {
          throw Boom.unauthorized(err.output.payload.message);
        } else {
          throw Boom.unauthorized('Refresh token is not valid');
        }
      }
    },

    /**
     * Get admin via access token
     *
     * @return Admin
     */
    requireAdmin: (): Promise<Admin> => {
      const { Admin: adminModel } = models;
      const token = getToken(request);

      if (!token) {
        throw Boom.unauthorized('Authorization required in the request header');
      }

      const admin: JwtAdmin = verifyJWT(token);
      const { sub, action } = admin;

      if (action !== 'access-token') {
        throw Boom.unauthorized('accessToken is required in the request header');
      }

      return adminModel.findOne({
        where: {
          id: sub,
        },
        raw: true,
      });
    },

    verifyAdmin: (): JwtAdmin => {
      const token = getToken(request);
      if (!token) {
        return null;
      }

      return jwt.verify(token, JWT_SECRET) as JwtAdmin;
    },

    models,
    pubsub,
    appSecret: JWT_SECRET,
  };
}
