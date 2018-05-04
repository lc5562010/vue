import Mock from "mockjs"
 
const Users = [];
for (let i=0; i<10; i++){
    Users.push(Mock.mock({
        id: Mock.Random.integer(60, 100),
        personAge: Mock.Random.integer(10, 50),
        personName: '@cname',  // 中文名称
        creationTime: '@date("yyyy-MM-dd")',  // 日期
        personTel: /^1[385][1-9]\d{8}/,
        personSex: '@string("男女",1)',
    }))
}
 
export {Users}