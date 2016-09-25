	var window_width = 1200;
	var window_height = 500;
	var radius = 8;    //每个小圆半径
	var margin_top = 60;    
	var margin_left = 30;
	
	//const endTime = new Date(2016,3,17,14,54,12);              //定义结束时间     注:月份是从0开始
	
    //	var endTime = new Date();
    //	endTime.setTime(endTime.getTime()+3600000);           //1个小时倒计时
	
	var curShowTimeSeconds = 0;
	
	var balls = [];
	const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC",
					"#99CC00","#669900","#FFBB33","#FF8800",
					"#FF4444","#CC0000"]
	
window.onload = function(){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	canvas.width = window_width;
	canvas.height = window_height;
	
	curShowTimeSeconds = getCurrentShowTimeSeconds();   //得到以秒为单位当前时间
	
	setInterval(function(){
		render(context);
		update();
	},50);   
	
	
}

function update(){   //更新时间
	
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	
	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;
	
	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds = curShowTimeSeconds%60;
	
	if (nextSeconds != curSeconds) {  //next一直在刷新，cur不变，看是否等于，若不等则更新
		
		//分别看每个位数是否有更新，有则添加小球
		if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( margin_left + 0 , margin_top , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( margin_left + 15*(radius+1) , margin_top , parseInt(curHours/10) );
        }
        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( margin_left + 39*(radius+1) , margin_top , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( margin_left + 54*(radius+1) , margin_top , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( margin_left + 78*(radius+1) , margin_top , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( margin_left + 93*(radius+1) , margin_top , parseInt(nextSeconds%10) );
        }
		
		
		curShowTimeSeconds = nextShowTimeSeconds;   
		
	}
	
	updateBalls();   //让小球动起来
	
}

function updateBalls(){
	
	for (var i=0;i<balls.length;i++) {
		 
		 balls[i].x += balls[i].vx;
		 balls[i].y += balls[i].vy;
		 balls[i].vy += balls[i].g;
		 
		 if( balls[i].y >= window_height-radius ){    //碰撞检测
            balls[i].y = window_height-radius;
            balls[i].vy = - balls[i].vy*0.5;
        }
		 
		 
		 
	}
	
	
	//优化 超出边缘小球清除
	var cnt = 0;
	for (var i=0;i<balls.length;i++){
		if (balls[i].x+radius>0&&balls[i].x-radius<window_width) {
			balls[cnt++] = balls[i];
		}
	}
		
	while (balls.length>cnt){
		balls.pop();
	}	
	
	
}


function addBalls(x,y,num){  //添加小球给balls数组
	
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if (digit[num][i][j] == 1) {
				
				var aBall = {    //每个小球的物理模型
					x:x+j*2*(radius+1)+(radius+1),
					y:y+i*2*(radius+1)+(radius+1),
					g:1.5+Math.random(),
					vx:Math.pow( -1, Math.ceil(Math.random()*1000) ) * 4,  //取-4或4
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				
				balls.push(aBall);
				
			}
}

function getCurrentShowTimeSeconds(){
	
	var curTime = new Date();
//	var ret = endTime.getTime()- curTime.getTime();    //倒计时间隔
//	ret = Math.round(ret/1000);
	
	var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();  //获取今天时间并化为秒
	return ret;   //返回赋给curShowTimeSeconds
	
//	return ret >= 0?ret:0;   //返回距离endTime的秒数
	
}

function render(cxt){   //分别呈现每个数字
	
	cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);   //清除更新前残余的
	
	//curShowTimeSeconds单位为秒
	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;
	
	renderDigit( margin_left , margin_top , parseInt(hours/10) , cxt );
	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(hours%10),cxt);
	renderDigit(margin_left+30*(radius+1),margin_top,10,cxt);   //冒号
	renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),cxt);
	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),cxt);
	renderDigit(margin_left+69*(radius+1),margin_top,10,cxt);   //冒号
	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),cxt);
	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),cxt);
	

}

function renderDigit(x,y,num,cxt){    //呈现每个数字中的小圆
	
	cxt.fillStyle = "rgb(0,102,153)";
	
	for(var i=0;i<digit[num].length;i++){      //绘制每个静态小球
		for(var j=0;j<digit[num][i].length;j++){
			if (digit[num][i][j] == 1) {   
				
				cxt.beginPath();
				cxt.arc( x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI );
				cxt.closePath();
				
				cxt.fill();
			}
		}	
	}
	
	
	for( var i = 0 ; i < balls.length ; i ++ ){   //绘制每个掉落小球
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , radius , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
		
}














