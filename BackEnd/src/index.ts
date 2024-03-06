import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJson from './swagger.json';
import cors from 'cors';

import { instrumentRoute } from './routes/InstrumentRoute';
import { userRoute } from './routes/UserRoute';
import { loginRoute } from './routes/LoginRoute';

const app = express();
const port = 8000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors({ origin: '*' }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/instrument', instrumentRoute);
app.use('/user', userRoute);
app.use('/login', loginRoute);

app.listen(port, () => console.log(`API listening on port ${port}!`));
