<h2>解决git bash显示中文乱码</h2>
<ul>
	<li>
		<p>查看log中文乱码</p>
		<p>如图设置git bash，查看log中文乱码解决</p>
		<img src="https://raw.githubusercontent.com/fengshadu/src/master/imgs/修改gitbash中文乱码-1.png" alt="">
	</li>
	<li>
		<p>git status 时看到modifier的中文文件名乱码如图<img src="https://raw.githubusercontent.com/fengshadu/src/master/imgs/modifier-1.png" alt=""></p>
		<p>解决方法：</p>
		<ul>
			<li>
				<p>1、打开\etc\inputrc文件中对应的行，查找以下2行，并修改其值</p>
				原来<br>
				<code>
					set output-meta off
					set convert-meta on
				</code>
				改成<br>
				<code>
					set output-meta on
					set convert-meta off
				</code>
			</li>
			<li>
				<p>2、git bash 输入git config --global core.quotepath false</p>
			</li>
		</ul>
	</li>
</ul>