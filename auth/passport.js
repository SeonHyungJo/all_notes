const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Members = require('../models').Member;

// 블랙리스트 부분임
// 제외할 key값을 blacklist에 저장 후 mask-json을 사용하여 제거
// maskjson 사용시 "--REDACTED--"로 변경
const blacklist = ['mem_pw'];
const maskJson = require('mask-json')(blacklist);
 
module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'mem_email', // json으로 넘어온 key값
    passwordField: 'mem_pw',   // json으로 넘어온 key값
    passReqToCallback: true,   // req를 내부적으로 사용하기 위함.
    }, (req, email, password, done) => {
      Members.findOne({where: {mem_email: email}})
      .then((member, err) =>{
        if (err) { done(null, false) }

        // done은 err, user, info 순서입니다.

        if (!member) { done(null, false, {
          code: "001",
          message: '유효하지 않은 email입니다. 확인해주세요.' 
        })}

        if (!member.authenticate(password)) {done(null, false, { 
          code: "002",
          message: '비밀번호가 틀렸습니다 확인해주세요.' 
        })}

        // mask-json사용하여 user의 비밀번호 숨김
        return done(null, maskJson(member.dataValues), { 
          code: "000",
          message: "로그인이 성공적으로 이루어졌습니다."
        });
      });
    }
  ));

  // 아래 주석은 세션 사용시 이용
  
  // passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
  //   done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  // });
  
  // passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  //   done(null, user); // 여기의 user가 req.user가 됨
  // });
};