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
            slides[i].style.opacity = '0.3';
            
            if (active == slides.length-2){
                slides[0].style.transform = 'translate(calc(100% + 5vw))';
                slides[0].style.opacity = '0';
            }

            if (active == slides.length-1) {
                slides[i].style.transform = 'translate(calc(100% + 5vw))';
                slides[i].style.opacity = '0';
                slides[0].style.opacity = '0.3';
                slides[slides.length-1].style.transform = 'translate(calc('+-(active*100)+'% - 5vw))';
                slides[slides.length-2].style.transform = 'translate(calc('+-(active*100)+'% - 5vw))';
                slides[slides.length-2].style.opacity = '0.3';
            }
            if (active == 0) {
                slides[slides.length-1].style.transform = 'translate(calc('+-(slides.length*100)+'% - 15vw))';
                slides[slides.length-2].style.opacity = '0';
            }
            if (active == 1) {
                slides[slides.length-1].style.opacity = '0';
            }
        }
        
    }
            
    function getNewTimer() {
        return setInterval(function() {
            prev = active;
            active+1 <= slides.length-1 ? ++active : active = 0;
            changeActiveSlide(prev);
        }, 2500);
    }
    slider.onmouseover = function() {
        clearTimeout(changeTimer);
    }
    slider.onmouseout = function() {
        changeTimer = getNewTimer();
    }
})