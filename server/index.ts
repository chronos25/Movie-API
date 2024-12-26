import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from '../routes/index';
import { connect as mongoConnect } from '../utils/mongo';

const app: Application = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1/api', routes);

app.listen(port, () => {
  mongoConnect();
  console.log(`App is running on port ${port}`);
});
