import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

router.post('/', authController.login);

export const loginRoute = router;
