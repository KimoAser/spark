const navHeader = document.querySelector('.nav')
const logo = document.querySelector('.nav__logo')
const menu = document.querySelector('.nav__menu')
const hamburger = document.querySelector('.nav__button')
const navItem = document.querySelectorAll('.nav__menu a')
const heroHeadings = document.querySelector(".heading__title")
const scroller = document.querySelectorAll(".clients__scroller")
const upperFeatures = document.querySelectorAll(".features__upper--card")
const lowerFeatures = document.querySelectorAll(".feature__lower--card")
const firstPin = document.querySelector(".choosing__first")
const secondPin = document.querySelector(".choosing__second")
const thirdPin = document.querySelector(".choosing__third")
const fourthPin = document.querySelector(".choosing__fourth")
const track = document.querySelector('.testimonials__container')
const boxes = document.querySelectorAll('.testimonials__box')
const btnPrv = document.querySelector('.prev')
const btnNext = document.querySelector('.next')
const bulletContainer = document.querySelector('.testimonials__bullets')
const accordion = document.getElementsByClassName ('accordion__box');
const emailEntered = document.querySelector('.footer__entered--email')
const emailError = document.querySelector('.footer__unvalid')
const emailSuccess = document.querySelector('.footer__valid')
const join = document.querySelector(".join")


let valueDisplays = document.querySelectorAll(".counters__num")
let currentIndex = 0
let isForward = true


/*--Navigation Header--*/
const scrollWatcher = document.createElement('div')
scrollWatcher.setAttribute('data-scroll-watcher','')
navHeader.before(scrollWatcher)
const navObserver = new IntersectionObserver((entries)=>{
    navHeader.classList.toggle('sticking', !entries[0].isIntersecting)
})
navObserver.observe(scrollWatcher)
window.addEventListener("load", () => {
    const visible = scrollWatcher.getBoundingClientRect().top >= 0;
    navHeader.classList.toggle('sticking', !visible);
});


/*--burger navigation--*/
hamburger.addEventListener('click',(e)=>{
    hamburger.classList.toggle('click')
    e.stopPropagation()
    logo.style.visibility = (logo.style.visibility === 'hidden') ? 'visible':'hidden'
   if(!menu.classList.contains('show')){
    menu.style.display = 'flex'
    requestAnimationFrame(()=>{
        menu.classList.add('show')
    })
   }
   else {
    closeMenu()
   }
})
document.addEventListener('click',(e)=>{
    if(menu.classList.contains('show') && !menu.contains(e.target) && !hamburger.contains(e.target)){
        closeMenu()
        hamburger.classList.remove('click')
    }
})
navItem.forEach(link=>{
    link.addEventListener('click',(e)=>{
        e.preventDefault()
        e.stopPropagation()
        const targetID = link.getAttribute("href");
        closeMenu(()=>{
            hamburger.classList.remove('click')
            document.querySelector(targetID).scrollIntoView({
                behavior: "smooth"
            });
        })
    })
})
function closeMenu(callback){
    menu.classList.remove('show')
    menu.addEventListener('transitionend',function hideOut(){
        menu.style.display = 'none'
        menu.removeEventListener('transitionend',hideOut)
        if (callback) callback();
    })
    logo.style.visibility = 'visible'
}


/*--hero section--*/ 
const observer = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        entries[0].target.classList.add("show");
    }
},{})
observer.observe(heroHeadings);


/*--Slider Clients section--*/ 
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    addAnimation();
}
function addAnimation(){
    scroller.forEach((scrollers)=>{
        scrollers.setAttribute("data-animated",true);
        const scrollInner = scrollers.querySelector(".clients__lists");
        const scrollerContent = Array.from(scrollInner.children);
        scrollerContent.forEach(item =>{
            const duplicatedItems = item.cloneNode(true);
            duplicatedItems.setAttribute("aria-hidden",true);
            scrollInner.appendChild(duplicatedItems)
        })
    })
}


/*--features section--*/
const observe = new IntersectionObserver((entires=>{
    entires.forEach(entry=>{
        if (entry.isIntersecting){
            entry.target.classList.add("show");
        }
    })
}),{
    rootMargin:"0px 0px -150px 0px"
})
upperFeatures.forEach(div=>observe.observe(div));
lowerFeatures.forEach(div=>observe.observe(div));


