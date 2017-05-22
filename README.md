# express-demo
基于node.js的express框架+jade+bootstrap+mysql开发的用户注册登录项目

### 项目运行：

```
 先搭建好mysql数据库环境（可参考项目说明）
 用cmd命令行进入到项目根目录，然后依次输入:
 npm install
 npm start
 在浏览器输入:localhost:3000/login
```

### 说明

##### 如何取判断用户是否在线呢？

没必要去判断在线，项目很小没必要去耗费资源去搞个在线session会话。

在登录成功的时候，直接返回客户端特定的token值，如需要改动数据直接判断token值是否有权限。

客户端可以使用localStorage存入token值

服务端咋办？？！怎么存这个值？

定义全局变量 ==> 这个好像不行，变量会被回收销毁...

##### 如何在前端显示游客可见性的数据？

同上原理

