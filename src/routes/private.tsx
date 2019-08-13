import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

import routes from '../client/routes';
import createStore from '../client/store';
import App from '../client/app';
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
  console.log(req.query);
  try {
    const entries = await knex('measurements')
      .select('*')
      .where({ kondor_id: req.query.kondor || 1 })
      .orderBy('id', 'desc')
      .limit(5)
      .offset(0);
    res.status(200).json(entries);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

router.get('/api/track/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.send(id);
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

  res.send(html(reactDom, reduxState, helmetData));
});

export default router;
