import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import validator from 'express-validator';
import config from '../webpack.config';
import routes from '../server/routes';

require('dotenv').config();

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

routes(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

export default app;
