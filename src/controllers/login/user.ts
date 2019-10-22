import knex from '@root/connection';
const jwt = require('jsonwebtoken');

import config from '@root/config';
import { DatabaseUser } from '@shared/types';
import { User, UserType } from '@root/models/User';

export async function showUsers() {
  try {
    const users = await knex('users').select('*');
    console.log(users);
  } catch (err) {
    console.log(err);
  }
}

export async function createAdmin() {
  try {
    const admin = new User({
      login: 'admin',
      name: 'admin',
      password: '123',
      group_id: 2
    });
    await admin.create();
  } catch (err) {
    console.log(err);
  }
}

export async function createUser(user: UserType) {
  try {
    const newUser = new User(user);
    await newUser.create();
  } catch (err) {
    console.log(err);
  }
}

export async function login(password?: string) {
  if (!password) throw new Error('No password');

  const hash = User.hash(password);
  const user: DatabaseUser = await knex('users')
    .where({ password: hash })
    .first();

  if (!user) throw { type: 'login', message: 'Неверный логин или пароль' };

  return jwt.sign({ id: user.id }, config.auth.key);
}
