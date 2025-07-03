import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AppDataSource } from '@/lib/postgres';
import { User } from '@/entities/userModel';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import config from '@/config/index';
import { messages } from '@/utils/message';
import { UserData, LoginData, RefreshTokenData, } from '@/types/userType';
import { seedAccountTreeIfEmpty } from "@/utils/accountSeeder";
const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, role } = req.body as UserData;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const createUser = userRepository.create({
      username,
      email,
      password,
      role,
    });

    await userRepository.save(createUser);
    const userId=createUser.id;
     await seedAccountTreeIfEmpty(userId);
    const accessToken = generateAccessToken(createUser.id);
    const refreshToken = generateRefreshToken(createUser.id);

    createUser.refreshToken = refreshToken;
    await userRepository.save(createUser);

    res.status(201).json({ message: 'register', user: createUser, accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Error in registration', error: err });
  }
};
const login = async (req: Request, res: Response): Promise<void> => {
  
  res.status(201).json({ message: 'login' });
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_TOKEN) as { userId: number };
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOne({ where: { id: decoded.userId } });

    if (!foundUser) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const accessToken = generateAccessToken(foundUser.id);

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const getUser=async(req:Request,res:Response):Promise<void>=>{
  try{
  const userRepository = AppDataSource.getRepository(User);
  const getUser=await userRepository.find();
  res.status(200).json(getUser)
  }
  catch(err){
    console.log(err);
  }
}

export default { register, login, refreshToken,getUser };
