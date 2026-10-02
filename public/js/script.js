/* ========================================
   Café Coco Website - JavaScript
   kavinecoco.com
   ======================================== */

// ============================================
// TRANSLATIONS — main site
// ============================================
const siteTranslations = {
  en: {
    // Nav
    'nav.menu': 'Menu',
    'nav.shop': 'Order',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    // Hero
    'hero.title': "Kaunas' Favourite Dessert Café",
    'hero.subtitle': 'Handmade cakes, pastries & specialty coffee',
    'hero.order': 'Order Now',
    'hero.menu': 'View Menu',
    // Quick actions
    'qa.order.title': 'Order Desserts',
    'qa.order.text': 'Custom cakes & pastries for pickup or delivery. 3 days advance.',
    'qa.order.link': 'Order now →',
    'qa.hours.title': 'Opening Hours',
    'qa.hours.text': 'Mon–Fri 8:00–20:00 · Sat–Sun 9:00–21:00',
    'qa.find.title': 'Find Us',
    'qa.find.text': 'Daukšos g. 27, Kaunas · 5 min from Old Town',
    'qa.find.link': 'Get directions →',
    // About
    'about.eyebrow': 'Our Story',
    'about.title': 'Made with love in Kaunas',
    'about.p1': 'Coco's started as a small passion project — a dream to bring honest, beautiful baking to Kaunas. Every item on our menu is handmade from scratch using quality ingredients.',
    'about.p2': 'From our signature Basque cheesecakes to seasonal tarts, we bake everything fresh each morning.',
    // Section headers
    'section.discover': 'Discover Coco\'s',
    'section.discover.sub': 'Everything you need to know',
    'section.reviews': 'What people say',
    'section.contact': 'Find us',
    // Contact
    'contact.address': 'Daukšos g. 27, Kaunas',
    'contact.hours': 'Mon–Fri 8:00–20:00, Sat–Sun 9:00–21:00',
    'contact.email': 'info@kavinecoco.com',
    // Footer
    'footer.copy': '© 2025 Café Coco · Kaunas, Lithuania',
  },
  lt: {
    // Nav
    'nav.menu': 'Meniu',
    'nav.shop': 'Užsakyti',
    'nav.about': 'Apie mus',
    'nav.contact': 'Kontaktai',
    // Hero
    'hero.title': 'Mėgstamiausias Kauno deserų kavinukė',
    'hero.subtitle': 'Rankų darbo tortai, pyragaičiai ir kavos gėrimai',
    'hero.order': 'Užsakyti',
    'hero.menu': 'Žiūrėti meniu',
    // Quick actions
    'qa.order.title': 'Užsakyti deserus',
    'qa.order.text': 'Individualūs tortai ir pyragaičiai atsiėmimui ar pristatymui. 3 dienų išankstinis.',
    'qa.order.link': 'Užsakyti →',
    'qa.hours.title': 'Darbo laikas',
    'qa.hours.text': 'Pr–Pn 8:00–20:00 · Š–S 9:00–21:00',
    'qa.find.title': 'Raskite mus',
    'qa.find.text': 'Daukšos g. 27, Kaunas · 5 min nuo Senamiesčio',
    'qa.find.link': 'Nuoroda →',
    // About
    'about.eyebrow': 'Mūsų istorija',
    'about.title': 'Gaminame su meile Kaune',
    'about.p1': 'Coco's gimė kaip maža aistringa idėja — svajonė atnešti sąžiningą, gražų kepimą į Kauną. Kiekvienas meniu patiekalas gaminamas rankomis iš kokybiškai ingredientų.',
    'about.p2': 'Nuo mūsų firminių Basque sūrio pyragų iki sezoninių tartų — visą viską kepame šviežią kiekvieną rytą.',
    // Section headers
    'section.discover': 'Atraskite Coco\'s',
    'section.discover.sub': 'Viskas, ką reikia žinoti',
    'section.reviews': 'Ką sako žmonės',
    'section.contact': 'Raskite mus',
    // Contact
    'contact.address': 'Daukšos g. 27, Kaunas',
    'contact.hours': 'Pr–Pn 8:00–20:00, Š–S 9:00–21:00',
    'contact.email': 'info@kavinecoco.com',
    // Footer
    'footer.copy': '© 2025 Café Coco · Kaunas, Lietuva',
  }
};

let currentLang = localStorage.getItem('coco_lang') || 'en';

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = siteTranslations[currentLang][key] || siteTranslations['en'][key];
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });

  // Update lang button text
  document.querySelectorAll('#languageToggle, #languageToggleMobile').forEach(btn => {
    if (btn) btn.textContent = currentLang === 'en' ? 'LT' : 'EN';
  });

  // Update html lang attribute
  document.documentElement.lang = currentLang;
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'lt' : 'en';
  localStorage.setItem('coco_lang', currentLang);
  applyTranslations();
}

