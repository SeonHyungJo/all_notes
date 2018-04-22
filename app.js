var express = require('express');
var app = express();
const http = require('http');

const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// passport 분리
const passportConfig = require('./auth/passport');
const passportConfigGoo = require('./auth/passport-goo'); // 여기

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

app.use(express.static(path.join(__dirname, 'public')));  //  static 파일 경로 설정

// bodyparser middleware use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
passportConfig();
passportConfigGoo();

const models = require("./models");
// 모든 경로는 routes/index.js로 이동
app.use('/api', routes);

// 초기 html로 연결
// app.set('views', path.join(__dirname, 'test-views'));
// app.set('view engine', 'html');

const server = http.createServer(app);
server.listen(port);

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
