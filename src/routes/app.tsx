import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();

import routes from '@root/client/app/routes';
import createStore from '@root/client/app/store';
import App from '@root/client/app/App';
import render from '@root/utils/render';
import config from '@root/config';
import knex from '@root/connection';
import { DatabaseUser, DatabaseUserGroup } from '@root/client/shared/types';

router.use('/', async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error('No auth');

    const payload = jwt.verify(token, config.auth.key);
    if (!payload) throw new Error('Invalid access token');

    const user: DatabaseUser = await knex('users')
      .select('*')
      .where({ id: payload.id })
      .first();
    if (!user) throw new Error('User not found');
    const group: DatabaseUserGroup = await knex('user_group')
      .select('*')
      .where({
        id: user.group_id
      })
      .first();

    if (!group) throw new Error('No user group');

    req.user = {
      id: user.id,
      group: group.name,
      login: user.login
    };

    next();
  } catch (error) {
    req.user = undefined;
    next();
  }
});

const paths = routes.map(({ path }) => path);
router.get(paths, (req, res, next) => {
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

  res.send(render({ reactDom, reduxState, helmetData, bundle: 'app' }));
});

export default router;
