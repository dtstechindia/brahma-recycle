const carousel = document.querySelector('.carousel');
const nextButton = document.querySelector('.carousel-control.next');
const prevButton = document.querySelector('.carousel-control.prev');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;
let autoSlideInterval;

// Initialize the auto slide
startAutoSlide();

// Add mouse event listeners
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('mouseleave', dragEnd);
carousel.addEventListener('mousemove', drag);

// Add touch event listeners for mobile compatibility
carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('touchend', dragEnd);
carousel.addEventListener('touchmove', drag);

// Add event listeners for next and previous buttons
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carousel.children.length;
    setPositionByIndex();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
    setPositionByIndex();
});

function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    carousel.classList.add('grabbing');
    clearInterval(autoSlideInterval); // Stop auto sliding when dragging starts
}

function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50 && currentIndex < carousel.children.length - 1) currentIndex += 1;
    if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;
    setPositionByIndex();
    carousel.classList.remove('grabbing');
    startAutoSlide(); // Restart auto sliding after dragging ends
}

function drag(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setCarouselPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setCarouselPosition() {
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -carousel.children[0].offsetWidth;
    prevTranslate = currentTranslate;
    setCarouselPosition();
}

function autoSlide() {
    currentIndex = (currentIndex + 1) % carousel.children.length;
    setPositionByIndex();
}

function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    // autoSlideInterval = setInterval(autoSlide, 3000); // Auto slide every 3 seconds
}







// document.addEventListener("DOMContentLoaded", function() {
//     var toggler = document.querySelector('.navbar-toggler');
//     var collapse = document.querySelector('#navbarSupportedContent');
  
//     toggler.addEventListener('click', function() {
//       // Toggle menu visibility
//       collapse.classList.toggle('show');
      
//       // Toggle active class to change icon
//       toggler.classList.toggle('active');
//     });
//   });
  
  