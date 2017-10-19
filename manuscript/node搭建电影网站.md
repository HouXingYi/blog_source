
# node搭建电影网站


## 一期( 可参考源码 )

注意：并不是采用前后端分离的开发方式，这一期主要学习了mongoose设计api

1. mongodb模式模型设计及编码  （ 学习mongoose ）

mongoose => Schema,Model,Documents
Schema 模式 对数据字段进行定义
Schema。pre（“save”，（）=>{}） //每次在调用save之前调用
Model 模型 对模式进行编译
documents 对模型实例化

new 一个Model 为a   ，   分清模型静态方法与实例化后的方法

a.save方法存入数据库   a.find()查询  .exec()   .remove()删除

mongoose.connect() //连接数据库

## 二期( 可参考源码 )

1. grunt自动重启
2. 注册登录功能
3. 评论功能
4. 电影分类功能
5. 增强后台功能
6. 单页测试





































