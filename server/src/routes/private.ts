import express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();

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

router.use(express.static(path.join(__dirname, '../static/private')));

router.get('/graph', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/private/graph.html'));
});
router.get('/api/', (req, res) => res.json({ username: 'username' }));

import {
  createMeasurement,
  generateMeasurements,
  makeRoute
} from '../models/Measurement';

router.post('/api/task', async (req, res) => {
  try {
    await createMeasurement(req.body);
    res.json({ status: 'ok', message: 'yeah' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error' });
  }
});

router.get('/api/generate/:id', async (req, res) => {
  try {
    await generateMeasurements(req.params.id);
    res.json({ status: 'ok', message: 'yeah' });
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

router.post('/api/test-route', (req, res) => {
  console.log(req.body);
  makeRoute();
  res.json({ status: 'ok', message: 'yeah' });
});

router.get('/api/track/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.send(id);
});
export default router;
