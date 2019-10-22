import { UserGroup } from '@shared/types';

interface RequestUser {
  id: number;
  group: UserGroup;
  login?: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: RequestUser;
    }
  }
}
