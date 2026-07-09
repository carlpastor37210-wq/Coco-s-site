/* ========================================
   Café Coco Website - JavaScript
   kavinecoco.com
   ======================================== */

console.log("✅ script.js is running!");

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

// ===== Load Google Reviews =====
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
        console.warn('Reviews API unavailable, using static fallback');
        // Hardcoded backup
        const fallback = [
            { author: 'Agnė K.', rating: 5, text: 'Jaukiausia kavinė Kaune! Pyragaičiai neapsakomai skanūs, o kava — tiesiog tobula.', date: '2025-03-15' },
            { author: 'Tomas K.', rating: 5, text: 'Best Basque cheesecake I\'ve ever had. A true hidden gem in Kaunas.', date: '2025-03-10' },
            { author: 'Gabija S.', rating: 4.5, text: 'Nuostabi vieta ramiai popietei. Personalas labai draugiškas.', date: '2025-02-28' }
        ];
        renderReviews(fallback, { total: fallback.length, average: 4.8 }, summaryEl, gridEl);
    }
}

function renderReviews(reviews, summary, summaryEl, gridEl) {
    // Summary
    const stars = '★'.repeat(Math.round(summary.average)) + '☆'.repeat(5 - Math.round(summary.average));
    summaryEl.innerHTML = `
        <div class="reviews-average">
            <span class="reviews-rating-number">${summary.average}</span>
            <div class="reviews-stars">${stars}</div>
            <span class="reviews-total">Based on ${summary.total} reviews</span>
        </div>
    `;

    // Grid
    gridEl.innerHTML = reviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-author">${r.author}</span>
                <span class="review-rating">${'★'.repeat(Math.round(r.rating))}${'☆'.repeat(5 - Math.round(r.rating))}</span>
            </div>
            <p class="review-text">${r.text}</p>
            <span class="review-date">${r.date}</span>
        </div>
    `).join('');
}

// Call it on load
loadReviews();


// Small helper: prevents broken layouts / injection from review text
function escapeHtml(str = "") {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Run it now — DOM is already ready
loadReviews();
    
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

// ===== Contact Form =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = {
            name: this.querySelector('#name')?.value || '',
            email: this.querySelector('#email')?.value || '',
            phone: this.querySelector('#phone')?.value || '',
            message: this.querySelector('#message')?.value || ''
        };

        // Basic validation
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
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                // Show success inline
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! We\'ll get back to you soon.';
                successMsg.style.cssText = `
                    background: #d4edda; color: #155724; padding: 1rem; 
                    border-radius: 8px; margin-top: 1rem; text-align: center;
                    font-weight: 500;
                `;
                this.appendChild(successMsg);
                this.reset();
                
                setTimeout(() => successMsg.remove(), 6000);
            } else {
                alert(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            alert('Could not send message. Please email us directly at info@kavinecoco.com');
            console.error('Contact form error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
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
