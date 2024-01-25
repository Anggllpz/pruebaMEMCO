// En tu archivo de rutas, por ejemplo, AuthRouter.ts
import express from 'express';
import { login, otpSendCode, registerUser } from '../controller/AuthController';
import { verifyToken } from '../middlewares/verifyToken.middleware';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', verifyToken, registerUser);
authRouter.post('/otp-generator', otpSendCode);

export default authRouter;
