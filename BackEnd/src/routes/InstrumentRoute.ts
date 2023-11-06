import { Router } from 'express';
import { InstrumentController } from '../controllers/InstrumentController';
import { auth } from '../middlewares/auth';

const router = Router();
const instrumentController = new InstrumentController();

router
  .get('/', instrumentController.getAllInstrument)
  .get('/family', auth, instrumentController.getInstrumentFilterString)
  .post('/create', auth, instrumentController.createInstrument);

export const instrumentRoute = router;
