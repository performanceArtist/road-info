interface User {
  login: string;
  role: number;
}

declare namespace Express {
  export interface Request {
    user: User;
  }
}
