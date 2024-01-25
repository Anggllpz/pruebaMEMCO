import { Request, Response } from 'express';
import * as UserOrm from '../domain/orm/Users.orm';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserOrm.findAllUsers();
    res.json(users);
  } catch (error: any) { // Especificar el tipo como 'Error'
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserOrm.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error: any) { // Especificar el tipo como 'Error'
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserOrm.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error: any) { // Especificar el tipo como 'Error'
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserOrm.deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error: any) { // Especificar el tipo como 'Error'
    res.status(500).json({ message: error.message });
  }
};
