const heroHeadings = document.querySelector(".hero_headings")
const scroller = document.querySelectorAll(".clients_scroller")
const upperFeatures = document.querySelectorAll(".upper_feature")
const lowerFeatures = document.querySelectorAll(".lower_feature")
const firstPin = document.querySelector(".pinned_container_first")
const secondPin = document.querySelector(".pinned_container_second")
const thirdPin = document.querySelector(".pinned_container_third")
const fourthPin = document.querySelector(".pinned_container_fourth")
const track = document.querySelector('.slider_container')
const boxes = document.querySelectorAll('.slider_container_box')
const btnPrv = document.querySelector('.prev')
const btnNext = document.querySelector('.next')




let valueDisplays = document.querySelectorAll(".num")
let currentIndex = 0


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
        const scrollInner = scrollers.querySelector(".clients_scroller_inner");
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
            started = true; // lock so it runs only once

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
observeCounter.observe(document.querySelector(".counters_container"));

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


/*testimonials section*/
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
    }
})
btnPrv.addEventListener('click',()=>{
    const step = getCardsPerView()
    if(currentIndex > 0){
        currentIndex -= step
        if(currentIndex < 0) currentIndex = 0
        updateSlider()
    }
})
window.addEventListener('resize',()=>{
    updateSlider()
})

