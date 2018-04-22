const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Members = require('../models').Member;

const blacklist = ['mem_pw'];
const maskJson = require('mask-json')(blacklist);
 
module.exports = () => {

  // passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
  //   done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  // });

  // passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  //   done(null, user); // 여기의 user가 req.user가 됨
  // });
 
  passport.use(new LocalStrategy(
    {
      usernameField: 'mem_email',
      passwordField: 'mem_pw',
      passReqToCallback: true,
    },(req, email, password, done) => {
      Members.findOne({where: {mem_email: email}})
      .then((member, err) =>{
        if (err) { done(null, false) }
        if (!member) { done(null, false, { message: 'email이 잘못되었습니다.' }) }
        if (!member.authenticate(password)) { done(null, false, { message: '비밀번호가 틀렸습니다' }) }

        return done(null, maskJson(member.dataValues));
      });
    }
  ));
};