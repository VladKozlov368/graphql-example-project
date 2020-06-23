/*----------------------------------------------------------------------------------------------------
                              Middleware for errors handling
----------------------------------------------------------------------------------------------------*/

import {
  formatErrorGenerator,
  SevenBoom as Boom
} from 'graphql-apollo-errors';

/*--------------------------------------------------------------------------------------------------*/

Boom.init([
  {
    name: 'errorCode',
    order: 1,
    default: null,
  },
]);


/**
 * SevenBoom Error Output Settings
 */
export const errorHandler = formatErrorGenerator({
  showLocations: false,
  showPath: false,
  hideSensitiveData: true,
});


/**
 * Error response formatting function from server
 */
export const formatError = err => {
  // Seven Boom errors
  if (err.extensions.exception.isBoom) {
    return errorHandler(err);
  } else {
    const message = err.message?.replace(/\"/g, '') || '';
    // Sequelize validation error
    if (err.extensions?.exception?.name === 'SequelizeUniqueConstraintError') {
      return errorHandler(
        Boom.conflict('An item with such unique data already exists')
      );
    } else if (err.message.startsWith('Validation error')) {
      return errorHandler(
        Boom.badRequest(message)
      );
    } else if (err.message.startsWith('Variable')) {
        return errorHandler(
          Boom.badRequest(message)
        );
    } else {
      // There is no suitable case
      return errorHandler(Boom.badGateway(message));
    }
  }
};

