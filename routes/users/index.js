import { Router } from 'express';
import * as stilController from './user.ctrl';
const userRouter = new Router();

userRouter.post('/join', stilController.join);
userRouter.post('/login', stilController.login);

export default userRouter;
