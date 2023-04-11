const express = require("express");
var router = express.Router();

const joi = require("joi");

//用户注册
const { register_user } = require("../router_handler/init");
const { form_schema } = require("../schema/initCheck.js");

router.post(
  "/register",
  form_schema.roles(
    {
      card: [
        joi
          .string()
          .pattern(
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
          )
          .required(),
        joi
          .string()
          .pattern(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/)
          .required()
      ],
      password: joi
        .string()
        .pattern(/^[\S]{6,12}$/)
        .required(),
      checkPassword: joi
        .string()
        .pattern(/^[\S]{6,12}$/)
        .required(),
    },
    {
      card: "用户邮箱或手机号输入错误",
      password: "请输入正确的密码格式",
      checkPassword: "请输入正确的密码格式",
    }
  ),
  register_user
);

//用户登录
const {login_user}=require('../router_handler/init')
router.post('/login',form_schema.roles({card: [
	joi
	  .string()
	  .pattern(
		/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
	  )
	  .required(),
	joi
	  .string()
	  .pattern(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/)
	  .required()
  ],
  password: joi
	.string()
	.pattern(/^[\S]{6,12}$/)
	.required()},{ card: "用户邮箱或手机号输入错误",
	password: "请输入正确的密码格式",}),login_user)

module.exports = router;
