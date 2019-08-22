import * as express from 'express';

const router = express.Router();

import createTask from '@root/controllers/api/createTask';
import generateMeasurements from '@root/controllers/api/generateMeasurements';
import getOrders from '@root/controllers/api/getOrders';
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
    const { taskId, instanceId } = req.query;

    if (!instanceId || !taskId) {
      console.log('No ids');
      return res.status(500).end({ error: 'No ids' });
    }

    const data = await getMeasurements(instanceId);

    res.status(200).json({
      taskId,
      instanceId,
      data
    });
  } catch (error) {
    next(error);
  }
});

router.get('/api/history', async (req, res, next) => {
  try {
    const data = await getOrders(req.query);
    const instancesData = await Promise.all(
      data.instances.map(({ id }: { id: string }) => getMeasurements(id))
    );
    const getIndexes = (id: string) => {
      return data.instances.reduce((acc, el, index) => {
        if (el.order_id === id) {
          acc.push(index);
        }

        return acc;
      }, []);
    };
    const indexes = data.orders.map(({ id }) => getIndexes(id));
    const measurements = data.orders.map(({ id }, index) => {
      const meas = indexes[index].reduce((acc, cur) => {
        acc[data.instances[cur].id] = instancesData[cur];
        return acc;
      }, {});

      return { taskId: id, data: meas };
    });

    res.json(measurements);
  } catch (error) {
    next(error);
  }
});

export default router;
