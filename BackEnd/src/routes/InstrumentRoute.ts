import { Router } from 'express';
import { InstrumentController } from '../controllers/InstrumentController';
import { auth } from '../middlewares/auth';
import { upload } from '../config/multer';

const router = Router();
const instrumentController = new InstrumentController();

router
  .get('/', instrumentController.getAllInstrument)
  .get('/family', instrumentController.getInstrumentFilterString)
  .post(
    '/create',
    auth,
    upload.single('file'),
    instrumentController.createInstrument
  )
  .put('/:id', auth, instrumentController.updateInstrument)
  .delete('/:id', auth, instrumentController.deleteInstrument);

export const instrumentRoute = router;
