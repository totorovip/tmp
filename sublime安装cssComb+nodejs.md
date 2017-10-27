【学习笔记】sublime text3的CssComb的安装/配置方法以及报错解决方法/消除空行方法
=====
操作环境：windows7 64位
sublime使用cssComb需要Nodejs的支持。所以先安装nodejs的开发环境  
一、安装nodejs的开发环境
-----
* 1、到[官网](http://nodejs.org/)下载nodejs的安装包，安装在除c盘的任意盘。（因为我的c盘已经快没空间了，我装在D盘，安装后如图：）  
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/node_install_path.png)
* 安装后会把安装目录添加到环境变量
* 安装完成后，测试是否安装成功。打开命令行，输入下面的命令，如果能得到版本号，安装成功。
```cmd
node -v
npm -v 或者npm -version
```
这样就说明安装成功。  
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/node_version.png)
ps: 现在的nodejs已经集成了npm了，所以npm是无需再手动安装的，所以上面在安装好nodejs之后，在命令行可以查看npm的版本号。  
* 如果在命令行输入命令提示无效的话，就把nodejs的安装路径写入path环境变量中。  
> 可以在命令行输入set 查看当前的变量设置。
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/node_evt.png)
这样是安装好了默认写入path环境变量  

二、在Sublime Text3安装nodejs插件  
----
[nodejs插件下载地址](https://github.com/tanepiper/SublimeText-Nodejs)  
* 1. 直接下载压缩包后解压，重命名为nodejs,放到到sublime text的package目录中。 
  (菜单栏中的Preferences-->浏览程序包Browse Packages直接打开package目录。)
* 2. 修改编译选项，在../data/package目录下的nodejs目录中
   打开Nodejs.sublime-build
把原始内容修改成如下图，nodejs就按照你的路径来：
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/sublime_build.png)
上面修改的有三个地方，两个是修改nodejs的安装路径，一个是修改编码的方式，我们项目是此阿勇utf8，我就直接修改成utf8
* 3、Preferences-->插件设置-->nodejs-->setting-defalut
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/nodejs_setting_default.png)
* 测试：新建一个test.js文件，输入 console.log('Hello Node.js');
    按快捷键 `Ctrl + B` 运行，成功输出！  

