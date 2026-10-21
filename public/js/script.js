/* ========================================
   Café Coco — script.js  (fixed)
   ======================================== */

// ============================================
// TRANSLATIONS
// ============================================
const siteTranslations = {
  en: {
    'nav.home':'Home','nav.about':'About','nav.menu':'Menu','nav.shop':'Shop','nav.contact':'Contact',
    'hero.title':"Welcome to Coco's Café",
    'hero.subtitle':"Where every cup tells a story. Discover our handcrafted coffee, fresh pastries, and warm hospitality in the heart of Kaunas.",
    'hero.cta.order':'Order Desserts','hero.cta.visit':'Visit Us',
    'qa1.title':'Order ahead','qa1.text':'Pre-order cakes, bars, and seasonal desserts for pickup or delivery.','qa1.link':'Browse the shop',
    'qa2.title':'Visit us','qa2.text':'Stop by Daukšos g. 27 for coffee, pastries, and a cozy break.','qa2.link':'See opening hours',
    'qa3.title':'Follow the story','qa3.text':'Stay connected for new seasonal specials and café updates.','qa3.link':'Follow on Instagram',
    'about.heading':'Our Story','about.subtext':'Bringing the community together through a welcoming space and a shared love of coffee.',
    'about.est':'Est. in Kaunas','about.title':'A Place to Call Home',
    'about.p1':"Coco's Café was born from a simple dream: to create a warm, welcoming space where the community could gather over exceptional coffee. Nestled in the heart of Kaunas, our café combines the charm of a traditional coffee house with modern sensibilities.",
    'about.p2':'We source our beans from local roasters and work closely with farmers to ensure every cup is crafted with care. Our menu features seasonal specialties, artisan pastries, and wholesome dishes made from scratch daily.',
    'about.feat1':'Fresh Roasted Beans','about.feat2':'Daily Baked Goods','about.feat3':'Organic Options','about.feat4':'Made with Love',
    'menu.heading':'What you can find','menu.subtext':'Browse our drinks, discover our food, and see what makes our café moments special.',
    'menu.drinks.title':'Drinks Menu','menu.drinks.text':'From signature coffees to seasonal favourites, explore the drinks that define our café.','menu.drinks.link':'View drinks',
    'menu.food.title':'Food Menu','menu.food.text':'Discover pastries, brunch favourites, and comforting bites made for slow mornings.','menu.food.link':'View food',
    'menu.events.title':'Events & Gallery','menu.events.text':'See the atmosphere of our events, guest gatherings, and special community moments.','menu.events.link':'See gallery',
    'reviews.heading':'What our guests say',
    'contact.heading':'Visit Us','contact.subtext':"We'd love to see you!",
    'contact.address.label':'Address','contact.phone.label':'Phone','contact.email.label':'Email',
    'contact.hours.label':'Opening Hours','contact.hours.value':'Tuesday to Sunday: 10:00 to 20:00','contact.follow':'Follow Us',
    'footer.tagline':'Your cozy corner in Kaunas. Crafting memorable coffee experiences since day one. Join us for a cup and stay a while.',
    'footer.links':'Quick Links','footer.social':'Social Media','footer.contact':'Contact',
    'footer.copy':"© 2025 Coco's Café. All rights reserved. | kavinecoco.com",
  },
  lt: {
    'nav.home':'Pradžia','nav.about':'Apie mus','nav.menu':'Meniu','nav.shop':'Parduotuvė','nav.contact':'Kontaktai',
    'hero.title':"Sveiki atvykę į Coco's Café",
    'hero.subtitle':"Kur kiekvienas puodelis pasakoja istoriją. Atraskite mūsų rankų darbo kavą, šviežius pyragaičius ir šiltą svetingumą Kauno širdyje.",
    'hero.cta.order':'Užsakyti deserus','hero.cta.visit':'Aplankykite mus',
    'qa1.title':'Užsakykite iš anksto','qa1.text':'Iš anksto užsakykite tortus, batonėlius ir sezoninius deserus atsiėmimui ar pristatymui.','qa1.link':'Naršyti parduotuvę',
    'qa2.title':'Aplankykite mus','qa2.text':'Užsukite į Daukšos g. 27 kavos, pyragaičių ir jaukios pertraukėlės.','qa2.link':'Darbo laikas',
    'qa3.title':'Sekite naujienas','qa3.text':'Likite prisijungę dėl naujų sezoninių pasiūlymų ir kavinės naujienų.','qa3.link':'Sekti Instagram',
    'about.heading':'Mūsų istorija','about.subtext':'Suburiame bendruomenę jaukioje erdvėje ir bendros meilės kavai dėka.',
    'about.est':'Įkurta Kaune','about.title':'Vieta, kurią galite vadinti namais',
    'about.p1':"Coco's Café gimė iš paprasto svajojimo: sukurti šiltą, svetingą erdvę, kurioje bendruomenė galėtų susirinkti prie išskirtinės kavos. Įsikūrusi Kauno širdyje, mūsų kavinė sujungia tradicinio kavos namų žavesį su moderniomis vertybėmis.",
    'about.p2':'Kavos pupeles gauname iš vietinių skrudintojų ir glaudžiai bendradarbiaujame su ūkininkais, kad kiekvienas puodelis būtų paruoštas su rūpesčiu. Mūsų meniu – sezoniniai specialieji patiekalai, artisaniniai pyragaičiai ir sveiki patiekalai, gaminti kasdien.',
    'about.feat1':'Šviežiai skrudinti pupeliai','about.feat2':'Kasdien kepami gaminiai','about.feat3':'Ekologiški pasirinkimai','about.feat4':'Gaminami su meile',
    'menu.heading':'Ką galite rasti','menu.subtext':'Naršykite gėrimus, atraskite maistą ir sužinokite, kas mūsų kavinėje ypatinga.',
    'menu.drinks.title':'Gėrimų meniu','menu.drinks.text':'Nuo firminių kavų iki sezoninių mėgstamiausių – tyrinėkite gėrimus, kurie apibrėžia mūsų kavinę.','menu.drinks.link':'Žiūrėti gėrimus',
    'menu.food.title':'Maisto meniu','menu.food.text':'Atraskite pyragaičius, pusryčių mėgstamiausius ir jaukius kąsnelius lėtiems rytiems.','menu.food.link':'Žiūrėti maistą',
    'menu.events.title':'Renginiai ir galerija','menu.events.text':'Pamatykite mūsų renginių, svečių susibūrimų ir ypatingų bendruomenės akimirkų atmosferą.','menu.events.link':'Žiūrėti galeriją',
    'reviews.heading':'Ką sako mūsų svečiai',
    'contact.heading':'Aplankykite mus','contact.subtext':'Mes džiaugiamės matydami jus!',
    'contact.address.label':'Adresas','contact.phone.label':'Telefonas','contact.email.label':'El. paštas',
    'contact.hours.label':'Darbo laikas','contact.hours.value':'Antradienis–Sekmadienis: 10:00–20:00','contact.follow':'Sekite mus',
    'footer.tagline':'Jūsų jaukus kampelis Kaune. Kuriame įsimintinas kavos patirtis nuo pat pirmosios dienos. Užsukite gerti puodelį.',
    'footer.links':'Greitos nuorodos','footer.social':'Socialiniai tinklai','footer.contact':'Kontaktai',
    'footer.copy':"© 2025 Coco's Café. Visos teisės saugomos. | kavinecoco.com",
  }
};

