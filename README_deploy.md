
# 部署方式

利用pm2部署

下面一行进行新建

`pm2 deploy ecosystem.config.js production setup`

平常开发中在git bash中运行下面的命令即可进行部署

`pm2 deploy ecosystem.config.js production`

由于没有上传public，需要手动在服务器上hexo g和上传静态文件到GitHub pages上







