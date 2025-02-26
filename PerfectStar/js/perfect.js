document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".img-branch img");
  let currentIndex = 0;

  function showImage(index) {
      const offset = -index * 100; // Moves images left
      images.forEach(img => img.style.transform = `translateX(${offset}%)`);
  }

  document.querySelector(".prev-btn").addEventListener("click", function () {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
      showImage(currentIndex);
  });

  document.querySelector(".next-btn").addEventListener("click", function () {
      currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
      showImage(currentIndex);
  });
});