let currentLang = localStorage.getItem('coco_lang') || 'en';

function st(key) {
  return siteTranslations[currentLang][key] || siteTranslations['en'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = st(key);
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
    else el.textContent = val;
  });
  document.documentElement.lang = currentLang;
  // Button shows what language you'll SWITCH TO
  document.querySelectorAll('#languageToggle, #languageToggleMobile').forEach(btn => {
    if (btn) btn.textContent = currentLang === 'en' ? 'LT' : 'EN';
  });
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'lt' : 'en';
  localStorage.setItem('coco_lang', currentLang);
  applyTranslations();
}

// ============================================
// REVIEWS — hardcoded fallback, no API needed
// ============================================
function loadReviews() {
  const summaryEl = document.getElementById('reviews-summary');
  const gridEl    = document.getElementById('reviews-grid');
  if (!summaryEl || !gridEl) return;

  const reviews = [
    { author: 'Agnė K.',   rating: 5,   text: 'Jaukiausia kavinė Kaune! Pyragaičiai neapsakomai skanūs, o kava — tiesiog tobula.',       date: '2025-03-15' },
    { author: 'Tomas K.',  rating: 5,   text: "Best Basque cheesecake I've ever had. A true hidden gem in Kaunas.",                       date: '2025-03-10' },
    { author: 'Gabija S.', rating: 5,   text: 'Nuostabi vieta ramiai popietei. Personalas labai draugiškas ir dėmesingas.',              date: '2025-02-28' },
  ];
  const avg = 5.0;
  const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

  summaryEl.innerHTML = `
    <div class="reviews-average">
      <span class="reviews-rating-number">${avg}</span>
      <div class="reviews-stars">${stars(avg)}</div>
      <span class="reviews-total">Based on ${reviews.length} reviews</span>
    </div>`;

  gridEl.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="review-author">${r.author}</span>
        <span class="review-rating">${stars(r.rating)}</span>
      </div>
      <p class="review-text">${r.text}</p>
      <span class="review-date">${r.date}</span>
    </div>`).join('');
}

// ============================================
// MAIN INIT — runs as soon as DOM is ready
// ============================================
document.addEventListener('DOMContentLoaded', function () {

  // Apply translations immediately so page renders correctly
  applyTranslations();

  // Load reviews immediately — no API call, no async, just renders
  loadReviews();

  // Language toggles
  document.getElementById('languageToggle')?.addEventListener('click', toggleLanguage);
  document.getElementById('languageToggleMobile')?.addEventListener('click', toggleLanguage);

  // ---- Navbar scroll ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
  }

  // ---- Mobile burger menu ----
  // Uses pointer events so it works on touch screens too
  const menuToggle   = document.getElementById('menuToggle');
  const dropdownLinks = document.querySelector('.dropdown-links');

  if (menuToggle && dropdownLinks) {
    menuToggle.addEventListener('pointerup', (e) => {
      e.preventDefault();
      menuToggle.classList.toggle('open');
      dropdownLinks.classList.toggle('active');
    });

    // Close when a link is tapped
    dropdownLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        dropdownLinks.classList.remove('active');
      });
    });

    // Close when viewport becomes desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        menuToggle.classList.remove('open');
        dropdownLinks.classList.remove('active');
      }
    });
  }

  // ---- Hero slider ----
  const slides = document.querySelectorAll('.hero-slide');
  let current = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }

  // ---- Back to top ----
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 500));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Smooth scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) {
        const offset = navbar ? navbar.offsetHeight : 0;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // ---- Contact form ----
  document.querySelector('.contact-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…'; btn.disabled = true;
    const fd = {
      name:    this.querySelector('#name')?.value    || '',
      email:   this.querySelector('#email')?.value   || '',
      phone:   this.querySelector('#phone')?.value   || '',
      message: this.querySelector('#message')?.value || '',
    };
    if (!fd.name || !fd.email || !fd.message) {
      alert('Please fill in name, email and message.');
      btn.textContent = orig; btn.disabled = false; return;
    }
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fd) });
      const result = await r.json();
      if (result.success) {
        const msg = document.createElement('div');
        msg.style.cssText = 'background:#d4edda;color:#155724;padding:1rem;border-radius:8px;margin-top:1rem;text-align:center;font-weight:500;';
        msg.textContent = "✓ Message sent! We'll get back to you soon.";
        this.appendChild(msg); this.reset(); setTimeout(() => msg.remove(), 6000);
      } else { alert(result.message || 'Something went wrong.'); }
    } catch { alert('Could not send message. Email us at info@kavinecoco.com'); }
    finally { btn.textContent = orig; btn.disabled = false; }
  });

  // ---- Hover effects ----
  document.querySelectorAll('.contact-card').forEach(c => {
    c.addEventListener('mouseenter', () => c.style.transform = 'translateX(10px)');
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
  document.querySelectorAll('.social-link').forEach(l => {
    l.addEventListener('mouseenter', () => l.style.transform = 'translateY(-5px)');
    l.addEventListener('mouseleave', () => l.style.transform = '');
  });

  // ---- Fade-in on scroll ----
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-in'); obs.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('section').forEach(s => obs.observe(s));

  window.addEventListener('load', () => document.body.classList.add('loaded'));
  console.log('🍪 Café Coco loaded!');
});
