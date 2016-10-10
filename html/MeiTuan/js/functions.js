/* get by class */
function getElementsByClassName(root,className){
    var eles = root.getElementsByTagName('*');
    var result = [];
    for(var i = 0;i<eles.length;i++){
        if(hasClassName(eles[i],className)){
            result.push(eles[i]);
        }
    }
    return result;
}
function hasClassName(ele,className){
    var eleName = ' '+ele.className+' ';
    var names = className.split(' ');
    for(var i = 0,name;name = names[i];i++){
        if(eleName.indexOf(' '+name+' ')===-1){
            return false;
        }
    }
    return true;
}
var isWebKit = navigator.userAgent.indexOf('WebKit') !== -1;
scrollElement = isWebKit ? document.body : document.documentElement;
/* for toggling tabs */
var tabs = document.getElementById('all_cate_tabs').getElementsByTagName('a'),
	lists = document.getElementById('m_all_cate').getElementsByTagName('ul'),
	currCateIdx = 0,
	tabsLen = tabs.length;
for(i = 0;i<tabsLen;i++){
	tabs[i].index = i;
	tabs[i].onclick = function(){
		var index = this.index;
		if(index !== currCateIdx){
			tabs[currCateIdx].className = 'tab';
			this.className = 'tab tab_act';
			lists[currCateIdx].className = 'cate_list';
			lists[index].className = 'cate_list active';
			currCateIdx = index;
		}
	}
}
/* toggle class */
function toggleClass(element,original,active){
	return function(){
		if(element.className === original)
            element.className += ' ' + active;
        else
            element.className = original;
	}
}
/* for slides */
function initSlide(wrapperId,slideTag,btnClass,duration,interval,func,func2,func3){
	var wrapper = document.getElementById(wrapperId),
		slides = wrapper.getElementsByTagName(slideTag),
		btns = getElementsByClassName(wrapper,btnClass),
		crtIdx = {value:0};
	function slide(dst1,dst2,next,duration){
		$(slides[crtIdx.value]).stop().css({left:0}).animate({left:dst1},duration);
		$(slides[next]).stop().css({left:dst2}).animate({left:0},duration);
		if(typeof func2 === 'function')
			func2(crtIdx,next,btns);
		if(typeof func3 === 'function')
			func3(crtIdx,next,btns);
		crtIdx.value = next;
	}
	btns[0].onclick = function(){
		var prev = crtIdx.value === 0 ? slides.length-1 : (crtIdx.value-1);
		slide('100%','-100%',prev,duration);
	}
	btns[1].onclick = function(){
		var next = crtIdx.value === slides.length-1 ? 0 : (crtIdx.value+1);
		slide('-100%','100%',next,duration);
	}
	wrapper.intv = setInterval(function(){slide("-100%","100%",crtIdx.value === slides.length-1 ? 0 : (crtIdx.value+1),duration)},interval);
	$(wrapper).mouseenter(function(){
		clearInterval(wrapper.intv);
	});
	$(wrapper).mouseleave(function(){
		wrapper.intv = setInterval(function(){slide("-100%","100%",crtIdx.value === slides.length-1 ? 0 : (crtIdx.value+1),duration)},interval);
	});
	if(typeof func === 'function')
		func(slides,crtIdx,slide,duration);
}