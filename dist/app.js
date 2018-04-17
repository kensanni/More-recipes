'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-core/register');

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _webpackConfig = require('../webpack.config.prod');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _webpackConfig3 = require('../webpack.config.dev');

var _webpackConfig4 = _interopRequireDefault(_webpackConfig3);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _apiDocs = require('./api-docs.json');

var _apiDocs2 = _interopRequireDefault(_apiDocs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var HMR = require('webpack-hot-middleware');

var compiler = void 0;

var app = (0, _express2.default)();
var port = parseInt(process.env.PORT, 10) || 8000;
var server = _http2.default.createServer(app);

if (process.env.NODE_ENV === 'production') {
  compiler = (0, _webpack2.default)(_webpackConfig2.default);
} else {
  compiler = (0, _webpack2.default)(_webpackConfig4.default);
  app.use(HMR(compiler));
}

app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_apiDocs2.default));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: _webpackConfig4.default.output.publicPath
}));

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _expressValidator2.default)());

(0, _routes2.default)(app);

app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../client/index.html'));
});

app.all('*', function (req, res) {
  res.status(404).send({
    message: 'Route does not exist'
  });
});

app.set('port', port);

server.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});

exports.default = app;