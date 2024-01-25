// UserRouter.ts
import { Router } from 'express';
import * as UsersController from '../controller/UsersController';
import { verifyToken } from '../middlewares/verifyToken.middleware'; // Asegúrate de que la ruta sea correcta

const userRouter = Router();

// Aplica el middleware 'verifyToken' a todas las rutas que necesitan protección
// GET /: Obtener todos los usuarios
userRouter.get('/', verifyToken, UsersController.getAllUsers);

// GET /:id: Obtener un usuario por ID
userRouter.get('/:id', verifyToken, UsersController.getUserById);

// POST /: Crear un nuevo usuario
// Si deseas proteger también la creación, descomenta la siguiente línea
// userRouter.post('/', verifyToken, UsersController.createUser);


// PUT /:id: Actualizar un usuario por ID
userRouter.put('/:id', verifyToken, UsersController.updateUser);

// DELETE /:id: Eliminar un usuario por ID
userRouter.delete('/:id', verifyToken, UsersController.deleteUser);

export default userRouter;
