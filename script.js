///////////////////////////////////////////////////////
//    Project: EliteHomes - Luxury Real Estate Website
//    Developer: JohnDev19
//    GitHub: https://github.com/JohnDev19
////////////////////////////////////////////////////////   
//    Website Sections:
//    1. Navigation Bar
//    2. Hero Section
//    3. Partnerships Section
//    4. About Section
//    5. Why Choose Us Section
//    6. Performance Metrics Section
//    7. Properties Section
//    8. Contact Section
//    9. Footer Section
///////////////////////////////////////////////////////
//    Technologies Used:
//    - HTML5
//    -CSS3
//    - JavaScript
//    - Bootstrap 5
//    - Font Awesome
///////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const contactForm = document.getElementById('contact-form');
  const selectWrapper = document.querySelector('.custom-select-wrapper');
  const selectInput = selectWrapper.querySelector('.custom-select');
  const selectDropdown = selectWrapper.querySelector('.custom-select-dropdown');
  const selectOptions = selectWrapper.querySelectorAll('.custom-select-option');

  // scroll tracking
  let lastScrollTop = 0;
  // select dropdown
  const initCustomSelect = () => {
    selectInput.addEventListener('click', () => {
      selectWrapper.classList.toggle('active');
    });

    // close dropdown
    document.addEventListener('click', (event) => {
      if (selectWrapper && !selectWrapper.contains(event.target)) {
        selectWrapper.classList.remove('active');
      }
    });

    // option selection handler
    selectOptions.forEach(option => {
      option.addEventListener('click', () => {
        selectOptions.forEach(opt => opt.classList.remove('selected'));

        option.classList.add('selected');

        selectInput.textContent = option.textContent;

        selectInput.setAttribute('data-selected-value', option.dataset.value);

        selectWrapper.classList.remove('active');
      });
    });
  };

  // metric
  const counters = document.querySelectorAll('.metric-number');

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;

    const updateCounter = () => {
      const increment = target / 100;

      if (current < target) {
        current += increment;
        counter.textContent = Math.round(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  };

  // counter Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });

  // nav scroll behavior
  const handleNavbarScroll = () => {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // scrolling down
        navbar.classList.add('hidden');
      } else {
        // scrolling up
        navbar.classList.remove('hidden');
      }
      lastScrollTop = scrollTop <= 0 ? 0: scrollTop;
    });
  };

  // mobile navigation
  const initMobileNavigation = () => {
    navbarToggle.addEventListener('click',
      () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');

        if (navbarMenu.classList.contains('active')) {
          navbarMenu.style.animation = 'drop 0.5s ease forwards';
        } else {
          navbarMenu.style.animation = '';
        }
      });

    document.querySelectorAll('.navbar-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        navbarMenu.style.animation = '';
      });
    });
  };

  // smooth scrolling - anchor links
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  };

  // form validation and Submission (this is not actual)
  const handleFormSubmission = () => {
    contactForm.addEventListener('submit',
      (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
          alert('Please fill in all required fields.');
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }

        alert('Thank you for your inquiry! We will contact you shortly.');
        contactForm.reset();
      });
  };

  // scroll animation
  const initScrollAnimations = () => {
    const animateOnScroll = (entries,
      observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll,
      {
        root: null,
        threshold: 0.1
      });

    document.querySelectorAll('.animate-on-scroll').forEach(item => {
      observer.observe(item);
    });
  };

  const initGoToTop = () => {
    const goToTopBtn = document.getElementById('goToTop');

    window.addEventListener('scroll',
      () => {
        if (window.pageYOffset > window.innerHeight * 0.5) {
          goToTopBtn.classList.add('visible');
        } else {
          goToTopBtn.classList.remove('visible');
        }
      });

    goToTopBtn.addEventListener('click',
      () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
  };

  const init = () => {
    initCustomSelect();
    handleNavbarScroll();
    initMobileNavigation();
    initSmoothScroll();
    handleFormSubmission();
    initScrollAnimations();
    initGoToTop();
  };

  init();
});