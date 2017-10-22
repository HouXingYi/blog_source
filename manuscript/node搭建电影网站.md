
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








1. grunt
    项目中用于重启服务？
    gruntfile    grunt-contrib-watch  grunt-contrib-nodemon//自动重启   


2. 注册登录功能
    密码 ：md5加密
    注册 ：保存账号与密码
    登录 ：与数据库的账号密码进行比对
    保持用户状态  req.session.user = user session就是会话
    cookie是在客户端记录，session是在服务端记录   
    登出即为delete session
    调整目录结构，mvc到app文件夹下
    用户权限管理：user增加role字段，利用中间件进行一步一步校验

3. 评论功能

    跳过 

4. 分类功能

    单独建立一个分类的表，而不是把分类做为电影的一个字段
    
5. 单元测试

    无需




























