// Auth.orm.ts
import { IAuth } from '../interfaces/IAuth.interface';
import User, { IUser } from '../entities/User.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const logIn = async (authData: IAuth): Promise<string | null> => {
  try {
    // Buscar el usuario por el username
    const user = await User.findOne({ username: authData.username });
    if (!user) {
      return null; // Usuario no encontrado
    }

    // Comparar la contraseña proporcionada con la almacenada y encriptada
    const isPasswordValid = await bcrypt.compare(authData.password, user.password);
    if (!isPasswordValid) {
      return null; // Contraseña no válida
    }

    // Generar y devolver un token JWT
    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 7200 // Expira en 2 horas
    });

    return token;
  } catch (error) {
    // Manejar errores inesperados
    console.error('Error during login:', error);
    return null;
  }
};


export const registerUser = async (userData: IUser): Promise<IUser> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // No necesitas usar _doc aquí
  const user = new User({
    username: userData.username,
    password: hashedPassword,
    email: userData.email,
    address: userData.address
  });

  return await user.save();
};


export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email: email });
};