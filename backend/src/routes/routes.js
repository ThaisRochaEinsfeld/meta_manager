import express from 'express';
import goalController from '../controllers/goalController.js';
import userController from '../controllers/userController.js';
import loginController from '../controllers/loginController.js';

export const goalRouter = express.Router();
goalRouter.get('/', goalController.getAll);
goalRouter.post('/', goalController.create);
goalRouter.get('/:id', goalController.getById);
goalRouter.put('/:id', goalController.update);
goalRouter.delete('/:id', goalController.remove);
goalRouter.put('/:id/complete', goalController.complete);
goalRouter.patch('/:id/completed', goalController.setCompleted);

export const userRouter = express.Router();
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

export const authRouter = express.Router();
authRouter.post('/login', loginController.login);

const router = express.Router();
router.use('/auth', authRouter);
router.use('/goals', goalRouter);
router.use('/users', userRouter);

export default router;
