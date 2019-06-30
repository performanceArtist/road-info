import express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

import knex from '../connection';
import config from '../config';

router.use(express.static(path.join(__dirname, '../static/public')));

router.get('/login', (req, res) => {
  const { token, login } = req.cookies;
  if (token && login) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(__dirname, '../static/public/login.html'));
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex('users')
      .where({ login: username })
      .first();

    if (!user) throw { type: 'login', message: 'Неверный логин' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { type: 'password', message: 'Неверный пароль' };

    const token = jwt.sign({ login: user.login }, config.auth.key);
    res.json({ token, login: user.login });
  } catch (error) {
    res.json({ status: 'error', error });
  }
});

export default router;
