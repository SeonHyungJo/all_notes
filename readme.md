# 시작하기

* config/config.json가서 development부분 수정합니다.
  * database_development 특히 이부분을 바꾸어 database 이름을 정해줍니다.
* `sequelize db:create`
* `sequelize db:migrate`
* `sequelize db:seed:all`
* `yarn start`

-----

/signIn/passport/local에 post로 보내는 데이터

`{"mem_email": "이메일 주소",
	"mem_pw": "비밀번호"}`
