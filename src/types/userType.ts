export type UserData = {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};
export type LoginData = {
  email: string;
  password: string;
};
export type RefreshTokenData = {
  refreshToken: string;
};

