import { Router } from 'express';
import { getUsers, getUserById, removeUser } from '../../../controllers/api/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', removeUser);

export default userRouter;

