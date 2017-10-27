安装Package Control
=====
命令行安装packpage control
-----
第一步调出命令行  
* 方法一：按ctrl+` 调出sublime的命令行  
* 方法二：导航栏-》View-》show console  
第二步输入命令  
###Sublime Text3  
```js
import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```
###Sublime Text 2  
```js
import urllib2,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')
```
[官网链接请点击这里](https://packagecontrol.io/installation)
手动安装
-----
#####可能由于公司网络被墙的原因，无法在命令行安装，就需要通过手动安装。不建议手动安装，不建议不建议！！！（我踩过坑，因为手动安装的不会生成配置文件，这会影响到开发环境，所以下面会有我配置代理的说明）  
* 1.点击 Preferences > Browse Packages 菜单
* 2.进入打开的目录的上层目录，然后再进入 Installed Packages/ 目录
* 3.下载 [Package Control.sublime-package](https://packagecontrol.io/Package%20Control.sublime-package) 并复制到Installed Packages/目录
* 4.重启 Sublime Text。重启后打开看到已经装好了，如图  
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/package_control.png)  
当使用命令行安装却失败提示说目标计算机积极拒绝XXX
------
原因是：那是因为你的sublime被墙了，无法上到package control官网去下载。有些公司是外网是被禁掉的，要上外网需要一些图片，比如要设置访问外网的代理。好叻，现在你浏览器设置了代理之后能访问外面的世界，但是你的sublime还是被挡在这堵墙里，是时候给sublime也设置个代理啦啦~  
### 设置方法如下  
```
打开 Preferences > Package Settings > Package Control > Settings - User 菜单
编辑 Package Control.sublime-settings，添加两行:
"http_proxy": "http://xx.xx.xx.xx:端口",
"https_proxy": "http://xx.xx.xx.xx:端口"  
```
##### 配置文件千万别搞错，如图  
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/sublime_proxy.png)  
设置好代理之后，就可以顺利的在命令行那里安装Package Control了。perfect