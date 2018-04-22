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

        // message는 아직 넘어가지 않으며 추후 에러 핸들링 커스터마이징 예정
        // req를 사용할 수 있기 때문에 session의 flash message를 이용하면 가능할 것
        if (!member) { done(null, false, { message: 'email이 잘못되었습니다.' }) }
        if (!member.authenticate(password)) { done(null, false, { message: '비밀번호가 틀렸습니다' }) }
        
        // mask-json사용
        return done(null, maskJson(member.dataValues));
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