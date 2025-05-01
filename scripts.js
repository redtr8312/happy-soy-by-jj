document.addEventListener('DOMContentLoaded', function () {
  // Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Sticky Header
  const header = document.querySelector('.sticky-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
      }

      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      }

      if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }

      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Hero Video
  const heroVideo = document.querySelector('.hero-video video');
  if (heroVideo) {
    heroVideo.play().catch(error => {
      console.log('Video autoplay prevented:', error);
    });
  }

  // Gallery Slider
  const galleryTrack = document.querySelector('.gallery-track');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const prevBtn = document.querySelector('.gallery-nav.prev');
  const nextBtn = document.querySelector('.gallery-nav.next');
  const dots = document.querySelectorAll('.gallery-pagination .dot');

  if (galleryTrack && galleryItems.length > 0) {
    let currentIndex = 0;
    const itemWidth = galleryItems[0].offsetWidth + 20;

    function updateGallery() {
      galleryTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateGallery();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateGallery();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', function () {
        currentIndex = index;
        updateGallery();
      });
    });

    let galleryInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateGallery();
    }, 5000);

    galleryTrack.addEventListener('mouseenter', () => {
      clearInterval(galleryInterval);
    });

    galleryTrack.addEventListener('mouseleave', () => {
      galleryInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateGallery();
      }, 5000);
    });
  }

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialPrev = document.querySelector('.testimonial-nav.prev');
  const testimonialNext = document.querySelector('.testimonial-nav.next');

  if (testimonialSlides.length > 0) {
    let currentTestimonial = 0;

    function showTestimonial(index) {
      testimonialSlides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('active');
      });

      testimonialSlides[index].style.display = 'block';
      setTimeout(() => {
        testimonialSlides[index].classList.add('active');
      }, 10);
    }

    showTestimonial(currentTestimonial);

    if (testimonialNext) {
      testimonialNext.addEventListener('click', function () {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
      });
    }

    if (testimonialPrev) {
      testimonialPrev.addEventListener('click', function () {
        currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
      });
    }

    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
      showTestimonial(currentTestimonial);
    }, 8000);
  }

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Form Validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const formInputs = this.querySelectorAll('.form-control');

      formInputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.backgroundColor = '#4CAF50';

          setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.style.backgroundColor = '';
            this.reset();
          }, 3000);
        }
      }
    });
  }

  // Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('.newsletter-input');
      if (emailInput && emailInput.value.trim() && isValidEmail(emailInput.value.trim())) {
        const submitBtn = this.querySelector('.newsletter-btn');
        if (submitBtn) {
          submitBtn.textContent = 'Subscribed!';
          submitBtn.style.backgroundColor = '#4CAF50';

          setTimeout(() => {
            submitBtn.textContent = 'Subscribe';
            submitBtn.style.backgroundColor = '';
            emailInput.value = '';
          }, 3000);
        }
      } else {
        emailInput.classList.add('error');
        setTimeout(() => {
          emailInput.classList.remove('error');
        }, 2000);
      }
    });
  }

  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Animation on Scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate, .animate-left, .animate-right');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Product Card Hover Effects
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.querySelector('.product-image img').style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', function () {
      this.querySelector('.product-image img').style.transform = 'scale(1)';
    });
  });

  // Footer - Year Update
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Footer - Smooth Scroll Links
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      } else {
        window.location.href = targetId;
      }
    });
  });

  // Footer - Social Media Animation
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-5px) scale(1.1)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
    });
  });

  // ✅ Send Order Button — Messenger Integration
  const sendOrderBtn = document.querySelector('#send-order');
  if (sendOrderBtn) {
    sendOrderBtn.addEventListener('click', function (e) {
      e.preventDefault();
      // Replace "happysoyph" with your actual Facebook Page username
      const message = encodeURIComponent("Hello! I'd like to place an order for Happy Soy. 😊");
      window.open(`https://m.me/happysoyph?ref=${message}`, '_blank');
    });
  }
});
