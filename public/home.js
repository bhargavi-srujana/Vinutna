document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.slide-track');
  let posters = document.querySelectorAll('.poster');
  let currentIndex = 1; // Start at 1 because of the prepended clone

  // Clone first and last poster for seamless looping
  const firstClone = posters[0].cloneNode(true);
  const lastClone = posters[posters.length - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  track.insertBefore(lastClone, posters[0]);
  track.appendChild(firstClone);

  // Update posters NodeList after cloning
  posters = document.querySelectorAll('.poster');

  function updateCarousel(animate = true) {
    posters.forEach(p => p.classList.remove('focused'));
    posters[currentIndex].classList.add('focused');
    if (animate) {
      track.style.transition = 'transform 0.5s ease';
    } else {
      track.style.transition = 'none';
    }
    const offset = -100 * currentIndex;
    track.style.transform = `translateX(${offset}%)`;
  }

  // Initial position (show the real first poster)
  updateCarousel(false);

  track.addEventListener('transitionend', () => {
    if (currentIndex === posters.length - 1) {
      // If at the clone of the first poster, jump to the real first poster
      currentIndex = 1;
      updateCarousel(false);
    } else if (currentIndex === 0) {
      // If at the clone of the last poster, jump to the real last poster
      currentIndex = posters.length - 2;
      updateCarousel(false);
    }
  });

  let autoSlide = setInterval(() => {
    currentIndex++;
    updateCarousel();
  }, 3000);

  // Arrow navigation
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      currentIndex++;
      updateCarousel();
    }, 3000);
  }

  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();
      resetAutoSlide();
    });
    rightArrow.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
      resetAutoSlide();
    });
  }
});
