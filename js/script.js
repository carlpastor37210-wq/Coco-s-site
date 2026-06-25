/* ========================================
   Café Coco Website - JavaScript
   kavinecoco.com
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Language Toggle =====
    const languageToggle = document.getElementById('languageToggle');
    const languageToggleMobile = document.getElementById('languageToggleMobile');

    if (languageToggle && languageToggleMobile) {
        languageToggle.addEventListener('click', toggleLanguage);
        languageToggleMobile.addEventListener('click', toggleLanguage);

        function toggleLanguage() {
            const currentLang = languageToggle.textContent;
            const newLang = currentLang === 'EN' ? 'LT' : 'EN';
            languageToggle.textContent = newLang;
            languageToggleMobile.textContent = newLang;
            // Add logic to change website language here (e.g., fetch translations)
            console.log(`Language changed to ${newLang}`);
        }
    }

  // --- Mobile burger menu ---
const menuToggle = document.getElementById('menuToggle');
const dropdownLinks = document.querySelector('.dropdown-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');      // animates burger into X
    dropdownLinks.classList.toggle('active'); // slides menu down
});

// Close the menu when a link is tapped
document.querySelectorAll('.dropdown-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        dropdownLinks.classList.remove('active');
    });
});

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

    function prevSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    // Auto-advance slides
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // ===== Back to Top Button =====
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            if (backToTop) backToTop.classList.add('visible');
        } else {
            if (backToTop) backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);

            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Menu Card Hover Effects =====
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    /* ====== Google Reviews ====== */
async function loadReviews() {
  const grid = document.getElementById("reviews-grid");
  const summary = document.getElementById("reviews-summary");
  if (!grid) return;

  try {
    const res = await fetch("/api/reviews");
    if (!res.ok) throw new Error("Bad response");
    const data = await res.json();

    // Summary line: ★ 4.7 · 128 Google reviews
    if (summary && data.rating) {
      summary.innerHTML = `
        <span class="review-stars">${"★".repeat(Math.round(data.rating))}</span>
        <strong>${data.rating.toFixed(1)}</strong>
        · ${data.userRatingCount} Google reviews
      `;
    }

    // Guard: no reviews returned
    if (!data.reviews || data.reviews.length === 0) {
      grid.innerHTML = `<p>No reviews to show yet.</p>`;
      return;
    }

    // Build a card for each review
    grid.innerHTML = data.reviews.map(r => `
      <div class="review-card">
        <div class="review-head">
          <img src="${r.photo || 'https://via.placeholder.com/48'}"
               alt="${escapeHtml(r.author)}"
               loading="lazy"
               referrerpolicy="no-referrer">
          <div>
            <div class="review-author">${escapeHtml(r.author)}</div>
            <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
          </div>
        </div>
        <p class="review-text">${escapeHtml(r.text)}</p>
        <span class="review-time">${escapeHtml(r.time)}</span>
      </div>
    `).join("");

  } catch (err) {
    console.error("Reviews failed to load:", err);
    grid.innerHTML = `<p>Reviews are taking a coffee break ☕ — check back soon.</p>`;
  }
}

// Small helper: prevents broken layouts / injection from review text
function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """);
}

// Run it when the page loads
document.addEventListener("DOMContentLoaded", loadReviews);

    
    // ===== Contact Card Hover Animation =====
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ===== Social Link Hover =====
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ===== Form Validation =====
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#eee';
                }
            });

            if (isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // ===== Add to Cart Button =====
    const addToCartButtons = document.querySelectorAll('.menu-card .btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const card = this.closest('.menu-card');
            const itemName = card ? card.querySelector('h3').textContent : 'Item';

            // Visual feedback
            const originalText = this.textContent;
            this.textContent = '✓ Added!';
            this.style.background = '#d19900';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);

            console.log(`Added to cart: ${itemName}`);
        });
    });

    // ===== Logo Click Animation =====
    const logo = document.querySelector('.logo-container');

    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Preloader =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    console.log('🍪 Café Coco website loaded successfully!');
});
