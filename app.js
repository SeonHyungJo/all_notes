var express = require('express');
var app = express();
const http = require('http');

const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');

const passport = require('passport');
const passportConfig = require('./auth/passport'); // 로컬
const passportConfigGoo = require('./auth/passport-goo'); // 구글

// 포트설정
const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

app.use(express.static(path.join(__dirname, 'public')));  //  static 파일 경로 설정

// bodyparser middleware use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize()); // passport 구동
passportConfig(); // 로컬 연결
passportConfigGoo();  // google연결

// 모든 경로는 routes/index.js로 이동
app.use('/api', routes);

const server = http.createServer(app);
server.listen(port);
