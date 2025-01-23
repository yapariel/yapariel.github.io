// Custom Modal Code
var modal = document.getElementById("customModal");
var modalImg = document.getElementById("modalImage");
var images = document.querySelectorAll(".image-to-popup");
var span = document.getElementsByClassName("custom-modal-close")[0];

images.forEach((img) => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
