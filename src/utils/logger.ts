/*----------------------------------------------------------------------------------------------------
                                   GraphQL extension for logging
----------------------------------------------------------------------------------------------------*/

import { GraphQLExtension } from 'apollo-server-express';

import { logger } from './winston';

/*--------------------------------------------------------------------------------------------------*/


/**
 * Format the log message string
 *
 * @return string
 */
export const formatLogMessage = (text: string): string => {
  if (!text) return '';

  return JSON.stringify(text)
    .replace(/(\r\n|\n|\r|\\r\\n|\\n|\\r)/gm, '')
    .replace(/\\"/gm, '"')
    .replace(/\s+/gm, ' ');
};


/**
 * Logger extension for the apollo server
 */
export class Logger implements GraphQLExtension {
  requestDidStart(request) {
    const { queryString, operationName, variables } = request;

    if (!!operationName) {
      logger.info('[Operation] => ' + formatLogMessage(operationName));
    }

    logger.info('[Query] => ' + formatLogMessage(queryString));

    if (!!variables) {
      logger.info('[Variables] => ' + formatLogMessage(variables));
    }

    return (...errors) => {
      if (errors.length) {
        logger.error('[Errors] => ' + JSON.stringify(errors, null, 2));
      }
    };
  }

  willSendResponse(options) {
    const { graphqlResponse } = options;
    logger.info('[Response] => ' + formatLogMessage(graphqlResponse));
  }
}
