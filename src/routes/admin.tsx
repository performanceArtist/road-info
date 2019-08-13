import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
const path = require('path');
const router = express.Router();

import html from '../html';
import App from '../client/admin/app';

import { User } from '../models/User';

router.use('/admin/', (req, res, next) => {
  if (!req.user || req.user.role != 2)
    return res.status(401).send('<h1>Unauthorized</h1>');
  next();
});

router.get('/admin/', (req, res) => {
  const jsx = <App />;
  const reactDom = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  res.send(html(reactDom, null, helmetData, 'admin'));
});

router.post('/admin/create', async (req, res) => {
  const user = new User(req.body);
  const error = await user.create();

  if (error) {
    console.log(error);
    res.json({ status: 'error', error });
  } else {
    res.json({ status: 'ok' });
  }
});

export default router;
