const express = require('express');
const router = express.Router();
const model = require('../models/index')
const passport = require('passport')

// 로그인 시도
router.post('/signIn/passport/local', 
    passport.authenticate('local', { 
      failureRedirect: '/api/signIn/fail',
      session: false
    }),
  (req, res) => {
    res.json({
      code: '000',
      member: req.user
    });
  }
);

// 실패시 callback function
// 현재는 단순히 유효하지 않음처리
// 추후 커스터마이징을 통해 이메일과 비밀번호 설정
router.get('/signIn/fail', (req, res) => {
  res.json({ 
    data: {
      code: '001',
      message: "유효하지 않은 값입니다. 다시 확인해주세요."
    }
  });
});

// google에 로그인 요청
router.get('/signIn/passport/google',
passport.authenticate('google', { scope: ['profile'] }));

// google에 요청 후 callback function
router.get('/google/callback', // 이 부분은 google api에서 설정한 것
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