三、安装CssComb  
----
* 载[CssComb](https://github.com/csscomb/sublime-csscomb)插件
* 把zip文件重命名为CssComb.sublime-package 放到installed package文件夹里Ctrl+shift+P，安装package control：install package，搜索CssComb进行安装

四、配置CssComb
----
* 配置环境，更改path。
  > 打开Preferences-->插件设置-->CssComb-->setting-defalut
* 去nodejs的安装目录找到bin的位置，复制路径放上去
![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/csscomb_setting_node_path.png)  
这样就安装完成了。打开一个css文件，快捷键ctrl+shift+C 感受一下。如果属性重排了，说明大功告成，如果是满满的恶意，呃呃呃，可能遇到下面我也遇到的坑。 

五、按照网上的方法安装好CssComb后，遇到的几个坑  
-----
* 排序下来出现空白行
 > 产生空行的原因是，CssComb的配置文件中sortOrder导致的，因为配置文件会把各种类型的属性划分成一个分类，例如显示属性、自身属性、文本属性等等划分。在重新排序后，不同类型的属性之间会产生一个空行。洁癖的你可能受不了，要删除吧。有两个方法。  
 * 网上提供的方法是使用CssFormat插件，当你排序后，再使用一下cssFormat插件，这样空行啥的就消失了  
   点击导航栏中的edit->cssFormat->expanded  
   ![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/cssformat.png)
* 如果使用快捷键的时候只选中属性，不选中className  
我这里只选中test{}里面的属性，排序后如下
 > ```css
		 .form-lines {
		    background-color: #FFF;
		    font-size: 1.4rem;
		    .test {
		        font-weight: bold;
		display: block;
		font-size: 15px;
		    }
		}
}``` 
这样的排序并没有正确，而且格式错误，.test里面的三个属性没有对齐。然后我换种方式，把className也选中，就可以了。排序后的代码是这样的。  
> ```css
.form-lines {
    font-size: 1.4rem;
    background-color: #fff;
    .test {
        display: block;
        font-size: 15px;
        font-weight: bold;
    }
}
```
这样的排序看起来就舒服很多了。  

六、贴一下我cssComb配置。
----
官网提供了在线配置的方式。你选完你的配置后，会生成一个json文件，你保存下载，再覆盖到之前修改的配置文件，就好。[在线配置地址](http://csscomb.com/config)  
我的配置文件【路径：Preferences->Package Setting->CssComb->setting Default】  
```json
{
    // If plugin has trouble finding Node.js, replace this string with path
    // to your `node` bin
    "node-path" : "D:\\Program Files\\nodejs\\node_modules\\npm\\bin",

    // Full list of supported options and acceptable values can be found here:
    // https://github.com/csscomb/csscomb.js/blob/master/doc/options.md
    "config": {

        // Whether to add a semicolon after the last value/mixin.
        "always-semicolon": true,

        // Set indent for code inside blocks, including media queries and nested rules.
        "block-indent": 4,

        // Unify case of hexadecimal colors.
        "color-case": "lower",

        // Whether to expand hexadecimal colors or use shorthands.
        "color-shorthand": true,

        // Unify case of element selectors.
        "element-case": "lower",

        // Add/remove line break at EOF.
        "eof-newline": true,

        // Add/remove leading zero in dimensions.
        "leading-zero": false,

        // Unify quotes style.
        "quotes": "double",

        // Remove all rulesets that contain nothing but spaces.
        "remove-empty-rulesets": true,

        // Set space after `:` in declarations.
        "space-after-colon": " ",

        // Set space after combinator (for example, in selectors like `p > a`).
        "space-after-combinator": " ",

        // Set space after `{`.
        "space-after-opening-brace": "\n",

        // Set space after selector delimiter.
        "space-after-selector-delimiter": "\n",

        // Set space before `}`.
        "space-before-closing-brace": "\n",

        // Set space before `:` in declarations.
        "space-before-colon": "",

        // Set space before combinator (for example, in selectors like `p > a`).
        "space-before-combinator": " ",

        // Set space before `{`.
        "space-before-opening-brace": " ",

        // Set space before selector delimiter.
        "space-before-selector-delimiter": "",

        // Set space between declarations (i.e. `color: tomato`).
        "space-between-declarations": "\n",

        // Whether to trim trailing spaces.
        "strip-spaces": true,

        // Whether to remove units in zero-valued dimensions.
        "unitless-zero": true,

        // Whether to align prefixes in properties and values.
        "vendor-prefix-align": true,

        "tab-size": true,
        "unitless-zero": true,
        "vendor-prefix-align": true,
        // Sort properties in particular order.
        "sort-order": [
             [
                "display",
                "visibility",
                "float",
                "clear",
                "overflow",
                "overflow-x",
                "overflow-y",
                "clip",
                "zoom",
                "table-layout",
                "empty-cells",
                "caption-side",
                "border-spacing",
                "border-collapse",
                "list-style",
                "list-style-position",
                "list-style-type",
                "list-style-image",
                "-webkit-box-orient",
                "-webkit-box-direction",
                "-webkit-box-decoration-break",
                "-webkit-box-pack",
                "-webkit-box-align",
                "-webkit-box-flex",
                "position",
                "top",
                "right",
                "bottom",
                "left",
                "z-index",
                "margin",
                "margin-top",
                "margin-right",
                "margin-bottom",
                "margin-left",
                "-webkit-box-sizing",
                "-moz-box-sizing",
                "box-sizing",
                "border",
                "border-width",
                "border-style",
                "border-color",
                "border-top",
                "border-top-width",
                "border-top-style",
                "border-top-color",
                "border-right",
                "border-right-width",
                "border-right-style",
                "border-right-color",
                "border-bottom",
                "border-bottom-width",
                "border-bottom-style",
                "border-bottom-color",
                "border-left",
                "border-left-width",
                "border-left-style",
                "border-left-color",
                "-webkit-border-radius",
                "-moz-border-radius",
                "border-radius",
                "-webkit-border-top-left-radius",
                "-moz-border-radius-topleft",
                "border-top-left-radius",
                "-webkit-border-top-right-radius",
                "-moz-border-radius-topright",
                "border-top-right-radius",
                "-webkit-border-bottom-right-radius",
                "-moz-border-radius-bottomright",
                "border-bottom-right-radius",
                "-webkit-border-bottom-left-radius",
                "-moz-border-radius-bottomleft",
                "border-bottom-left-radius",
                "-webkit-border-image",
                "-moz-border-image",
                "-o-border-image",
                "border-image",
                "-webkit-border-image-source",
                "-moz-border-image-source",
                "-o-border-image-source",
                "border-image-source",
                "-webkit-border-image-slice",
                "-moz-border-image-slice",
                "-o-border-image-slice",
                "border-image-slice",
                "-webkit-border-image-width",
                "-moz-border-image-width",
                "-o-border-image-width",
                "border-image-width",
                "-webkit-border-image-outset",
                "-moz-border-image-outset",
                "-o-border-image-outset",
                "border-image-outset",
                "-webkit-border-image-repeat",
                "-moz-border-image-repeat",
                "-o-border-image-repeat",
                "border-image-repeat",
                "padding",
                "padding-top",
                "padding-right",
                "padding-bottom",
                "padding-left",
                "width",
                "min-width",
                "max-width",
                "height",
                "min-height",
                "max-height",
                "font",
                "font-family",
                "font-size",
                "font-weight",
                "font-style",
                "font-variant",
                "font-size-adjust",
                "font-stretch",
                "font-effect",
                "font-emphasize",
                "font-emphasize-position",
                "font-emphasize-style",
                "font-smooth",
                "line-height",
                "text-align",
                "-webkit-text-align-last",
                "-moz-text-align-last",
                "-ms-text-align-last",
                "text-align-last",
                "vertical-align",
                "white-space",
                "text-decoration",
                "text-emphasis",
                "text-emphasis-color",
                "text-emphasis-style",
                "text-emphasis-position",
                "text-indent",
                "-ms-text-justify",
                "text-justify",
                "letter-spacing",
                "word-spacing",
                "-ms-writing-mode",
                "text-outline",
                "text-transform",
                "text-wrap",
                "-ms-text-overflow",
                "text-overflow",
                "text-overflow-ellipsis",
                "text-overflow-mode",
                "-ms-word-wrap",
                "word-wrap",
                "-ms-word-break",
                "word-break",
                "color",
                "background",
                "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
                "background-color",
                "background-image",
                "background-repeat",
                "background-attachment",
                "background-position",
                "-ms-background-position-x",
                "background-position-x",
                "-ms-background-position-y",
                "background-position-y",
                "-webkit-background-clip",
                "-moz-background-clip",
                "background-clip",
                "background-origin",
                "-webkit-background-size",
                "-moz-background-size",
                "-o-background-size",
                "background-size",
                "outline",
                "outline-width",
                "outline-style",
                "outline-color",
                "outline-offset",
                "opacity",
                "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity",
                "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
                "-ms-interpolation-mode",
                "-webkit-box-shadow",
                "-moz-box-shadow",
                "box-shadow",
                "filter:progid:DXImageTransform.Microsoft.gradient",
                "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
                "text-shadow",
                "-webkit-transition",
                "-moz-transition",
                "-ms-transition",
                "-o-transition",
                "transition",
                "-webkit-transition-delay",
                "-moz-transition-delay",
                "-ms-transition-delay",
                "-o-transition-delay",
                "transition-delay",
                "-webkit-transition-timing-function",
                "-moz-transition-timing-function",
                "-ms-transition-timing-function",
                "-o-transition-timing-function",
                "transition-timing-function",
                "-webkit-transition-duration",
                "-moz-transition-duration",
                "-ms-transition-duration",
                "-o-transition-duration",
                "transition-duration",
                "-webkit-transition-property",
                "-moz-transition-property",
                "-ms-transition-property",
                "-o-transition-property",
                "transition-property",
                "-webkit-transform",
                "-moz-transform",
                "-ms-transform",
                "-o-transform",
                "transform",
                "-webkit-transform-origin",
                "-moz-transform-origin",
                "-ms-transform-origin",
                "-o-transform-origin",
                "transform-origin",
                "-webkit-animation",
                "-moz-animation",
                "-ms-animation",
                "-o-animation",
                "animation",
                "-webkit-animation-name",
                "-moz-animation-name",
                "-ms-animation-name",
                "-o-animation-name",
                "animation-name",
                "-webkit-animation-duration",
                "-moz-animation-duration",
                "-ms-animation-duration",
                "-o-animation-duration",
                "animation-duration",
                "-webkit-animation-play-state",
                "-moz-animation-play-state",
                "-ms-animation-play-state",
                "-o-animation-play-state",
                "animation-play-state",
                "-webkit-animation-timing-function",
                "-moz-animation-timing-function",
                "-ms-animation-timing-function",
                "-o-animation-timing-function",
                "animation-timing-function",
                "-webkit-animation-delay",
                "-moz-animation-delay",
                "-ms-animation-delay",
                "-o-animation-delay",
                "animation-delay",
                "-webkit-animation-iteration-count",
                "-moz-animation-iteration-count",
                "-ms-animation-iteration-count",
                "-o-animation-iteration-count",
                "animation-iteration-count",
                "-webkit-animation-direction",
                "-moz-animation-direction",
                "-ms-animation-direction",
                "-o-animation-direction",
                "animation-direction",
                "content",
                "quotes",
                "counter-reset",
                "counter-increment",
                "resize",
                "cursor",
                "-webkit-user-select",
                "-moz-user-select",
                "-ms-user-select",
                "user-select",
                "nav-index",
                "nav-up",
                "nav-right",
                "nav-down",
                "nav-left",
                "-moz-tab-size",
                "-o-tab-size",
                "tab-size",
                "-webkit-hyphens",
                "-moz-hyphens",
                "hyphens",
                "pointer-events"
            ]
        ],
    }
}
```
我这里的属性排序是按照AlloyTeam推荐的排序，不同的是，我把所有的属性放在一个[]里，这样的好处就是不同的属性再也不会出现空行。因为我偷懒，不想再去操作一下cssFormat。现在已经顺利用上cssComb。 
网上找到翻译版的cssComb的配置文件。  
```json
{
    // If plugin has trouble finding Node.js, replace this string with path
    // to your `node` bin
    "node-path" : ":/usr/local/bin",

    // Full list of supported options and acceptable values can be found here:
    // https://github.com/csscomb/csscomb.js/blob/master/doc/options.md
    "config": {

        // Whether to add a semicolon after the last value/mixin.
        // 最一个class类里最后一个属性追加一个“;”
        // 可选值(开启)、false(关闭) 默认值为true
        "always-semicolon": true,

        // Set indent for code inside blocks, including media queries and nested rules.
        // 使媒体查询（media queries）以及嵌套的代码块有规律地缩进。
        // 可选值：{Number} （数字类型）- 空格数量
        //         {String} （字符串类型）- 字符串关键字：空格或者跳格，注意这里不允许换行，
        // 默认值为 {"block-indent": "    "}
        "block-indent": 4,

        // Unify case of hexadecimal colors.
        // 统一16进制颜色代码中字母的大小写
        // 可选值：lower(小写)、upper(大写) 默认值为lower
        "color-case": "upper",

        // Whether to expand hexadecimal colors or use shorthands.
        // 是否开启十六进制的颜色代码简写
        // 可选值(开启)、false(关闭) 默认值为true
        "color-shorthand": true,

        // Unify case of element selectors.
        // 统一标签选择器HTML标签元素大小写
        // 可选值：lower(小写)、upper(大写) 默认值为lower
        "element-case": "lower",

        // Add/remove line break at EOF.
        // 在行末添加或者删除换行(即光标换行)
        // 可选值：true(设置换行)、false(删除换行) 默认值为true
        "eof-newline": false,

        // Add/remove leading zero in dimensions.
        // 添加或删除大小单位前的零
        // 可选值：true(添加0)、false(删除0) 默认值为false
        "leading-zero": true,

        // Unify quotes style.
        // 统一引号格式（单双引号）
        // 可选值：single(单引号)、double(双引号) 默认值为single
        "quotes": "double",

        // Remove all rulesets that contain nothing but spaces.
        // 去除无用，没样式的，空间的CSS规则
        // 可选值：true
        "remove-empty-rulesets": true,

        // Set space after `:` in declarations.
        // 冒号(:)后是否加空格
        // 可选值：{Number} （数字类型）- 空格数量
        //         {String} （字符串类型）- 字符串关键字，跳格或者换行符（\n）
        // 默认值：{"space-after-colon": " "}
        // 示例：{ "space-after-colon": "" }
        //       { "space-after-colon": 1 }
        "space-after-colon": " ",

        // Set space after combinator (for example, in selectors like `p > a`).
        // CSS样式组合器之间是否加空格
        // 可选值：{Number} （数字类型）- 空格的数量
        //         {String} （字符串类型）- 跳格或者换行符（\n）
        // 默认值：{"space-after-combinator": " "}
        //         { "space-after-combinator": "\n " }
        // 示例：{ "space-after-combinator": 1 }
        "space-after-combinator": " ",

        // Set space after `{`.
        // 在{之后添加空格
        // 可选值：{Number} （数字类型）- 空格的数量
        //         {String}（字符串类型） - 字符串关键字，空格，跳格，换行符（\n）
        // 默认值：{"space-after-opening-brace": "\n"}
        // 示例：{ "space-after-opening-brace": 1 }
        "space-after-opening-brace": "\n",

        // Set space after selector delimiter.
        // 在选择器分隔符(,)之后添加空格
        // 可选值：{Number} （数字类型）- 空格的数量
        //          {String}（字符串类型） - 字符串关键字，空格，跳格，换行符（\n）
        // 默认值：{"space-before-selector-delimiter": ""}
        // 示例：{ "space-before-selector-delimiter": 0 }
        //       { "space-before-selector-delimiter": "\n" }
        "space-after-selector-delimiter": " ",

        // Set space before `}`.
        "space-before-closing-brace": "\n",

        // Set space before `:` in declarations.
        "space-before-colon": "",

        // Set space before combinator (for example, in selectors like `p > a`).
        "space-before-combinator": " ",

        // Set space before `{`.
        // 在{之前添加空格
        // 可选值：{Number} （数字类型）- 空格的数量
        //         {String}（字符串类型） - 字符串关键字，空格，跳格，换行符（\n）
        // 默认值：{"space-before-opening-brace": "\n"}
        // 示例：{ "space-before-opening-brace": 1 }
        "space-before-opening-brace": " ",

        // Set space before selector delimiter.
        // 在选择器分隔符(,)之前添加空格
        // 可选值：{Number} （数字类型）- 空格的数量
        //          {String}（字符串类型） - 字符串关键字，空格，跳格，换行符（\n）
        // 默认值：{"space-before-selector-delimiter": ""}
        // 示例：{ "space-before-selector-delimiter": 0 }
        //       { "space-before-selector-delimiter": "\n" }
        "space-before-selector-delimiter": "",

        // Set space between declarations (i.e. `color: tomato`).
        // 声明间设置空格
        // 可选值：{Number} （数字类型）- 空格的数量
        //         {String}（字符串类型） - 字符串关键字，空格，跳格，换行符（\n）
        // 默认值：{"space-between-declarations": "\n"}
        // 示例：{ "space-between-declarations": 1 }
        //       { "space-between-declarations": "\n " }
        "space-between-declarations": "\n",

        // Whether to trim trailing spaces.
        // 去掉行末多余的制格符
        // 可选值：true 默认值为true
        "strip-spaces": true,

        // 跳格的大小
        // 可选值：{Number} （数字类型）- 空格的数量
        // 示例：{ "tab-size": 2 }
        // "tab-size": 2,

        // template
        // 可选值：{String} - .css文件的路径
        // 示例：{ "template": "example.css" }

        // Whether to remove units in zero-valued dimensions.
        // 是否去掉数值为0的单位(如0px)。
        // 可选值：true 默认值为true
        // 示例：{ "unitless-zero": true }
        "unitless-zero": true,

        // Whether to align prefixes in properties and values.
        // 前缀是否对齐
        // 可选值：true 默认值为true
        // 示例：{ "vendor-prefix-align": true }
        "vendor-prefix-align": true,

        // Sort properties in particular order.
        // 设置属性顺序
        // 可选值：{Array} - 数值
        //         {Array} - 二维数组
        // 例子如下：
        // { "sort-order": [ "margin", "padding" ] }
        // { "sort-order": [ [ "margin", "padding" ], [ "border", "background" ] ] }
        // 在*.Scss或者*.LESS中使用时，你可以用下面的三种配置中的一种，或更多
        // $variable变量声明，如：$var in Sass or @var in LESS
        // $include引入多态，如：@include ... and @extend ... in Sass or .mixin() in LESS
        // $import@import规则
        // { "sort-order": [ [ "$variable" ], [ "$include" ], [ "top", "padding" ] ] }
        // 当Sass文件或者LESS文件里存在属性时，sort-option默认会把这些属性以一个新组放到已经排序属性的最后面。
        // 你可以通过用...（剩余的）来重写这些属性，以达到放到指定位置的目的。
        // { "sort-order": [ [ "$variable" ], [ "position" ], [ "..." , "border" ], [ "$include" ],[ "font" ] ] }  所有的属性都会分到五个组中的其中一个，变量组，position组，border+剩余的组，include组，font组。
        // 以下参照腾讯AlloyTeam推荐的属性的顺序
        "sort-order": [
             [
                "display",
                "visibility",
                "float",
                "clear",
                "overflow",
                "overflow-x",
                "overflow-y",
                "clip",
                "zoom"
            ],
            [
                "table-layout",
                "empty-cells",
                "caption-side",
                "border-spacing",
                "border-collapse",
                "list-style",
                "list-style-position",
                "list-style-type",
                "list-style-image"
            ],
            [
                "-webkit-box-orient",
                "-webkit-box-direction",
                "-webkit-box-decoration-break",
                "-webkit-box-pack",
                "-webkit-box-align",
                "-webkit-box-flex"
            ],
            [
                "position",
                "top",
                "right",
                "bottom",
                "left",
                "z-index"
            ],
            [
                "margin",
                "margin-top",
                "margin-right",
                "margin-bottom",
                "margin-left",
                "-webkit-box-sizing",
                "-moz-box-sizing",
                "box-sizing",
                "border",
                "border-width",
                "border-style",
                "border-color",
                "border-top",
                "border-top-width",
                "border-top-style",
                "border-top-color",
                "border-right",
                "border-right-width",
                "border-right-style",
                "border-right-color",
                "border-bottom",
                "border-bottom-width",
                "border-bottom-style",
                "border-bottom-color",
                "border-left",
                "border-left-width",
                "border-left-style",
                "border-left-color",
                "-webkit-border-radius",
                "-moz-border-radius",
                "border-radius",
                "-webkit-border-top-left-radius",
                "-moz-border-radius-topleft",
                "border-top-left-radius",
                "-webkit-border-top-right-radius",
                "-moz-border-radius-topright",
                "border-top-right-radius",
                "-webkit-border-bottom-right-radius",
                "-moz-border-radius-bottomright",
                "border-bottom-right-radius",
                "-webkit-border-bottom-left-radius",
                "-moz-border-radius-bottomleft",
                "border-bottom-left-radius",
                "-webkit-border-image",
                "-moz-border-image",
                "-o-border-image",
                "border-image",
                "-webkit-border-image-source",
                "-moz-border-image-source",
                "-o-border-image-source",
                "border-image-source",
                "-webkit-border-image-slice",
                "-moz-border-image-slice",
                "-o-border-image-slice",
                "border-image-slice",
                "-webkit-border-image-width",
                "-moz-border-image-width",
                "-o-border-image-width",
                "border-image-width",
                "-webkit-border-image-outset",
                "-moz-border-image-outset",
                "-o-border-image-outset",
                "border-image-outset",
                "-webkit-border-image-repeat",
                "-moz-border-image-repeat",
                "-o-border-image-repeat",
                "border-image-repeat",
                "padding",
                "padding-top",
                "padding-right",
                "padding-bottom",
                "padding-left",
                "width",
                "min-width",
                "max-width",
                "height",
                "min-height",
                "max-height"
            ],
            [
                "font",
                "font-family",
                "font-size",
                "font-weight",
                "font-style",
                "font-variant",
                "font-size-adjust",
                "font-stretch",
                "font-effect",
                "font-emphasize",
                "font-emphasize-position",
                "font-emphasize-style",
                "font-smooth",
                "line-height",
                "text-align",
                "-webkit-text-align-last",
                "-moz-text-align-last",
                "-ms-text-align-last",
                "text-align-last",
                "vertical-align",
                "white-space",
                "text-decoration",
                "text-emphasis",
                "text-emphasis-color",
                "text-emphasis-style",
                "text-emphasis-position",
                "text-indent",
                "-ms-text-justify",
                "text-justify",
                "letter-spacing",
                "word-spacing",
                "-ms-writing-mode",
                "text-outline",
                "text-transform",
                "text-wrap",
                "-ms-text-overflow",
                "text-overflow",
                "text-overflow-ellipsis",
                "text-overflow-mode",
                "-ms-word-wrap",
                "word-wrap",
                "-ms-word-break",
                "word-break"
            ],
            [
                "color",
                "background",
                "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader",
                "background-color",
                "background-image",
                "background-repeat",
                "background-attachment",
                "background-position",
                "-ms-background-position-x",
                "background-position-x",
                "-ms-background-position-y",
                "background-position-y",
                "-webkit-background-clip",
                "-moz-background-clip",
                "background-clip",
                "background-origin",
                "-webkit-background-size",
                "-moz-background-size",
                "-o-background-size",
                "background-size"
            ],
            [
                "outline",
                "outline-width",
                "outline-style",
                "outline-color",
                "outline-offset",
                "opacity",
                "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity",
                "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
                "-ms-interpolation-mode",
                "-webkit-box-shadow",
                "-moz-box-shadow",
                "box-shadow",
                "filter:progid:DXImageTransform.Microsoft.gradient",
                "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
                "text-shadow"
            ],
            [
                "-webkit-transition",
                "-moz-transition",
                "-ms-transition",
                "-o-transition",
                "transition",
                "-webkit-transition-delay",
                "-moz-transition-delay",
                "-ms-transition-delay",
                "-o-transition-delay",
                "transition-delay",
                "-webkit-transition-timing-function",
                "-moz-transition-timing-function",
                "-ms-transition-timing-function",
                "-o-transition-timing-function",
                "transition-timing-function",
                "-webkit-transition-duration",
                "-moz-transition-duration",
                "-ms-transition-duration",
                "-o-transition-duration",
                "transition-duration",
                "-webkit-transition-property",
                "-moz-transition-property",
                "-ms-transition-property",
                "-o-transition-property",
                "transition-property",
                "-webkit-transform",
                "-moz-transform",
                "-ms-transform",
                "-o-transform",
                "transform",
                "-webkit-transform-origin",
                "-moz-transform-origin",
                "-ms-transform-origin",
                "-o-transform-origin",
                "transform-origin",
                "-webkit-animation",
                "-moz-animation",
                "-ms-animation",
                "-o-animation",
                "animation",
                "-webkit-animation-name",
                "-moz-animation-name",
                "-ms-animation-name",
                "-o-animation-name",
                "animation-name",
                "-webkit-animation-duration",
                "-moz-animation-duration",
                "-ms-animation-duration",
                "-o-animation-duration",
                "animation-duration",
                "-webkit-animation-play-state",
                "-moz-animation-play-state",
                "-ms-animation-play-state",
                "-o-animation-play-state",
                "animation-play-state",
                "-webkit-animation-timing-function",
                "-moz-animation-timing-function",
                "-ms-animation-timing-function",
                "-o-animation-timing-function",
                "animation-timing-function",
                "-webkit-animation-delay",
                "-moz-animation-delay",
                "-ms-animation-delay",
                "-o-animation-delay",
                "animation-delay",
                "-webkit-animation-iteration-count",
                "-moz-animation-iteration-count",
                "-ms-animation-iteration-count",
                "-o-animation-iteration-count",
                "animation-iteration-count",
                "-webkit-animation-direction",
                "-moz-animation-direction",
                "-ms-animation-direction",
                "-o-animation-direction",
                "animation-direction"
            ],
            [
                "content",
                "quotes",
                "counter-reset",
                "counter-increment",
                "resize",
                "cursor",
                "-webkit-user-select",
                "-moz-user-select",
                "-ms-user-select",
                "user-select",
                "nav-index",
                "nav-up",
                "nav-right",
                "nav-down",
                "nav-left",
                "-moz-tab-size",
                "-o-tab-size",
                "tab-size",
                "-webkit-hyphens",
                "-moz-hyphens",
                "hyphens",
                "pointer-events"
            ]
        ],
        // 除了sort-order 属性排序方式以外的属性排序方式。
        // 注意：这个配置只有在配置了sort-order后才会有效果的。
        // 可选值：abc - 根据字母表来排序
        // { "sort-order-fallback": "abc", "sort-order": ["top"] }
        // { "sort-order-fallback": "abc", "sort-order": ["..."] }
        // 不建议使用该配置项
        // "sort-order-fallback": "abc",
        // "sort-order": ["..."]
    }
}
``` 
个人学习笔记，不对的地方请多指正，谢谢你
