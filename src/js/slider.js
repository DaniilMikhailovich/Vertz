document.addEventListener('DOMContentLoaded', function(){
    var active = 0, prev = 0;
    var arrows = document.getElementsByClassName('slider_arrow');
    var slides = document.getElementsByClassName('slide');
    var slide1 = document.querySelector('.slide1')
    var navs = document.getElementsByClassName('sn_item');
    var slider = document.getElementsByClassName('slider')[0];
    var changeTimer = getNewTimer();

    for (var i=0; i<arrows.length; i++) {
        arrows[i].addEventListener('click', function (e){
            prev=active;

            if (!!~e.target.classList[1].indexOf('left')){
                active - 1 >= 0 ? --active : active = slides.length-1;
            }
            else {
                active + 1 <= slides.length-1 ? ++active : active = 0;
            }
            changeActiveSlide(prev);
        });
    }

    for (var i=0; i<navs.length; i++) {
        (function(i){
            navs[i].addEventListener('click', function(){
                prev = active;
                active=i;
                changeActiveSlide(prev);
            });
        })(i);
    }

    function changeActiveSlide(prev) {
        slides[prev].classList.remove('slideActive');
        slides[active].classList.add('slideActive');
        navs[prev].classList.remove('sn_itemActive');
        navs[active].classList.add('sn_itemActive');
        for (var i=0; i<slides.length; i++){
            slides[i].style.transform = 'translate(calc('+-(active*100)+'% - 5vw))';
            i==slides.length ? slide1.style.transform = 'translate(calc(100% - 5vw))' : slide1.style.transform = 'translate(calc('+-(active*100)+'% - 5vw))'; 
        }
    }
            
    function getNewTimer() {
        return setInterval(function() {
            prev = active;
            active+1 <= slides.length-1 ? ++active : active = 0;
            changeActiveSlide(prev);
        }, 3500);
    }
    slider.onmouseover = function() {
        clearTimeout(changeTimer);
    }
    slider.onmouseout = function() {
        changeTimer = getNewTimer();
    }
})