import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response): void => {
  // @ts-ignore
  res.render('api-doc');
});

export default router;
