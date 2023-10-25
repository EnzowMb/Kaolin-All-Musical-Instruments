import { Router } from 'express';
import { InstrumentController } from '../controllers/InstrumentController';
import { page } from '../middlewares/page';

const router = Router();
const instrumentController = new InstrumentController();

router
  .get('/', instrumentController.getAllInstrument)
  .get('/string', instrumentController.getInstrumentFilterString, page)
  .post('/create', instrumentController.createInstrument);

export const instrumentRoute = router;
