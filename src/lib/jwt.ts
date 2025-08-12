import jwt from 'jsonwebtoken';
import config from '../config';

export const generateAccessToken = (userId: string | number): string => {
  return jwt.sign(
    { userId: userId.toString() },
    config.JWT_ACCESS_TOKEN,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRY,
      subject: 'accessToken'
    }
  );
};

export const generateRefreshToken = (userId: string | number): string => {
  return jwt.sign(
    { userId: userId.toString() },
    config.JWT_REFRESH_TOKEN,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRY,
      subject: 'refreshToken'
    }
  );
};
