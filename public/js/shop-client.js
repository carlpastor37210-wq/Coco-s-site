// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  en: {
    orderTitle: "Order Our Desserts",
    orderSubtitle: "Fresh handmade desserts for pickup or delivery in Kaunas",
    advanceOrder: "Minimum 3 days advance order",
    deliveryAvailable: "Delivery available in Kaunas area",
    filterAll: "All",
    filterCakes: "Cakes",
    filterBars: "Bars & Cookies",
    filterVegan: "Vegan Options",
    yourOrder: "Your Order",
    cartEmpty: "Your cart is empty",
    subtotal: "Subtotal:",
    deliveryFeeNote: "Delivery fee calculated at checkout",
    clearCart: "Clear cart",
    proceedCheckout: "Proceed to Checkout",
    completeOrder: "Complete Your Order",
    minAdvance: "Minimum 3 days advance notice required",
    customerInfo: "Customer Information",
    fullName: "Full Name *",
    email: "Email *",
    phone: "Phone *",
    orderType: "Order Type",
    pickup: "Pick-up",
    delivery: "Delivery",
    pickupDetails: "Pick-up Details",
    pickupDate: "Pick-up Date *",
    preferredTime: "Preferred Time *",
    selectTime: "Select time",
    deliveryDetails: "Delivery Details",
    deliveryAddress: "Delivery Address *",
    deliveryDate: "Delivery Date *",
    specialRequests: "Special Requests",
    specialRequestsPlaceholder: "E.g., extra napkins, specific dietary requirements, gift wrapping...",
    orderSummary: "Order Summary",
    deliveryLabel: "Delivery:",
    total: "Total:",
    placeOrder: "Place Order",
    orderSuccess: "Order Placed Successfully!",
    orderThankYou: "Thank you for your order! We'll confirm it shortly via email.",
    confirmationSent: "A confirmation has been sent to",
    continueShopping: "Continue Shopping",
    placingOrder: "Placing your order...",
    addToCart: "Add",
    contains: "Contains:",
    selectSize: "Select size:",
    addToCartBtn: "Add to Cart",
    closeModal: "Close",
  },
  lt: {
    orderTitle: "Užsakykite mūsų deserus",
    orderSubtitle: "Šviežiai pagaminti desertai atsiėmimui ar pristatymui Kaune",
    advanceOrder: "Minimalus 3 dienų išankstinis užsakymas",
    deliveryAvailable: "Pristatymas Kauno mieste",
    filterAll: "Visi",
    filterCakes: "Tortai",
    filterBars: "Batonėliai & Sausainiai",
    filterVegan: "Veganiški",
    yourOrder: "Jūsų užsakymas",
    cartEmpty: "Krepšelis tuščias",
    subtotal: "Tarpinė suma:",
    deliveryFeeNote: "Pristatymo mokestis skaičiuojamas atsiskaitymo metu",
    clearCart: "Išvalyti krepšelį",
    proceedCheckout: "Pereiti prie apmokėjimo",
    completeOrder: "Užbaikite užsakymą",
    minAdvance: "Būtinas minimalus 3 dienų išankstinis pranešimas",
    customerInfo: "Kliento informacija",
    fullName: "Vardas Pavardė *",
    email: "El. paštas *",
    phone: "Telefonas *",
    orderType: "Užsakymo tipas",
    pickup: "Atsiėmimas",
    delivery: "Pristatymas",
    pickupDetails: "Atsiėmimo informacija",
    pickupDate: "Atsiėmimo data *",
    preferredTime: "Pageidaujamas laikas *",
    selectTime: "Pasirinkite laiką",
    deliveryDetails: "Pristatymo informacija",
    deliveryAddress: "Pristatymo adresas *",
    deliveryDate: "Pristatymo data *",
    specialRequests: "Ypatingi pageidavimai",
    specialRequestsPlaceholder: "Pvz., papildomos servetėlės, specialūs mitybos reikalavimai, dovanų pakavimas...",
    orderSummary: "Užsakymo suvestinė",
    deliveryLabel: "Pristatymas:",
    total: "Viso:",
    placeOrder: "Pateikti užsakymą",
    orderSuccess: "Užsakymas pateiktas sėkmingai!",
    orderThankYou: "Ačiū už jūsų užsakymą! Netrukus patvirtinsime jį el. paštu.",
    confirmationSent: "Patvirtinimas išsiųstas",
    continueShopping: "Tęsti apsipirkimą",
    placingOrder: "Pateikiamas užsakymas...",
    addToCart: "Pridėti",
    contains: "Sudėtyje:",
    selectSize: "Pasirinkite dydį:",
    addToCartBtn: "Į krepšelį",
    closeModal: "Uždaryti",
  }
};

