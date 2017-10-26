https://segmentfault.com/a/119000001044833
nodejs全局安装和本地安装的区别
####
```css
1、全局安装
$ npm install gulp --global

2、作为项目的开发一开(devDependencies)安装
$ npm install gulp --save-dev
```
### 全局安装
* 安装位置  
  全局安装命令区别是-g 或者是--global。安装到全局环境中，包安装在Node安装目录下的node_modules文件夹中，一般是在Users用户名AppDataRoaming目录下。  
  查看全局安装目录命令 npm root -g  
  如图：  
  ![https://raw.githubusercontent.com/fengshadu/xx/master/imgs/node_path.png]  
  全局安装后的可以在命令后使用命令，如全局安装的tnpm命令  
  ![https://raw.githubusercontent.com/fengshadu/xx/master/imgs/node_global.png] 
  ![xx/imgs/node_dev.png]
 * 调用方式  
 	命令行下直接调用 
### 本地安装  
* 安装位置  
  ```css
  npm install gulp 或 npm install gulp --save-dev
  ```
  --save-dev的含义是把安装包的信息写入package.json文件的devDependencies字段，包安装在指定在node_module中。  
  例如我这个项目的package.json文件里有这些模块  
  ![https://raw.githubusercontent.com/fengshadu/xx/master/imgs/node_dev_json.png]  
  ![https://raw.githubusercontent.com/fengshadu/xx/master/imgs/node_dev.png]  
* 调用方式
  本地安装后，通过require()引入项目中node_modules目录下的模块。例如：  
  ![https://raw.githubusercontent.com/fengshadu/xx/master/imgs/node_gulpfile.png]  
##### 默认下node.js会在NODE_PATH和目前js所在项目下的node_modules文件夹下去寻找模块  
##### 每个项目独立安装，这样方便整个项目的复制到不同的开发机，不用安装多次。
<img src="https://raw.githubusercontent.com/fengshadu/src/master/imgs/test.png">

