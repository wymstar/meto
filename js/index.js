ready(function (){
	var oBox=document.getElementById('box');
	var aLi=oBox.children;
	var oUl=document.getElementById('iphone');
	var zIndex=10;
	//初始化宽高
	int();
	window.onresize=function(){
		int();
	};
	function int(){
		var oWrap=document.getElementById('wrap');
		var height=document.documentElement.clientHeight;
		var width=document.documentElement.clientWidth;
		oWrap.style.width=width+'px';
		oWrap.style.height=height+'px';
		//初始化宽高结束
		//窗口运动
		
		
		for (var i=0; i<aLi.length; i++){
			aLi[i].onclick=function (){	
				var oBottom=getByClass(this, 'bottom')[0];			
				if (this.offsetWidth == width){
					move(this,{width:width/2, height:height/2},{complete:function (){
						oBottom.style.display='none';				
					}});				
				}
				else{
					this.style.zIndex=++zIndex;				
					move(this,{width:width, height:height}, {complete:function (){
						oBottom.style.display='block';					
						time(oBottom);					
					}});				
				}
			};
		}
	};
	
	
	//运动结束
	//选项卡开始
	;(function (){
		var oTab=document.getElementById('tab');
		var oShow=document.getElementById('show');
		var oL=oShow.getElementsByTagName('span')[0];
		var oR=oShow.getElementsByTagName('span')[1];
		var aA=oTab.getElementsByTagName('a');
		var timer=null;
		var n=0;	
		var Awidth=aA[0].offsetWidth;
		
		oTab.onclick=function (ev){
			var oEvent=ev || event;
			oEvent.cancelBubble=true;
		};
		
		oL.onclick=function (ev){
			var oEvent=ev || event;		
			n--;
			if (n < 0) n=aA.length-1;
			move(oTab, {left:-n*Awidth});
			oEvent.cancelBubble=true;
		};
		oR.onclick=function (ev){
			var oEvent=ev || event;		
			n++;
			if (n > aA.length-1) n=0;
			move(oTab, {left:-n*Awidth});
			oEvent.cancelBubble=true;
		};
		
		clearInterval(timer);
		timer=setInterval(function (){
			n++;
			if (n == aA.length) n=0;			
			move(oTab, {left:-n*Awidth});
		},4000);
		oShow.onmouseover=function (){
			clearInterval(timer);
		};
		oShow.onmouseout=function (){
			clearInterval(timer);
			timer=setInterval(function (){
			n++;
			if (n == aA.length-1) n=0;
			move(oTab, {left:-n*Awidth});
		},4000);
		};
	})();
	
	;(function (){
		var oTab=document.getElementById('jstab');
		var oShow=document.getElementById('jsshow');
		var oL=oShow.getElementsByTagName('span')[0];
		var oR=oShow.getElementsByTagName('span')[1];
		var aA=oTab.getElementsByTagName('a');
		var timer=null;
		var n=0;	
		var Awidth=aA[0].offsetWidth;
		
		oTab.onclick=function (ev){
			var oEvent=ev || event;
			oEvent.cancelBubble=true;
		};
		
		oL.onclick=function (ev){
			var oEvent=ev || event;		
			n--;
			if (n < 0) n=aA.length-1;
			if (n==0){				
				move(oTab, {left:-n*Awidth});
			}
			else{
				move(oTab, {left:-n*Awidth+60});
			}
			oEvent.cancelBubble=true;
		};
		oR.onclick=function (ev){
			var oEvent=ev || event;		
			n++;
			if (n > aA.length-1) n=0;
			if (n == aA.length) n=0;
			move(oTab, {left:-n*Awidth});
			oEvent.cancelBubble=true;
		};
		
		clearInterval(timer);
		timer=setInterval(function (){
			n++;
			if (n == aA.length-1) n=0;
			move(oTab, {left:-n*Awidth});
		},3000);
		oShow.onmouseover=function (){
			clearInterval(timer);
		};
		oShow.onmouseout=function (){
			clearInterval(timer);
			timer=setInterval(function (){
			n++;
			if (n == aA.length-1) n=0;
			move(oTab, {left:-n*Awidth});
		},3000);
		};
	})();
	//右下手机菜单控制
	window.onload=function (){
		;(function (){
			//var oUl=document.getElementById('iphone');	
			var aLi=oUl.children;
			
			//var zIndex=1000;
			oUl.onclick=function (ev){
				var oEvent=ev || event;
				oEvent.cancelBubble=true;
			};
			//布局转化
			var aPos=[];
			for(var i=0; i<aLi.length; i++){
				aPos[i]={ left:aLi[i].offsetLeft, top:aLi[i].offsetTop};
			}
			
			for(var i=0; i<aLi.length; i++){
				aLi[i].style.left=aPos[i].left+'px';
				aLi[i].style.top=aPos[i].top+'px';
				aLi[i].style.position='absolute';
				aLi[i].style.margin=0;
			}
			
			//调用drag
			for(var i=0; i<aLi.length; i++){
				drag(aLi[i]);
				aLi[i].index=i;
			}
			
			//drag
			function drag(obj){
				obj.onmousedown=function(ev){
					var oEvent=ev || event;
					var disX=oEvent.clientX-obj.offsetLeft;
					var disY=oEvent.clientY-obj.offsetTop;
					
					obj.style.zIndex=zIndex++;
					
					document.onmousemove=function(ev){
						var oEvent=ev || event;
						
						obj.style.left=oEvent.clientX-disX+'px';
						obj.style.top=oEvent.clientY-disY+'px';
						
						for(var i=0; i<aLi.length; i++){
							aLi[i].className='';
						}
						//碰撞检测
						//换位置
						var oNear=findNearest(obj);
						if(oNear && oNear!=obj){
							var m=obj.index;
							var n=oNear.index;
							
							if(m<n){
								for(var i=0; i<aLi.length; i++){
									if(aLi[i].index>=m+1 && aLi[i].index<=n){
										aLi[i].index--;
										move(aLi[i],aPos[aLi[i].index], {duration:300});	
									}
								}
								obj.index=n;
							}else{
								for(var i=0; i<aLi.length; i++){
									if(aLi[i].index>=n && aLi[i].index<=m-1){
										aLi[i].index++;
										move(aLi[i],aPos[aLi[i].index], {duration:300});	
									}
								}
								obj.index=n;
							}
						}
					};
					document.onmouseup=function(){
						document.onmousemove=null;
						document.onmouseup=null;
						
						move(obj,aPos[obj.index], {duration:300});
					};
					return false;
				};
			}
			
			function findNearest(obj){
				var iMin=new Date().getTime();
				var iMinIndex=-1;
				for(var i=0; i<aLi.length; i++){
					//if(obj==aLi[i])continue; //?
					if(collTest(obj,aLi[i])){
						var dis=getDis(obj,aLi[i]);
						if(dis<iMin){
							iMin=dis;
							iMinIndex=i;	
						}
					}
				}
				
				if(iMinIndex==-1){
					return null;
				}else{
					return aLi[iMinIndex];
				}
			}
			
			//getDis
			function getDis(obj,obj2){
				var l1=obj.offsetLeft+obj.offsetWidth;
				var l2=aPos[obj2.index].left+obj2.offsetWidth;
				
				var t1=obj.offsetTop+obj.offsetHeight;
				var t2=aPos[obj2.index].top+obj2.offsetHeight;
				
				var a=l1-l2;
				var b=t1-t2;
				return Math.sqrt(a*a+b*b);
			}
			
			//collTest
			function collTest(obj,obj2){
				var l1=obj.offsetLeft;
				var t1=obj.offsetTop;
				var b1=obj.offsetTop+obj.offsetHeight;
				var r1=obj.offsetLeft+obj.offsetWidth;
				
				var l2=aPos[obj2.index].left;
				var t2=aPos[obj2.index].top;
				var b2=aPos[obj2.index].top+obj2.offsetHeight;
				var r2=aPos[obj2.index].left+obj2.offsetWidth;
				
				if(r1<l2 || l1>r2 || b1<t2 || t1>b2){
					return false;
				}else{
					return true;
				}
			}
		})();
	};
});	
	
	

