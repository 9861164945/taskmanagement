const mysql=require("mysql");
const con=mysql.createConnection({
host:'localhost', port:'3306', user:'root', password:"S@24onut", database:"task_management"
});
con.connect((err)=>{
if(err){
console.warn("error",err);
}
else{
console.warn("connected");
}
})