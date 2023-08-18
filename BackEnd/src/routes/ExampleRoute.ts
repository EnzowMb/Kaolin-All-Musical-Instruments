import { Router } from 'express';
import { sayHello, sayVasco } from '../controllers/ExampleController';

const router = Router();

router.get('/', sayHello).get('/vasco', sayVasco);

export const exampleRoute = router;
