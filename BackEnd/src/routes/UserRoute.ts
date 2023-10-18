import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyAuth } from '../middlewares/verifyAuth';

const router = Router();
const userController = new UserController();

router
  .get('/', userController.getAllUsers)
  .get('/:id', verifyAuth, userController.getUser)
  .post('/create', userController.createUser);

export const userRoute = router;