// ============================================
// MAIN INIT
// ============================================
document.addEventListener('DOMContentLoaded', function () {

  // Apply translations on load
  applyTranslations();

  // Wire up language toggles
  const langDesktop = document.getElementById('languageToggle');
  const langMobile = document.getElementById('languageToggleMobile');
  if (langDesktop) langDesktop.addEventListener('click', toggleLanguage);
  if (langMobile) langMobile.addEventListener('click', toggleLanguage);

  // ===== Navbar Scroll Effect =====
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== Mobile burger menu =====
  const menuToggle = document.getElementById('menuToggle');
  const dropdownLinks = document.querySelector('.dropdown-links');

  if (menuToggle && dropdownLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      dropdownLinks.classList.toggle('active');
    });

    document.querySelectorAll('.dropdown-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        dropdownLinks.classList.remove('active');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        menuToggle.classList.remove('open');
        dropdownLinks.classList.remove('active');
      }
    });
  }

  // ===== Hero Slider =====
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  function nextSlide() {
    if (slides.length > 0) {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }
  }

  if (slides.length > 0) setInterval(nextSlide, 5000);

  // ===== Back to Top =====
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', function () {
    if (backToTop) {
      if (window.scrollY > 500) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        window.scrollTo({ top: target.offsetTop - navbarHeight, behavior: 'smooth' });
      }
    });
  });

  // ===== Load Reviews =====
  async function loadReviews() {
    const summaryEl = document.getElementById('reviews-summary');
    const gridEl = document.getElementById('reviews-grid');
    if (!summaryEl || !gridEl) return;

    try {
      const response = await fetch('/api/reviews');
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      renderReviews(data.reviews, data.summary, summaryEl, gridEl);
    } catch (error) {
      const fallback = [
        { author: 'Agnė K.', rating: 5, text: 'Jaukiausia kavinė Kaune! Pyragaičiai neapsakomai skanūs.', date: '2025-03-15' },
        { author: 'Tomas K.', rating: 5, text: 'Best Basque cheesecake I\'ve ever had. A true hidden gem in Kaunas.', date: '2025-03-10' },
        { author: 'Gabija S.', rating: 5, text: 'Nuostabi vieta ramiai popietei. Personalas labai draugiškas.', date: '2025-02-28' },
      ];
      renderReviews(fallback, { total: fallback.length, average: 5.0 }, summaryEl, gridEl);
    }
  }

  function renderReviews(reviews, summary, summaryEl, gridEl) {
    const stars = '★'.repeat(Math.round(summary.average)) + '☆'.repeat(5 - Math.round(summary.average));
    summaryEl.innerHTML = `
      <div class="reviews-average">
        <span class="reviews-rating-number">${summary.average}</span>
        <div class="reviews-stars">${stars}</div>
        <span class="reviews-total">Based on ${summary.total} reviews</span>
      </div>`;

    gridEl.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-header">
          <span class="review-author">${r.author}</span>
          <span class="review-rating">${'★'.repeat(Math.round(r.rating))}${'☆'.repeat(5 - Math.round(r.rating))}</span>
        </div>
        <p class="review-text">${r.text}</p>
        <span class="review-date">${r.date}</span>
      </div>`).join('');
  }

  loadReviews();

  // ===== Contact Form =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = {
        name: this.querySelector('#name')?.value || '',
        email: this.querySelector('#email')?.value || '',
        phone: this.querySelector('#phone')?.value || '',
        message: this.querySelector('#message')?.value || '',
      };

      if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in your name, email, and message.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.success) {
          const msg = document.createElement('div');
          msg.className = 'form-success';
          msg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! We\'ll get back to you soon.';
          msg.style.cssText = 'background:#d4edda;color:#155724;padding:1rem;border-radius:8px;margin-top:1rem;text-align:center;font-weight:500;';
          this.appendChild(msg);
          this.reset();
          setTimeout(() => msg.remove(), 6000);
        } else {
          alert(result.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        alert('Could not send message. Please email us directly at info@kavinecoco.com');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // ===== Hover Animations =====
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => { card.style.transform = 'translateX(10px)'; });
    card.addEventListener('mouseleave', () => { card.style.transform = 'translateX(0)'; });
  });

  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => { link.style.transform = 'translateY(-5px)'; });
    link.addEventListener('mouseleave', () => { link.style.transform = 'translateY(0)'; });
  });

  // ===== Intersection Observer Fade-in =====
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-in'); observer.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('section').forEach(s => observer.observe(s));

  window.addEventListener('load', () => document.body.classList.add('loaded'));

  console.log('🍪 Café Coco website loaded!');
});
