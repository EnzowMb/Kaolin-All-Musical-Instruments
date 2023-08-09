import { Router } from 'express';
import { sayHello } from '../controllers/ExampleController';

const router = Router();

router.get('/', sayHello);

export const exampleRoute = router;
