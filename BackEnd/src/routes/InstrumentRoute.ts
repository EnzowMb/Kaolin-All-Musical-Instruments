import { Router } from 'express';
import multer from 'multer';

import { InstrumentController } from '../controllers/InstrumentController';
import { auth } from '../middlewares/auth';

const router = Router();
const instrumentController = new InstrumentController();
const upload = multer({ storage: multer.memoryStorage() });

router
  .get('/', instrumentController.getAllInstrument)
  .get('/family', instrumentController.getInstrumentFilterString)
  .post(
    '/create',
    auth,
    upload.single('filename'),
    instrumentController.createInstrument
  )
  .put('/:id', auth, instrumentController.updateInstrument)
  .delete('/:id', auth, instrumentController.deleteInstrument);

export const instrumentRoute = router;
