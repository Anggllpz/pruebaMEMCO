// User.orm.ts
import { IUser } from '../interfaces/IUser.interface';
import User from '../entities/User.entity';
import bcrypt from 'bcrypt';

export const findAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};



export const updateUser = async (id: string, userData: IUser): Promise<IUser | null> => {
  const updateData = userData;

  // Si se proporciona una nueva contraseña, hashea y actualiza la contraseña
  if (userData.password) {
    const saltRounds = 10;
    updateData.password = await bcrypt.hash(userData.password, saltRounds);
  }

  // Actualiza el usuario
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};
