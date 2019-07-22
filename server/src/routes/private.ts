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

import { generateMeasurements, makeRoute } from '../models/Measurement';

router.post('/api/task', (req, res) => {
  console.log(req.body);
  res.json({ status: 'ok', message: 'yeah' });
});

router.get('/api/generate/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    generateMeasurements(id);
  } catch (err) {
    console.log(err);
    res.json({ status: 'error' });
  }
  res.json({ status: 'ok', message: 'yeah' });
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
