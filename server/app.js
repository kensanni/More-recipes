import 'babel-core/register';
import 'babel-polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import validator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import routes from '../server/routes';
import apiDocs from './api-docs.json';

require('dotenv').config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs));


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

routes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.all('*', (req, res) => {
  res.status(404).send({
    message: 'Route does not exist'
  });
});

export default app;
