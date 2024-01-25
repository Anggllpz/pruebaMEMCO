
import { Request, Response } from 'express';
import * as AuthOrm from '../domain/orm/Auth.orm';
import nodemailer from 'nodemailer';

export const login = async (req: Request, res: Response) => {
  try {
    const token = await AuthOrm.logIn(req.body);
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    res.json({ token });
  } catch (error: any) { // Aquí es recomendable no usar 'any', sino un tipo más específico
    res.status(500).json({ message: error.message });
  }
};


export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await AuthOrm.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) { // Especificar el tipo como 'Error'
    res.status(500).json({ message: error.message });
  }
};  


export const otpSendCode = async (req: Request, res: Response) => {
  try {
    // Buscar usuario por email
    const user = await AuthOrm.findUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generar OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Ejemplo con Gmail; usar la configuración adecuada para tu proveedor
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar opciones de correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    // email address: emailserviceautomatic@gmail.com
    // password: AutomaticEmailService123


    // Enviar correo electrónico
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to email', otp: otp })

  } catch (error: any) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: error.message });
  }
};