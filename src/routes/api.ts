import * as express from 'express';
import knex from '../connection';

const router = express.Router();

import { createTask, generateMeasurements } from '../models/Measurement';

router.post('/api/task', async (req, res) => {
  try {
    console.log(req.body);
    await createTask(req.body);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/generate', async (req, res) => {
  try {
    console.log(req.query);
    await generateMeasurements(req.query);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/sort', async (req, res) => {
  const filterObject = (object: { [key: string]: any }) =>
    Object.keys(object).reduce((acc: { [key: string]: any }, key) => {
      if (object[key]) acc[key] = object[key];
      return acc;
    }, {});

  const filters = filterObject(req.query);

  try {
    const query = knex('orders')
      .select('*')
      .limit(10);

    if (filters.startDate) query.where('date', '>=', filters.startDate);
    if (filters.endDate) query.where('date', '<', filters.endDate);
    if (filters.kondor) query.where({ kondor_id: filters.kondor });

    const orders = await query;
    const ids = orders.map(({ id }) => id);
    const instances = await knex('measurements')
      .select('*')
      .whereIn('order_id', ids);

    res.status(200).json({ orders, instances });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/measurements', async (req, res) => {
  if (!req.query.instanceId || !req.query.taskId) {
    console.log('No ids');
    return res.status(500).end({ error: 'No ids' });
  }

  try {
    const measurements = await knex('measurement_sections')
      .select('*')
      .where({ measurement_id: req.query.instanceId });
    const filteredMeasurements = measurements.map(
      ({ latitude, longitude, distance }) => ({ latitude, longitude, distance })
    );

    const ids = measurements.map(({ id }) => id);

    const roadLayers = await knex('road_layers')
      .select('*')
      .whereIn('measurement_section_id', ids);

    const filteredLayers = roadLayers.map(
      ({ depth, density, iri = 0, rutting = 0 }) => ({
        density,
        thickness: depth,
        iri,
        rutting
      })
    );

    const merged = filteredMeasurements.map((measurement, index) => ({
      ...measurement,
      ...filteredLayers[index]
    }));

    res.status(200).json({
      taskId: req.query.taskId,
      instanceId: req.query.instanceId,
      data: merged
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
