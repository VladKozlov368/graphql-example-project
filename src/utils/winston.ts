/*----------------------------------------------------------------------------------------------------
                                           Winston logger
----------------------------------------------------------------------------------------------------*/

import { Loggly } from 'winston-loggly-bulk';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';
import appRoot from 'app-root-path';
const { combine, prettyPrint } = format;

/*--------------------------------------------------------------------------------------------------*/

let level, transports;
const env = process.env.NODE_ENV;
const logDir = `${appRoot.path}/.logs/`;

/* Сombined logs */
const COMBINED_LOGS = new winston.transports.File({
  filename: `${logDir}/combined.log`,
  handleExceptions: true,
  level: 'verbose',
  maxsize: 5242880, // 5MB
  maxFiles: 5,
});

/* Error logs */
const ERROR_LOGS = new winston.transports.File({
  filename: `${logDir}/error.log`,
  level: 'error',
  handleExceptions: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
});

/* Loggly logs */
// const LOGGLY_LOGS = new Loggly({
//   subdomain: process.env.LOGGLY_SUBDOMAIN,
//   token: process.env.LOGGLY_INPUT_TOKEN,
//   json: true,
//   tags: ['Th3Numbers-heroku'],
// });

/* Console logs */
const CONSOLE_LOGS = new winston.transports.Console();

switch (env) {
  case 'development':
  case 'production':
    level = 'error';
    transports = [CONSOLE_LOGS];
    break;

  case 'heroku':
    level = 'silly';
    transports = [CONSOLE_LOGS];
    break;

  case 'tests':
    level = 'error';
    transports = [CONSOLE_LOGS];
    break;
}

export const logger = winston.createLogger({
  level,
  transports,
  format: combine(prettyPrint()),
  exitOnError: false,
});
