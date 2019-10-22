import knex from '@root/connection';
const crypto = require('crypto');

interface UserType {
  login?: string;
  name: string;
  password: string;
  group_id: number;
}

class User {
  user: UserType;

  constructor(user: UserType) {
    this.user = user;
  }

  static hash(str: string) {
    const hash = crypto
      .createHash('md5')
      .update(str)
      .digest('hex');
    return hash;
  }

  public async create() {
    try {
      const hash = crypto
        .createHash('md5')
        .update(this.user.password)
        .digest('hex');
      this.user.password = hash;
      await knex('users').insert(this.user);
      return null;
    } catch (error) {
      return error;
    }
  }
}

export { User, UserType };
