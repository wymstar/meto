var isWebKit = navigator.userAgent.indexOf('WebKit') !== -1;
scrollElement = isWebKit ? document.body : document.documentElement;
    $('.g_nav .snav_item').mouseenter(function(){
        $(this).addClass('snav_itemactive');
        $('.g_nav .snav_item:last').removeClass('snav_itemactive');
        $('.g_nav .more_pos').eq($(this).index()).hide();
        $('.g_nav .snav_pos').eq($(this).index()).show();
        $('.g_nav .snav_pos:last').hide();
    });
    $('.g_nav .snav_item').mouseleave(function(e){
        var relatedPos = $('.g_nav .snav_pos').eq($(this).index());
        if(e.relatedTarget !== relatedPos[0]){
            relatedPos.hide();
            $(this).removeClass('snav_itemactive');
            $('.g_nav .more_pos').eq($(this).index()).show();
        }

    });
    $('.g_nav .snav_pos').mouseleave(function(){
        $('.g_nav .more_pos').eq($(this).index('.g_nav .snav_pos')).show();
        $('.g_nav .snav_item').eq($(this).index('.g_nav .snav_pos')).removeClass('snav_itemactive');
        $(this).hide();
    });

var sideBtns = document.getElementById('m_side_btns'),
    toTopBtn = document.getElementById('returnToTop'),
    sideBtnsBottomLimit = document.getElementById('g_ft');
    isTopBtnVisible = false,
    recent = document.getElementById('g_recent'),
    popupBar = document.getElementById('popupBar');
window.addEventListener('scroll',function(){
    var scrollTop = scrollElement.scrollTop,
        totalTop = scrollTop + window.innerHeight,
        bottomLimit = sideBtnsBottomLimit.offsetTop;
    if(scrollTop>200 && !isTopBtnVisible)
        toTopBtn.style.display = 'block';
    else if(scrollTop<=200){
        toTopBtn.style.display = 'none';
        isTopBtnVisible = false;
    }
    if(totalTop>=bottomLimit){
        if(sideBtns.isBottomFixed)
            sideBtns.isBottomFixed = false;
        sideBtns.style.bottom = (totalTop - bottomLimit + 20)+'px';
    }else if(!sideBtns.isBottomFixed){
        sideBtns.isBottomFixed = true;
        sideBtns.style.bottom = '20px';
    }
});
if(recent){
    var recentToTop = recent.offsetTop,
        isRecentFixed = false;
    window.addEventListener('scroll',function(){
        if(!isRecentFixed && scrollElement.scrollTop>=recentToTop){
            isRecentFixed = true;
            if(popupBar)
                recent.className += ' g_recent_follow';
            else
                recent.className += ' g_recent_followTop';
        }else if(isRecentFixed && scrollElement.scrollTop<recentToTop){
            isRecentFixed = false;
            recent.className = 'g_recent';
        }
    },false);
}
if(popupBar){
    var popbarBtns = popupBar.getElementsByTagName('a'),
        popbarAnchors = document.getElementById('g_detail').getElementsByTagName('h3'),
        popbarToTops = [];
    for(i = 1;i<6;i++){
        popbarToTops.push(popbarAnchors[i].offsetTop);
    }
    window.addEventListener('scroll',(function(){
        var scrollTop,
            popbarToTop = popupBar.offsetTop;
            popbarBtns = window.popbarBtns,
            isPopbarFixed = false,
            isSet = [true],
            crtBtn = 0;
            toTops = window.popbarToTops;
        function setBtn(btn){
            popbarBtns[crtBtn].className = 'popbar_btn';
            popbarBtns[btn].className += ' popbar_btn_crt';
            isSet[crtBtn] = false;
            isSet[btn] = true;
            crtBtn = btn;
        }

        return function(){
            scrollTop = scrollElement.scrollTop + 44;
            if(!isPopbarFixed && scrollTop>=popbarToTop){
                isPopbarFixed = true;
                popupBar.className += ' popup_bar_fixed';
            }else if(isPopbarFixed && scrollTop<popbarToTop){
                isPopbarFixed = false;
                popupBar.className = 'popup_bar';
            }
            if(scrollTop<toTops[1]){
                if(!isSet[0])
                    setBtn(0);
            }else if(scrollTop<toTops[2]){
                if(!isSet[1])
                    setBtn(1);
            }else if(scrollTop<toTops[3]){
                if(!isSet[2])
                    setBtn(2);
            }else if(scrollTop<toTops[4]){
                if(!isSet[3])
                    setBtn(3);
            }else if(scrollTop>=toTops[4]){
                if(!isSet[4])
                    setBtn(4);
            }
        }
    })(),false);
    for(i = 0;i<5;i++){
        popbarBtns[i].index = i;
        popbarBtns[i].onclick = function(){
            $(scrollElement).stop().animate({scrollTop:popbarToTops[this.index]});
        }
    }
}
$(toTopBtn).click(function(){
    $(scrollElement).animate({scrollTop: '0px'}, 600);
});