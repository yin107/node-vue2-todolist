//需要对数据库进行增删改查，导入数据库
const db = require("../db/index");
//获取用户任务列表数据
exports.get_todo_list = (req, res) => {
  if (req.query.created_by !== req.auth.card)
    return res.send({ status: "4002", message: "用户信息错误。请重新登录" });
  //验证通过的话，就需要根据用户账号取数据库中查询数据并返回
  const userid = req.query.created_by;
  const sql = "select * from task_list where created_by=? order by task_status asc, task_impo asc";
  db.query(sql, userid, (err, results) => {
    if (err) return res.send({ code: 4001, message: err.message });
    if (results.length === 0)
      return res.send({ code: 4001, message: "查询失败" });
    return res.send({
      code: 200,
      message: "查询成功",
      data: {
        taskList: results,
      },
    });
  });
};

//添加新任务
exports.add_todo = (req, res) => {
  //参数符合验证规则，根据created_by去添加到数据库中
  const addSql = "insert into task_list set ?";
  const data = { ...req.body, task_impo: 0 };
  db.query(addSql, data, (err, results) => {
    if (err) return res.send({ code: 4001, message: err.message });
    if (results.affectedRows !== 1)
      return res.send({ code: 4001, message: "添加失败" });
    const returnSql = "select ";
    return res.send({ code: 200, message: "添加成功" });
  });
};

//修改任务
exports.edit_task = (req, res) => {
  const sql =
    "update task_list set task_name=?,end_time=?,task_containt=? where id=? && created_by=?";

  db.query(
    sql,
    [
      req.body.task_name,
      req.body.end_time,
      req.body.task_containt,
      req.body.id,
      req.body.created_by,
    ],
    (err, results) => {
      if (err) return res.send({ code: 4001, message: err.message });
      if (results.affectedRows !== 1)
        return res.send({ code: 4001, message: "修改失败" });
      return res.send({ code: 200, message: "修改成功" });
    }
  );
};

exports.haveDone_task = (req, res) => {
  //更具id去更新task_status为1
  const sql = "update task_list set task_status=? where id=? && created_by=?";
  const newStatus = req.body.curStatus === 0 ? 1 : 0;
  db.query(
    sql,
    [newStatus, req.body.id, req.body.created_by],
    (err, results) => {
      if (err) return res.send({ code: 4001, message: err.message });
      if (results.affectedRows !== 1)
        return res.send({ code: 4001, message: "更改状态出错了" });
      return res.send({ code: 200, message: "更改成功" });
    }
  );
};

//删除任务
exports.delete_task = (req, res) => {
  //根据id和created_by去修改task_status的状态为2
  const sql = "update task_list set task_status=2 where id=? && created_by=?";
  db.query(sql, [req.body.id, req.body.created_by], (err, results) => {
    if (err) return res.send({ code: 4001, message: err.message });
    if (results.affectedRows !== 1)
      return res.send({ code: 4001, message: "更改状态出错了" });
    return res.send({ code: 200, message: "更改成功" });
  });
};


exports.change_impo=(req,res)=>{
	const sql='update task_list set task_impo=? where id=?&&created_by=?'
	db.query(sql,[req.body.task_impo,req.body.id,req.body.created_by],(err,results)=>{
		if (err) return res.send({ code: 4001, message: err.message });
		if (results.affectedRows !== 1)
		  return res.send({ code: 4001, message: "更改出错了" });
		return res.send({ code: 200, message: "更改成功" });
	})
}
