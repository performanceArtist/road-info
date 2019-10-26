import * as express from 'express';
const path = require('path');

const router = express.Router();

import { TaskFormData, GPSTrack } from '@root/client/shared/types';
import { asyncHandler } from '../utils';

import { createTask } from '../controllers/task';
import { simulateMeasurement } from '../controllers/simulation';
import { getCondors } from '../controllers/condor';
import { getRoute, findLocation } from '../controllers/route';

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

router.get(
  '/api/route',
  asyncHandler(async (req, res) => {
    const points: GPSTrack = req.query.points.map(JSON.parse);
    const route = await getRoute(points);
    res.json(route);
  })
);

router.get(
  '/api/location',
  asyncHandler(async (req, res) => {
    const { search = 'Томск' } = req.query;
    const location = await findLocation(search);
    res.json(location);
  })
);

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
