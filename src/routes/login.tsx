import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
const router = express.Router();

import App from '@root/client/login/App';
import render from '@root/utils/render';
import { login } from '@root/controllers/login/user';

router.get('/login', (req, res) => {
  const { token, login } = req.cookies;
  if (token && login) {
    res.redirect('/');
  } else {
    const jsx = <App />;
    const reactDom = renderToString(jsx);
    const helmetData = Helmet.renderStatic();

    res.send(render({ reactDom, helmetData, bundle: 'login' }));
  }
});

router.post('/login', async (req, res) => {
  const { password } = req.body;

  try {
    const token = await login(password);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
