/*----------------------------------------------------------------------------------------------------
                                     App configuration
----------------------------------------------------------------------------------------------------*/

import bodyParser from 'body-parser';
import cors from 'cors';
import ejs from 'ejs';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import appRoot from 'app-root-path';

import routes from './routers/root';

/*--------------------------------------------------------------------------------------------------*/


export const createApp = (): express.Application => {
  const app: express.Application = express();

  app.use(express.static(path.join(appRoot.path, 'views')));

  app.set('views', path.join(__dirname, '../views'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');

  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.use(cors());
  app.use(helmet());
  
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,   // 5 minutes
      max: 1000,                  // limit each IP to 1000 requests per windowMs
    }),
  );

  app.use('/', routes);

  return app;
};
