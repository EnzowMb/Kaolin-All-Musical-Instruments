import { Router } from 'express';
import { InstrumentController } from '../controllers/InstrumentController';

const router = Router();
const instrumentController = new InstrumentController();

router.post('/create', instrumentController.createInstrument);

export const instrumentRoute = router;