let currentLang = localStorage.getItem('coco_lang') || 'en';

function t(key) {
  return translations[currentLang][key] || translations['en'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  // Update filter buttons and re-render products to apply language swap
  renderProducts(document.querySelector('.filter-btn.active')?.dataset.category || 'all');
  updateCartUI(); // Update cart text language
}

// ============================================
// PRODUCT DATA — loads from admin or defaults
// ============================================
const dessertPlaceholderImage = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80';

const defaultProducts = [
  { id: 1, price: 2.50, category: "bars", hasVariants: false, variants: [], 
    name_en: "Banana bread", name_lt: "Bananų duona", 
    description_en: "Soft, cozy loaf with a rich banana flavour and a tender crumb.", description_lt: "Minkšta, jauki duonelė su sodriu bananų skoniu ir švelnia tekstūra.", 
    allergens_en: "Dairy, Eggs, Gluten", allergens_lt: "Pieno produktai, Kiaušiniai, Glitimas", badge_en: "Bestseller", badge_lt: "Populiariausias" },
  { id: 2, price: 1.20, category: "bars", hasVariants: false, variants: [], 
    name_en: "Choco Chips Cookies", name_lt: "Šokoladiniai sausainiai", 
    description_en: "Chunky cookies with buttery dough and melted chocolate pockets.", description_lt: "Sausainiai iš sviestinės tešlos su tirpstančio šokolado gabaliukais.", 
    allergens_en: "Dairy, Eggs, Gluten", allergens_lt: "Pieno produktai, Kiaušiniai, Glitimas", badge_en: "Freshly baked", badge_lt: "Šviežiai iškepta" },
  { id: 3, price: 3.50, category: "bars", hasVariants: false, variants: [], 
    name_en: "Tinginys (Raspberry / Orange-Choco)", name_lt: "Tinginys (Avietių / Apelsinų-šokoladas)", 
    description_en: "A delicate, sliceable dessert with fruit and chocolate notes.", description_lt: "Subtilus, pjaustomas desertas su vaisių ir šokolado natomis.", 
    allergens_en: "Dairy, Gluten", allergens_lt: "Pieno produktai, Glitimas", badge_en: "Seasonal", badge_lt: "Sezoninis" },
  { id: 4, price: 3.20, category: "bars", hasVariants: false, variants: [], 
    name_en: "Brownies", name_lt: "Brauniai (Brownies)", 
    description_en: "Fudgy brownies with a shiny crackled top and deep chocolate flavour.", description_lt: "Sodrūs brauniai su traškia viršūne ir giliu šokolado skoniu.", 
    allergens_en: "Dairy, Eggs, Gluten", allergens_lt: "Pieno produktai, Kiaušiniai, Glitimas", badge_en: "Classic", badge_lt: "Klasika" },
  { id: 5, price: 3.20, category: "bars", hasVariants: false, variants: [], 
    name_en: "Lemonies (Lemon brownies)", name_lt: "Citrininiai brauniai (Lemonies)", 
    description_en: "Bright lemony brownies with a soft, tangy finish.", description_lt: "Gaivūs citrininiai brauniai su minkštu, saldžiarūgščiu poskoniu.", 
    allergens_en: "Dairy, Eggs, Gluten", allergens_lt: "Pieno produktai, Kiaušiniai, Glitimas", badge_en: "New", badge_lt: "Naujiena" },
  { id: 6, price: 5.00, category: "cakes", hasVariants: true, variants: [{ label: "Small (4-6 pax)", priceModifier: 0 }, { label: "Medium (8-10 pax)", priceModifier: 8 }, { label: "Large (12-14 pax)", priceModifier: 18 }], 
    name_en: "Basque Cheesecake (GF)", name_lt: "Baskų Sūrio pyragas (GF)", 
    description_en: "A creamy baked cheesecake with a caramelised top and gluten-free base.", description_lt: "Kreminis keptas sūrio pyragas su karamelizuota viršūne ir pagrindu be glitimo.", 
    allergens_en: "Dairy, Eggs", allergens_lt: "Pieno produktai, Kiaušiniai", badge_en: "GF", badge_lt: "Be glitimo" },
  { id: 7, price: 5.00, category: "cakes", hasVariants: true, variants: [{ label: "Small (4-6 pax)", priceModifier: 0 }, { label: "Medium (8-10 pax)", priceModifier: 8 }, { label: "Large (12-14 pax)", priceModifier: 18 }], 
    name_en: "Pistachio Cheesecake (GF)", name_lt: "Pistacijų Sūrio pyragas (GF)", 
    description_en: "Nutty, elegant, and rich with roasted pistachio flavour.", description_lt: "Riešutinis, elegantiškas pyragas su sodriu skrudintų pistacijų skoniu.", 
    allergens_en: "Dairy", allergens_lt: "Pieno produktai", badge_en: "GF", badge_lt: "Be glitimo" },
  { id: 8, price: 4.50, category: "cakes", hasVariants: true, variants: [{ label: "Small (4-6 pax)", priceModifier: 0 }, { label: "Medium (8-10 pax)", priceModifier: 7 }, { label: "Large (12-14 pax)", priceModifier: 15 }], 
    name_en: "Biscoff Cheesecake", name_lt: "Biscoff Sūrio pyragas", 
    description_en: "Silky cheesecake layered with caramelised biscuit notes.", description_lt: "Šilkinis sūrio pyragas su karamelizuotų sausainių natomis.", 
    allergens_en: "Dairy, Gluten", allergens_lt: "Pieno produktai, Glitimas", badge_en: "Fan favourite", badge_lt: "Mėgstamiausias" },
  { id: 9, price: 4.00, category: "cakes", hasVariants: true, variants: [{ label: "Small (4-6 pax)", priceModifier: 0 }, { label: "Medium (8-10 pax)", priceModifier: 7 }, { label: "Large (12-14 pax)", priceModifier: 15 }], 
    name_en: "Carrot Cake", name_lt: "Morkų tortas", 
    description_en: "Moist carrot cake with warming spices and cream cheese frosting.", description_lt: "Drėgnas morkų pyragas su šildančiais prieskoniais ir kreminio sūrio glaistu.", 
    allergens_en: "Dairy, Eggs, Gluten", allergens_lt: "Pieno produktai, Kiaušiniai, Glitimas", badge_en: "Classic", badge_lt: "Klasika" },
  { id: 10, price: 4.50, category: "cakes", hasVariants: true, variants: [{ label: "Small (4-6 pax)", priceModifier: 0 }, { label: "Medium (8-10 pax)", priceModifier: 7 }, { label: "Large (12-14 pax)", priceModifier: 15 }], 
    name_en: "Poppy Seed/Lemon Cake", name_lt: "Aguonų/citrinų tortas", 
    description_en: "A fragrant cake with citrus brightness and a tender crumb.", description_lt: "Kvapnus tortas su citrusinių vaisių gaivumu ir švelnia tekstūra.", 
    allergens_en: "Dairy, Eggs, Gluten", allergens_lt: "Pieno produktai, Kiaušiniai, Glitimas", badge_en: "Seasonal", badge_lt: "Sezoninis" },
  { id: 11, price: 4.00, category: "cakes", hasVariants: true, variants: [{ label: "Small (4-6 pax)", priceModifier: 0 }, { label: "Medium (8-10 pax)", priceModifier: 7 }, { label: "Large (12-14 pax)", priceModifier: 15 }], 
    name_en: "Mousse Cake (Mango / Strawberry)", name_lt: "Muso tortas (Mango / Braškių)", 
    description_en: "Light mousse layers with bold colour and layered flavour.", description_lt: "Lengvi muso sluoksniai su ryškia spalva ir giliu skoniu.", 
    allergens_en: "Dairy, Eggs, Gluten", allergens_lt: "Pieno produktai, Kiaušiniai, Glitimas", badge_en: "Limited", badge_lt: "Ribotas kiekis" },
  { id: 12, price: 5.00, category: "cakes", hasVariants: true, variants: [{ label: "Small (4-6 pax)", priceModifier: 0 }, { label: "Medium (8-10 pax)", priceModifier: 8 }, { label: "Large (12-14 pax)", priceModifier: 18 }], 
    name_en: "Chocolate Fudge", name_lt: "Šokoladinis Fudge tortas", 
    description_en: "A rich chocolate cake with smooth fudge filling and ganache finish.", description_lt: "Sodrus šokoladinis tortas su švelniu įdaru ir ganašo apdaila.", 
    allergens_en: "Dairy, Eggs, Gluten", allergens_lt: "Pieno produktai, Kiaušiniai, Glitimas", badge_en: "House special", badge_lt: "Firminis" },
  { id: 13, price: 5.00, category: "vegan", hasVariants: false, variants: [], 
    name_en: "Vegan Tiramisu", name_lt: "Veganiškas Tiramisu", 
    description_en: "Creamy vegan tiramisu with espresso depth and a soft finish.", description_lt: "Kreminis veganiškas tiramisu su espreso gyliu ir švelniu poskoniu.", 
    allergens_en: "Cashews", allergens_lt: "Anakardžiai", badge_en: "Vegan", badge_lt: "Veganiškas" },
  { id: 14, price: 4.50, category: "vegan", hasVariants: false, variants: [], 
    name_en: "Vegan Cheesecake (Blueberry/Cardamom)", name_lt: "Veganiškas Sūrio pyragas (Mėlynių/Kardamono)", 
    description_en: "Silky vegan cheesecake with berry and cardamom notes.", description_lt: "Šilkinis veganiškas sūrio pyragas su uogų ir kardamono natomis.", 
    allergens_en: "Almonds, Cashews · Sugar-free", allergens_lt: "Migdolai, Anakardžiai · Be cukraus", badge_en: "Sugar-free", badge_lt: "Be cukraus" },
  { id: 15, price: 4.50, category: "vegan", hasVariants: false, variants: [], 
    name_en: "Vegan Cheesecake (Raspberry/Mango)", name_lt: "Veganiškas Sūrio pyragas (Aviečių/Mango)", 
    description_en: "A bright, fruity dessert with tropical depth and a creamy texture.", description_lt: "Ryškus, vaisinis desertas su atogrąžų gyliu ir kremine tekstūra.", 
    allergens_en: "Almonds, Cashews · Sugar-free", allergens_lt: "Migdolai, Anakardžiai · Be cukraus", badge_en: "Vegan", badge_lt: "Veganiškas" },
];

function getProducts() {
  const saved = localStorage.getItem('coco_products');
  if (saved) {
    try { 
      const parsed = JSON.parse(saved); 
      // SAFETY CHECK: Make absolutely sure the saved data is actually an array
      // before trying to load it. If it's corrupted, ignore it.
      if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
      }
    } catch(e) { 
      console.error("Ignored corrupted saved products", e); 
    }
  }
  // If no safe data is found, always load the default products
  return defaultProducts;
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(filter = 'all') {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;

  // Update filter button labels
  const filterLabels = { all: t('filterAll'), cakes: t('filterCakes'), bars: t('filterBars'), vegan: t('filterVegan') };
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.textContent = filterLabels[btn.dataset.category] || btn.textContent;
  });

  productGrid.innerHTML = '';
  const products = getProducts();
  const filtered = products.filter(p => filter === 'all' || p.category === filter);

  if (filtered.length === 0) {
    productGrid.innerHTML = '<div class="empty-products">No desserts match this category yet.</div>';
    return;
  }

  filtered.forEach(p => {
    // Dynamic Language Fallbacks (Automatically checks EN/LT, falls back to basic if from Admin panel)
    const pName = p[`name_${currentLang}`] || p.name || '';
    const pDesc = p[`description_${currentLang}`] || p.description || '';
    const pBadge = p[`badge_${currentLang}`] || p.badge || '';
    const pAllergens = p[`allergens_${currentLang}`] || p.allergens || '';

    const card = document.createElement('div');
    card.className = 'menu-item';
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="product-image">
        <img src="${p.image || dessertPlaceholderImage}" alt="${pName}" loading="lazy">
      </div>
      <div class="item-content">
        <div class="item-info">
          <div class="product-meta">
            ${pBadge ? `<span class="product-badge">${pBadge}</span>` : ''}
          </div>
          <span class="item-name">${pName}</span>
          <p class="product-description">${pDesc}</p>
          <span class="item-allergens">${t('contains')} ${pAllergens}</span>
        </div>
        <div class="item-actions">
          <span class="item-price">${p.price.toFixed(2).replace('.', ',')} €</span>
          <button class="add-btn view-btn">${t('addToCart')}</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// ============================================
// PRODUCT MODAL
// ============================================
function openProductModal(productId) {
  const products = getProducts();
  const p = products.find(x => x.id == productId);
  if (!p) return;

  const modal = document.getElementById('productModal');
  const img = document.getElementById('modalImg');
  const badge = document.getElementById('modalBadge');
  const name = document.getElementById('modalName');
  const desc = document.getElementById('modalDesc');
  const allergens = document.getElementById('modalAllergens');
  const priceEl = document.getElementById('modalPrice');
  const variantSection = document.getElementById('modalVariantSection');
  const variantSelect = document.getElementById('modalVariantSelect');
  const variantLabel = document.getElementById('modalVariantLabel');

  // Dynamic language references
  img.src = p.image || dessertPlaceholderImage;
  img.alt = p[`name_${currentLang}`] || p.name;
  badge.textContent = p[`badge_${currentLang}`] || p.badge || '';
  name.textContent = p[`name_${currentLang}`] || p.name;
  desc.textContent = p[`description_${currentLang}`] || p.description;
  allergens.textContent = `${t('contains')} ${p[`allergens_${currentLang}`] || p.allergens}`;
  priceEl.textContent = `${p.price.toFixed(2).replace('.', ',')} €`;
