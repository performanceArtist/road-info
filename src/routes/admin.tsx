import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
const path = require('path');
const router = express.Router();

import App from '@root/client/admin/app';
import render from '@root/utils/render';
import { User } from '@root/models/User';

router.use('/admin/', (req, res, next) => {
  if (!req.user || req.user.role != 2)
    return res.status(401).send('<h1>Unauthorized</h1>');
  next();
});

router.get('/admin/', (req, res) => {
  const jsx = <App />;
  const reactDom = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  res.send(render({ reactDom, helmetData, bundle: 'admin' }));
});

router.post('/admin/create', async (req, res, next) => {
  try {
    const user = new User(req.body);

    await user.create();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

export default router;
