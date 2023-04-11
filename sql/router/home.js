const express=require('express')
const router=express.Router()

const {get_todo_list}=require('../router_handler/home')
router.get('/list',get_todo_list)

//添加新任务
const {add_todo}=require('../router_handler/home')
//需要对表单数据进行验证
const joi=require('joi')
const { form_schema } = require("../schema/initCheck.js");
const addData={//注意这里时表单验证，但并不是验证表单里面收集的相关信息，而是提交表单的时候，向后端发送的参数，进行验证
	task_name:joi.string().required(),
	end_time:joi.required(),
	task_containt:joi.required(),
	created_by:joi.required(),
	task_status:joi.required()
}
const errMesAdd={
	task_name:'任务名称请按照格式输入',
	end_time:'请选择结束日期',
	task_containt:'任务内容请按照格式输入',
}
router.post('/add',form_schema.roles(addData,errMesAdd),add_todo)

const {edit_task}=require('../router_handler/home')
router.post('/edit',edit_task)


const {haveDone_task}=require('../router_handler/home')
router.post('/haveDone',haveDone_task)


const {delete_task}=require('../router_handler/home')
router.post('/delete',delete_task)

const {change_impo}=require('../router_handler/home')
router.post('/changeImpo',change_impo)
module.exports=router