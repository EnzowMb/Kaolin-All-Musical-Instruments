import express from 'express';
import { exampleRoute } from './routes/ExampleRoute';
import swaggerUI from 'swagger-ui-express';
import swaggerJson from './swagger.json';

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/example', exampleRoute);

app.listen(port, () => console.log(`API listening on port ${port}!`));
