import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const router = express.Router();

import App from '../client/login/app';
import html from '../html';
import knex from '../connection';
import config from '../config';

router.get('/login', (req, res) => {
  const { token, login } = req.cookies;
  if (token && login) {
    res.redirect('/');
  } else {
    const jsx = <App />;

    const reactDom = renderToString(jsx);
    const helmetData = Helmet.renderStatic();

    res.send(html(reactDom, null, helmetData, 'login'));
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
    res.status(500).json({ error });
  }
});

export default router;
