export type UserGroup = 'admin' | 'driver' | 'operator';
export type UserInfo = {
  id: number;
  login: string;
  name: string;
  group: UserGroup;
};
