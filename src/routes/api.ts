import * as express from 'express';

const router = express.Router();

import createTask from '@root/controllers/api/createTask';
import generateMeasurements from '@root/controllers/api/generateMeasurements';
import getOrders from '@root/controllers/api/getOrders';
import getInstances from '@root/controllers/api/getInstances';
import getMeasurements from '@root/controllers/api/getMeasurements';

router.post('/api/task', async (req, res, next) => {
  try {
    console.log(req.body);
    await createTask(req.body);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

router.get('/api/generate', async (req, res, next) => {
  try {
    console.log(req.query);
    await generateMeasurements(req.query);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

router.get('/api/sort', async (req, res, next) => {
  try {
    const data = await getOrders(req.query);
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

export default router;
