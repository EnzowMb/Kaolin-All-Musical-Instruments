import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { auth } from '../middlewares/auth';

const router = Router();
const userController = new UserController();

router
  .get('/', userController.getAllUsers)
  .get('/:id', auth, userController.getUser)
  .post('/create', userController.createUser);

export const userRoute = router;
