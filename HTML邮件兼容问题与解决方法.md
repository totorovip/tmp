##### 参考来源：https://segmentfault.com/a/1190000008864116  
HTML 邮件兼容问题与解决方案
=====
HTML 邮件内容虽然也是HTML，但是和我们再网页上直接使用 HTML不同，因为安全原因，各大邮箱服务商及邮件客户端都会对邮件内容进行一定程度的安全性过滤，最后当你收到邮件的时候回发现并不是按照你写的原本HTML展示。  
OutLook一定要测试，因为被称为最难啃的骨头，兼容了OutLook，其他邮箱客户端基本都不会有什么问题。  
## 那怎么书写HTM Email页面呢？  
基本规则
----
### 布局使用 `table`  
* google发给用户找回密码的HTML Email页面就是使用纯table布局，这几乎是HTMl 邮件和普通HTML 页面最大的区别，因为各个邮箱对`div+css`这一套布局的解析问题很大，（如`float / postion`等css可能会被过滤，都不起作用），所以老式布局table是上乘之选。这就意味着HTML 邮件中几乎只有这几元素——`table / tr / td / span / img / a`，尽量避免使用`div / p`或是其他标签。包括`margin / padding`都是使用td去撑开来的。eg：可以通过谷歌忘记登录密码，让谷歌给自己的QQ邮箱发一封邮件，查看谷歌的HTML Email是怎么编写的。  
* 并不是所有的邮箱都支持 `colspan / rowspan` 属性，所以所有的布局都需要使用`table`嵌套解决。  
* 使用表格布局导致最直接的问题就是会产生多余的空白像素，所以要设置一下内容  
```css
<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
    <!-- ... -->
</table>
```  

### `body` 外的内容几乎没用   
-----  
我们知道完整的HTML 包括 Doctype声明、html和head标签，对于在一个 `iframe`中显示邮件内容的邮箱还好，会保留上述结构，但是有一些邮件（如gmail）都是在div中直接包含，这就对安全性要求极为苛刻。安全原因邮箱会默认将上述结构做删除处理，所以写了等于没写。尽可能地，把内容写到`body`内，甚至建议从 `table`开写，直接放弃 `Doctype / html / head / body`标签。  
### 使用内联样式
-----  
只要是HTML页面，就离不开CSS，谁让他们形影不离呢？上面已经说了HTML邮件不支持外部的文件，只有图片是唯一可以引用的外部资源。那style文件就不要想了。那么样式写在`<style></style>`,但是，上面也已经说了额，有一些邮箱会把style标签也删了，这意味着只有内联的style属性内的CSS才是唯一可靠的样式信息。  
### 能用属性就不要使用样式
----
这一点也是可以从谷歌发给用户的邮件可以看出。  
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/emai_gmail_pad.png)  
并不是使用`style`属性就保险，很多邮箱会对特定标签的属性做强制改造  
比如在OutLook中，图片使用以下方式来设置狂傲是无效的：  
```CSS
<img style="width: 10px; height: 10px;" src="*.png" />
```  
正确的设置方法：  
```CSS
<img width="10" height="10" src="*.png" />
```
所以在有属性能够实现样式效果的时候尽量使用属性，常见的可用属性与：  
```CSS
width
height
bgcolor
align
valign
……
```  
### 所有的样式单独指定   
-----  

CSS的继承性让我们写少很多代码，但是到了HTML邮件，一切都要say no！  
大部分集成规则依旧有效，但是大部分邮件都无法完整继承样式，并且邮箱的默认样式总会谁让我们头疼。举个栗子：OutLook中若想改变字体，至少每个table都要指定font-family，而在QQ邮箱甚至每个td都设置`font-family`才能全部生效。   

图片相关
----  
### 指定`width`和`height`属性  
----
这样就算某些邮箱的图片不是默认不加载的话，也不至于HTML页面样子不会改变，能保持良好的大小结构。加上`alt`更可以明确的告知图片的内容让用户选择是否下载他们。  
重要的事情说三遍，`width`和`height`属性一定不要加上单位！不要加上单位！不要加上单位!  
因为加上单位某些版本的OutLook无法正确识别。导致图片显示宽高并非我们设置的。  
这样子写  
```CSS
<img width="10" height="10" src="*.png" />
```
### `margin` 与`padding`  
----
OutLook2007-2013不支持图片的margin和padding样式，必要的时候可以尝试`hspace`和`vspce`属性：  
```CSS
<img vspace="10" hspace="10" src="*.png" />
```  
文字相关  
----
### 字体
----  
只支持系统字体，不支持自定义字体，也不支持font简写，color也尽可能不使用简写：  
```CSS
font: 12px / 14px Arial, sans-serif; 
color: #999;  
需要改成：  
line-height: 14px; 
font-size: 12px; 
font-family: "微软雅黑", Arial, sans-serif; 
color: #999999;
```  
坚持一个原则：能用HTML标签和属性解决的样式决不能使用CSS样式，要加粗字体，可以使用`b`标签，不适用`font-weight`。   
### 行高  
-----   
使用mso-line-height-rule属性，只在块元素上有效！！！OutLook中会有一个默认的行高最小值，特别是当设置 `font-family` 为微软雅黑时，默认的行高差不多为 Word 中的两倍行距，如果 line-height 设置的值小于默认的行高，无论你设置的是多少，则始终使用默认值，在很多情况下这是不能忍的，好在有个神奇的 `mso-line-height-rule`，使用行高时添加 `mso-line-height-rule:exactly`; 就能使行高始终等于我们所设置的值。      
兼容性问题  
----  
总结出来的兼容性问题有：  
* 样式使用内联，outlook中会去掉模板头中style中的样式
* 布局使用table，因为outlook中会将div转换为内联样式
* 比如要实现一块内容居中的效果，需要外层套一个宽度100%的table，里面放一个固定宽度的table，居中展示
```CSS
<table border="1" cellpadding="0" cellspacing="0" width="100%">
  <tr>
  <td>
  <table align="center" border="1" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
  <tr>
  　　<td> Row 1 </td>
  　</tr>
  　<tr>
  　　<td> Row 2 </td>
  　</tr>
  　<tr>
  　　<td> Row 3 </td>
  　</tr>
  </table>
  </td>
　</tr>
</table>
```  
* 设置图片的alt属性，因为一些客户端安全限制并不会默认加载图片
* 优先使用标签的属性功能，其次使用style样式来控制
* 尽量使用padding来控制边距，padding尽量使用分开写的方式（padding-top:2px;），否则某些客户端可能无效，margin并不是总有效
* 邮件中不能隐藏了内容，所以有多余的内容时，需要在填入邮件前处理掉 比如显示一行文本，如果文本过多，导致的结果就是换行，可能会影响到整理的页面布局
* 转码问题 内容填充到邮件，不需要做html编码。因为邮件模版程序在生成内容时为防止xss会做一次转码。


