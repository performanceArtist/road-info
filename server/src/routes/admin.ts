import express = require('express');
const path = require('path');

import { User } from '../models/User';

const router = express.Router();

router.use('/admin/', (req, res, next) => {
  if (!req.user || req.user.role != 2)
    return res.status(401).send('<h1>Unauthorized</h1>');
  next();
});

router.use(express.static(path.join(__dirname, '../static/admin')));

router.get('/admin/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/admin/admin.html'));
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
