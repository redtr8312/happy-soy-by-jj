let track = document.querySelector('.gallery-track');
let currentIndex = 0;
let items = document.querySelectorAll('.gallery-item');
let totalItems = items.length;

// Slide function
function slideGallery() {
  currentIndex++;
  if (currentIndex > totalItems - 2) { // Show 2 items only, then loop
    currentIndex = 0;
  }
  let moveX = -(currentIndex * (track.offsetWidth / 2 + 10)); // Move 2 items width + 10px gap
  track.style.transform = `translateX(${moveX}px)`;
}

// Move every 2 seconds
setInterval(slideGallery, 2000);