/*--Counter section--*/ 
let interval = 1000;
let started = false;
let observeCounter = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            started = true; 

            valueDisplays.forEach((valueDisplay) => {
                let startValue = 0;
                let endValue = parseInt(valueDisplay.getAttribute("data-val"));
                let duration = Math.floor(interval / endValue);

                let counter = setInterval(() => {
                    startValue += 1;
                    valueDisplay.textContent = startValue;

                    if (startValue === endValue) clearInterval(counter);
                }, duration);
            });
        }
    });
}, {
    rootMargin:"0px 0px -50px 0px"
});
observeCounter.observe(document.querySelector(".counters__container"));


/*--choose us pins--*/
const pinObserveFirst = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        entries[0].target.classList.add("show");
    }
},{
    rootMargin:"0px 0px -180px 0px"
}) 
const pinObserveSecond = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        entries[0].target.classList.add("show");
    }
},{
    rootMargin:"0px 0px -180px 0px"
}) 
const pinObserveThird = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        entries[0].target.classList.add("show");
    }
},{
    rootMargin:"0px 0px -50px 0px"
}) 
const pinObserveFourth = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        entries[0].target.classList.add("show");
    }
},{
    rootMargin:"0px 0px -50px 0px"
}) 
pinObserveFirst.observe(firstPin);
pinObserveSecond.observe(secondPin);
pinObserveThird.observe(thirdPin);
pinObserveFourth.observe(fourthPin);


/*--testimonials section--*/
function updateSlider(){
    const cardWidth = boxes[0].getBoundingClientRect().width
    const styles = window.getComputedStyle(track)
    const gap = parseFloat(styles.columnGap || styles.gap)|| 0
    const width = cardWidth + gap
    track.scrollTo({
        left: currentIndex * width,
        behavior:'smooth'
    })
}
function getCardsPerView(){
    if(window.innerWidth >= 1100) return 3
    if(window.innerWidth >= 700) return 2
    return 1
}
btnNext.addEventListener('click',()=>{
    const step = getCardsPerView()
    const maxIndex = boxes.length - step
    if(currentIndex < maxIndex){
        currentIndex += step
        updateSlider()
        updateBullets()
    }
})
btnPrv.addEventListener('click',()=>{
    const step = getCardsPerView()
    if(currentIndex > 0){
        currentIndex -= step
        if(currentIndex < 0) currentIndex = 0
        updateSlider()
        updateBullets()
    }
})
window.addEventListener('resize',()=>{
    updateSlider()
    createBullets()
    updateBullets()
})

createBullets()
updateBullets()

function calculateTotalSlides(){
    const step = getCardsPerView()
    return Math.ceil(boxes.length/step)
}
function createBullets(){
    bulletContainer.innerHTML = ""
    totalSlides = calculateTotalSlides()
    for(let i=0; i<totalSlides; i++){
        const bullet = document.createElement('div')
        bullet.classList.add('bullet')
        if(i===0) bullet.classList.add('active')
        bullet.addEventListener('click',()=>{
            currentIndex = i * getCardsPerView()
            updateSlider()
            updateBullets()
        })
        bulletContainer.appendChild(bullet)
    }
}
function updateBullets(){
    const bullets = document.querySelectorAll('.bullet')
    bullets.forEach(b => b.classList.remove('active'))
    const slideNumber = Math.floor(currentIndex/getCardsPerView())
    if(bullets[slideNumber]){
        bullets[slideNumber].classList.add('active')
    }
}
function autoPlay(){
    const step = getCardsPerView()
    const maxIndex = boxes.length - step
    if(isForward){
        currentIndex += step
        if(currentIndex >=maxIndex){
            currentIndex = maxIndex
            isForward = false
        }
    }
    else {
        currentIndex -= step
        if(currentIndex <=0){
            currentIndex = 0
            isForward = true
        }
    }
    updateBullets()
    updateSlider()
}
let autoPlayInterval = setInterval(autoPlay,5000)
track.addEventListener('mouseenter',()=>{
    clearInterval(autoPlayInterval)
})
track.addEventListener('mouseleave',()=>{
    autoPlayInterval = setInterval(autoPlay,5000)
})


/*--FAQ--*/ 
for (i=0; i<accordion.length; i++){
    accordion[i].addEventListener('click',function(){
        this.classList.toggle('active')
    })
}


/*--Email Submit--*/
join.addEventListener('click',()=>{
    const emailName = emailEntered.value.trim()
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValid.test(emailName)) {
        emailError.style.display = "block"
        emailSuccess.style.display = 'none'
    }
    else {
        emailSuccess.style.display = 'block'
        emailError.style.display = "none"
    }
})


/*--Refreshing the Page--*/
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
        setTimeout(() => {
            window.history.replaceState(null, null, window.location.pathname);
        }, 10);
    });
});
