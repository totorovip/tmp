解决git bash显示中文乱码
====
* 查看log中文乱码  
  如图设置git bash，查看log中文乱码解决  
  ![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/修改gitbash中文乱码-1.png)
* git status 时看到modifier的中文文件名乱码如图  
  ![](https://raw.githubusercontent.com/fengshadu/xx/master/imgs/modifier.png)  
  ## 解決方法
  * 1、打开\etc\inputrc文件中对应的行，查找以下2行，并修改其值  
    原來  
    ```css
    set output-meta off  
	set convert-meta on
	```  
	 改成  
	 ```css
	  set output-meta on  
	  set convert-meta off
	  ```
  * 2、git bash 输入git config --global core.quotepath false  
  git 默认中文文件名是 \xxx\xxx 等八进制形式 
  　　是因为 对0x80以上的字符进行quote 
  　　只需要 
  　　git config –global core.quotepath false 
  　　core.quotepath设为false的话，就不会对0x80以上的字符进行quote。中文显示正常  

