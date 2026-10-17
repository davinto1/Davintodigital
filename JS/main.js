/* ===== DavintoDigital Website Scripts ===== */

document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header scroll
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Back to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('dd-theme');

  if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('dd-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('dd-theme', 'light');
    }
  });

  // Counter animation
  const counters = document.querySelectorAll('[data-count]');
  let counted = false;

  function animateCounters() {
    if (counted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counted = true;
      counters.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 1500;
        const start = performance.now();
        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(ease * target);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target;
        }
        requestAnimationFrame(update);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // Services filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Pricing toggle
  const pricingToggle = document.getElementById('pricingToggle');
  const standardPricing = document.getElementById('standardPricing');
  const studentPricing = document.getElementById('studentPricing');

  pricingToggle.addEventListener('change', () => {
    if (pricingToggle.checked) {
      standardPricing.classList.add('hidden');
      studentPricing.classList.remove('hidden');
    } else {
      standardPricing.classList.remove('hidden');
      studentPricing.classList.add('hidden');
    }
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Build WhatsApp message
    let text = `Hello DavintoDigital!\n\n`;
    text += `*Name:* ${name}\n`;
    text += `*Email:* ${email}\n`;
    if (phone) text += `*Phone:* ${phone}\n`;
    if (service) text += `*Service:* ${service}\n`;
    text += `\n*Message:*\n${message}`;

    const waUrl = `https://wa.me/message/QKLJC465UEPWG1?text=${encodeURIComponent(text)}`;
    // Fallback to general link if short link doesn't support prefill well
    const waFallback = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');

    // Show confirmation
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Opening WhatsApp...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      contactForm.reset();
    }, 2500);
  });

  // Simple AOS (Animate On Scroll)
  const aosElements = document.querySelectorAll('[data-aos]');

  function checkAOS() {
    aosElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const delay = parseInt(el.getAttribute('data-aos-delay') || 0);
      if (rect.top < window.innerHeight * 0.88) {
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, delay);
      }
    });
  }

  window.addEventListener('scroll', checkAOS);
  window.addEventListener('load', checkAOS);
  checkAOS();

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// Fade-in keyframe via JS injection if needed
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
