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

router.get('/api/', (req, res) => res.json({ username: 'username' }));

router.post('/api/task', (req, res) => {
  console.log(req.body);
  res.json({ status: 'ok', message: 'yeah' });
});

export default router;
