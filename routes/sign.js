const express = require('express');
const router = express.Router();
const model = require('../models/index')
const passport = require('passport')

// 로그인 시도
// 현재 passport를 customize하여 수정한 상태임.
// post의 callback안에 authenticate를 실행하도록 수정함.
// info안에 코드와 message가 담기며, user가 없으면 false로 반환됨
router.post('/signIn/passport/local', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    
    if (err) { return next(err) }  
    res.json({ info: info,user: user })
  })(req, res, next);
});

// google에 로그인 요청
router.get('/signIn/passport/google',
passport.authenticate('google', { scope: ['profile'] }));

// google에 요청 후 callback function
// 이 부분은 google api에서 설정한 것
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/signIn/fail' }),
  (req, res) => {
    res.json({
      code: '000',
      session: req.user
    })
});


// router.get('/signIn', (req, res) => {
//   res.json({ 
//     error: false,
//     data: {
//       title: "안녕",
//       descript: "안녕하세요"
//     }
//   });
// });

// router.get('/test', (req, res) => {
  
  //   model.user.findOne({user_id: 'jinseong'})
  //     .then( user => {
    //         res.json({
      //           error: false,
//           data: user
//         });        
//       }
//     )
//     .catch( err => {
//       res.json({
//         error: true,
//         data: {},
//         error: err
//       });
//     })
// })

// router.get('/instance', (req, res) => {

//   model.Member.findAll()
//   .then( (member) => {
//     res.json({
//       member: member
//     })
//   })
// })


module.exports = router;