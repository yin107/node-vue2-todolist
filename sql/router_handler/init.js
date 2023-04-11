const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretKey = require('../tokenKey/tokenKey').jwtSecretKey; //密钥
exports.register_user = (req, res) => {
  //数据校验成功后//需要操作数据库进行添加
  const userinfo = req.body;
  //判断两次密码是否相等
  if (userinfo.password !== userinfo.checkPassword) {
    return res.send({ code: 4001, message: "两次密码不同" });
  }
  const sqlStr = "select * from user_data where card=?";
  //查询数据库，看账号是否已经被注册了
  db.query(sqlStr, userinfo.card, (err, results) => {
    if (err) {
      return res.send({ code: 4001, message: err.message });
    }
    if (results.length > 0) {
      return res.send({ code: 4001, message: "该用户已经注册过了" });
    }
    //如果没有被注册的话，先对密码进行加密，之后再添加到数据库
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    const newsql = "insert into user_data set ?";
    db.query(
      newsql,
      { card: userinfo.card, password: userinfo.password },
      (err, results) => {
        if (err) {
          return res.send({ code: 4001, message: err.message });
        }
        if (results.affectedRows !== 1) {
          return res.send({ code: 4001, message: "用户注册失败" });
        }
        res.send({ code: 200, message: "用户注册成功" });
      }
    );
  });
};

exports.login_user = (req, res) => {
  //通过表单验证，通过cord查询数据库，有这个账号的话，就判断密码是否正确,并生成token字符串返回给客户端
  const userinfo = req.body;
  const sql = "select * from user_data where card=?";
  db.query(sql, userinfo.card, (err, results) => {
    if (err) {
      return res.send({ code: 4001, message: err.message });
    }
    if (results.length !== 1)
      return res.send({ code: 4001, message: "该用户未注册" });
    //判断密码是否正确，数据库中的密码是加密过的,不能直接进行对比
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult)
      return res.send({ code: 4001, message: "密码输入错误" });
    //返回给客户端的token中不要携带密码
    const user = { ...results[0], password: "" };
    //生成token字符串
    const tokenStr = jwt.sign(user, jwtSecretKey, {
      expiresIn: "10h",
    });
    res.send({
      code: 200,
      message: "登录成功",
	  data:{
		userinfo:user,
		token: "Bearer " + tokenStr,
	  }
    });
  });

};