//底部时间
function time(sName){
	;(function (sName){
	var aImg=sName.getElementsByClassName('time')[0].getElementsByTagName('img');
	
	setInterval(show,1000);
	show();
	function show(){
		var oDate=new Date();
		var y=oDate.getFullYear();
		var mon=oDate.getMonth()+1;
		var d=oDate.getDate();
		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();
		var str=y+toDub(mon)+toDub(d)+toDub(h)+toDub(m)+toDub(s);
		
		for (var i=0; i<aImg.length; i++){
			
			aImg[i].src='img/'+str.charAt(i)+'.png';	
		}	
	}
	function toDub(n){
		return n<10 ? n='0'+n : n=''+n;	
	}
})(sName);
}
//获取className
function getByClass(oParent, sName){
	if (oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sName);	
	}
	else{
		var aChild=oParent.getElementsByTagName('*');
		var aRes=[];
		for (var i=0; i<aChild.length; i++){
			var obj=aChild[i];
			var aTmp=obj.className.split(' ');
			if (findInarr(aTmp, sName) == true){
				aRes.push(obj);	
			}	
		}
		return aRes;	
	}	
}

function findInArr(arr, value){		//从数组中查找
	for (var i=0; i<arr.length; i++){
		if (arr[i] == value){
			return true;	
		}	
	}
	return false;
}
//ready函数
function ready(fn){
	if (document.addEventListener){
		document.addEventListener('DOMContentLoaded', fn, false);	
	}
	else{
		document.attachEvent('onreadystatechange', function (){
			if (document.readyState == 'complete'){
				fn();	
			}	
		})	
	}		
}



