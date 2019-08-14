import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

import routes from '../client/app/routes';
import createStore from '../client/app/store';
import App from '../client/app/app';
import html from '../html';
import config from '../config';
import knex from '../connection';

router.use('/', async (req, res, next) => {
  try {
    const { token, login } = req.cookies;
    if (!token || !login) throw new Error('No auth');

    const payload = jwt.verify(token, config.auth.key);
    const user = await knex('users')
      .where({ login: payload.login })
      .first();

    if (!user) throw new Error('User not found');
    req.user = { login, role: user.group_id };
    next();
  } catch (error) {
    req.user = null;
    res.redirect('/login');
  }
});

import { createTask, generateMeasurements } from '../models/Measurement';

router.post('/api/task', async (req, res) => {
  try {
    console.log(req.body);
    await createTask(req.body);
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error' });
  }
});

router.get('/api/generate', async (req, res) => {
  try {
    console.log(req.query);
    await generateMeasurements(req.query);
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error' });
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
    res.status(500).end();
  }
});

router.get('/api/measurements', async (req, res) => {
  if (!req.query.id) {
    return res.status(500).end();
  }
  try {
    const measurements = await knex('measurement_sections')
      .select('*')
      .where({ measurement_id: req.query.id });
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

    res.status(200).json({ id: req.query.id, measurements: merged });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

router.get('/*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route));

  if (!activeRoute) next();

  const store = createStore();

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  );

  const reactDom = renderToString(jsx);
  const reduxState = store.getState();
  const helmetData = Helmet.renderStatic();

  res.send(html(reactDom, reduxState, helmetData, 'app'));
});

export default router;
