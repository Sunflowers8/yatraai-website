// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  // Animate steps on scroll
const steps = document.querySelectorAll('.step');

const animateSteps = () => {
  steps.forEach((step, index) => {
    const stepPosition = step.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (stepPosition < screenPosition) {
      step.style.opacity = '1';
      step.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', animateSteps);

// Initial animation trigger
animateSteps();