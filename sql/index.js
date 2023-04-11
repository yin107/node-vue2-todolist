const express = require("express");
const app = express();
const cors = require("cors");
const { expressjwt: expressJWT } = require("express-jwt");
const jwtSecretKey = require("./tokenKey/tokenKey").jwtSecretKey;
app.use(cors())
app.use(
  expressJWT({ secret: jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/pc\/user\//,'/','/register'],
  })
);


const initRouter = require("./router/init");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/pc/user", initRouter);

const homeRouter = require("./router/home");
app.use("/pc/todo", homeRouter);

app.use((err, req, res, next) => {
  if (err.name==='UnauthorizedError')
{  	
	// res.header("Access-Control-Allow-Origin", "*")
    return res.send({
      code: 4002,
      message: "客户身份验证错误,请重新登录"
    })
}else{
	return res.send({
		code: 4001,
		message: err.message,
	  });
	}

});

app.listen("300", () => {
  console.log("apiRuning");
});
