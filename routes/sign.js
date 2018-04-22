const express = require('express');
const router = express.Router();
const model = require('../models/index')
const passport = require('passport')

router.get('/signIn', (req, res) => {
  res.json({ 
    error: false,
    data: {
      title: "안녕",
      descript: "안녕하세요"
    }
  });
});

router.post('/signIn/passport/local', 
  passport.authenticate('local', { failureRedirect: '/api/signIn' }),
  (req, res) => {
    res.json({
      data: "ok",
      session: req.user
    });
  }
);

// google에 로그인 요청
router.get('/signIn/passport/google',
  passport.authenticate('google', { scope: ['profile'] }));

// google에 요청 후 callback function
router.get('/google/callback', // 이 부분은 google api에서 설정한 것
  passport.authenticate('google', { failureRedirect: '/api/signIn' }),
  function(req, res) {
    res.json({
      data: "잘되요",
      session: req.user
    })
  });



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