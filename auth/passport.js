const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models').user;

module.exports = () => {
  // 세션작업
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });
 
  passport.use(new LocalStrategy(
    {
      usernameField: 'user_id',
      passwordField: 'user_pw',
      passReqToCallback: true,
    },(req, username, password, done) => {
      Users.findOne({where: {user_id: username}})
      .then((user, err) =>{
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.authenticate(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
};