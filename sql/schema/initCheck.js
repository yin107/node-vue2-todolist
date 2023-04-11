const joi=require('joi')
//对用户注册的表单数据进行验证
//card要么是邮箱或者手机号--充当账号的功能

exports.form_schema={
	roles(data={},errMsg={},content='body'){
		const schema=joi.object(data)
		return async function(req,res,next){
			try {
				const value=await schema.validateAsync(req[content],data)
				next()
			}
			catch(error){
				console.log(error.details[0].context);
				res.json({
					code:4001,
					message:errMsg[error.details[0].context.key]||'sss'
				})
			}
		}
	}
}