const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../models').user;

module.exports = () => {
  // 세션작업
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });
 
  passport.use(new GoogleStrategy(
    {
        clientID: "174904103649-avqmm3gi389paqsq6rfk4o3umrljtkf0.apps.googleusercontent.com",
        clientSecret: "YoLORHgU64l_zaQSqITltbhY",
        callbackURL: "http://13.114.20.111/api/google/callback"
    },(accessToken, refreshToken, profile, done) => {
        // user등록 처리 후 
        // done으로 세션에 등록
        done(null, profile)
    }
  ));
};