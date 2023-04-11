const mysql=require('mysql')
const db=mysql.createPool({
	host:"127.0.0.1",
	user:"root",
	password:"my123456",
	database:'my_vue_node48'
})

module.exports=db