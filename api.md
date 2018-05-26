需要设计的API接口
1. /user/save，注册用户和登陆
```javascript
method：post
param: {
username: "",
password: ""//经过加密的
}
return: 
//成功登陆后，将会设置cookies，uid=id
success : {
id: 1,
username: "",
password: "",
}
error: {
username: " ",
password: " ",
error: 1
}
```
2. /category/getConsume，获取本月的消费记录
```javascript
method: get
param: {
uid: xxx
}
return: 
success: {
monthConsume: 本月总消费
//buget: 本月预算
}
error: {
error: 1
}
```
3. /config/getBuget, 获取改用户没有的预算
```
method: get
param: {
uid: xx
}
return:
success: {
buget: xxx
}
error: {
error: 1
}
```
4. /record/getMonthRecord, 获取用户本月的消费记录
```
method: get
param: {
uid: xxx
}
return:
success: [
{
uid: xxx
date: 1,//这个月每一天的日期，按1到x顺序排列
consume: 100
},
{
uid: xxx
date: 2,
consume: 100
}
]
```
5. /category/save, 存储用户新增的分类

6. /category/getCategory，获取用户所有的分类

7. /record/save, 存储用户的每一笔消费记录


