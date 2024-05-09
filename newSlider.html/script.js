document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");

  let currentSlide = 0;
  console.log(slides[currentSlide]);

  //show the intial slide
  slides[currentSlide].classList.add("active");

  //Function to show the next slide
  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");

    console.log(currentSlide);
  }
  //Function to show the next slide
  function prevSlide() {
    slides[currentSlide].classList.remove("active");

    console.log(currentSlide - 1 + slides.length);
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");

    console.log(slides.length);
    console.log(currentSlide);
  }

  document.getElementById("nextBtn").addEventListener("click", nextSlide);
  document.getElementById("prevBtn").addEventListener("click", prevSlide);
});
