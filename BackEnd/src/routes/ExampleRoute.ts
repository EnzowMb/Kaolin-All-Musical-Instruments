import { Router } from 'express';
import { sayHello, sayVasco, teste } from '../controllers/ExampleController';

const router = Router();

router.get('/', sayHello).get('/vasco', sayVasco).get('/test', teste);

export const exampleRoute = router;
