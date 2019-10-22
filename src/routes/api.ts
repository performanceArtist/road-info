import * as express from 'express';
const path = require('path');

const router = express.Router();

import { TaskFormData } from '@root/client/shared/types';

import { createTask } from '../controllers/task';
import { simulateMeasurement } from '../controllers/simulation';

router.post('/api/task', async (req, res, next) => {
  try {
    await createTask(req.body as TaskFormData);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

router.get('/api/generate', async (req, res, next) => {
  try {
    await simulateMeasurement([], 0);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

router.get('/api/sort', async (req, res, next) => {
  try {
    const data = {};
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/api/measurements', async (req, res, next) => {
  try {
    const { taskId } = req.query;
    if (!taskId) throw new Error('No task id');
    const instances = await getInstances(taskId);
    const instancesData = await Promise.all(
      instances.map(instance => getMeasurements(instance.id))
    );
    const sorted = instancesData.map(instance =>
      instance.sort((a, b) => a.distance - b.distance)
    );
    const data = instances.reduce((acc, cur, index) => {
      acc[cur.id] = sorted[index];
      return acc;
    }, {});

    res.send({ taskId, data });
  } catch (error) {
    next(error);
  }
});

router.get('/api/history', async (req, res, next) => {
  try {
    const orders = await getOrders(req.query);
    const instances = await Promise.all(
      orders.map(order => getInstances(order.id))
    );
    console.log(instances);

    const instancesData = await Promise.all(
      instances.map(groups =>
        Promise.all(groups.map(instance => getMeasurements(instance.id)))
      )
    );

    const measurements = orders.map((order, index) => {
      const allData = instancesData[index];
      const data = instances[index].reduce((acc, cur, instanceIndex) => {
        acc[cur.id] = allData[instanceIndex];
        return acc;
      }, {});

      return { taskId: order.id, data };
    });

    res.json(measurements);
  } catch (error) {
    next(error);
  }
});

router.get('/api/track', (req, res) => {
  res.sendFile(path.resolve('src/track/result.json'));
});

export default router;
