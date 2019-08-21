import knex from '@root/connection';
const bcrypt = require('bcrypt');

interface UserType {
  login: string;
  name: string;
  password: string;
  group_id: number;
}

class User {
  user: UserType;

  constructor(user: UserType) {
    this.user = user;
  }

  async create() {
    try {
      const SALT_WORK_FACTOR = 10;
      const hash = await bcrypt.hash(this.user.password, SALT_WORK_FACTOR);
      this.user.password = hash;
      await knex('users').insert(this.user);
      return null;
    } catch (error) {
      return error;
    }
  }

  verifyPassword(candidate: string) {
    return bcrypt.compare(candidate, this.user.password);
  }
}

export { User, UserType };
