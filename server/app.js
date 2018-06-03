import 'babel-core/register';
import 'babel-polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import http from 'http';
import validator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import apiDocs from './api-docs.json';

require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
const server = http.createServer(app);


app.use(cors());
app.options('*', cors());

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

app.set('port', port);

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

export default app;
