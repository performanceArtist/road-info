import * as express from 'express';
const path = require('path');

const router = express.Router();

import { TaskFormData } from '@root/client/shared/types';
import { asyncHandler } from '../utils';

import { createTask } from '../controllers/task';
import { simulateMeasurement } from '../controllers/simulation';
import { getCondors } from '../controllers/condor';

router.post(
  '/api/task',
  asyncHandler(async (req, res, next) => {
    await createTask(req.body as TaskFormData);
    res.status(200).end();
  })
);

router.get(
  '/api/generate',
  asyncHandler(async (req, res, next) => {
    await simulateMeasurement([], 0);
    res.status(200).end();
  })
);

router.get(
  '/api/sort',
  asyncHandler(async (req, res, next) => {
    const data = {};
    res.status(200).json(data);
  })
);

router.get(
  '/api/condors',
  asyncHandler(async (req, res, next) => {
    const data = await getCondors();
    res.status(200).json(data);
  })
);

router.get('/api/track', (req, res) => {
  res.sendFile(path.resolve('src/track/result.json'));
});

router.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    res.status(error.statusCode || error.status || 500).json({ error });
  }
);

export default router;
