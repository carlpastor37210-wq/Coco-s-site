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
  renderProducts(document.querySelector('.filter-btn.active')?.dataset.category || 'all');
  updateCartUI();
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
      if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
      }
    } catch(e) { 
      console.error("Ignored corrupted saved products", e); 
    }
  }
  return defaultProducts;
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(filter = 'all') {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;

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

  img.src = p.image || dessertPlaceholderImage;
  img.alt = p[`name_${currentLang}`] || p.name;
  badge.textContent = p[`badge_${currentLang}`] || p.badge || '';
  name.textContent = p[`name_${currentLang}`] || p.name;
  desc.textContent = p[`description_${currentLang}`] || p.description;
  allergens.textContent = `${t('contains')} ${p[`allergens_${currentLang}`] || p.allergens}`;
  priceEl.textContent = `${p.price.toFixed(2).replace('.', ',')} €`;
  priceEl.dataset.basePrice = p.price;

  if (p.hasVariants && p.variants && p.variants.length > 0) {
    variantSection.style.display = 'block';
    variantLabel.textContent = t('selectSize');
    variantSelect.innerHTML = p.variants.map((v, i) =>
      `<option value="${i}" data-modifier="${v.priceModifier}">${v.label}${v.priceModifier > 0 ? ' (+' + v.priceModifier.toFixed(2).replace('.', ',') + ' €)' : ''}</option>`
    ).join('');
    variantSelect.onchange = () => {
      const selected = variantSelect.options[variantSelect.selectedIndex];
      const mod = parseFloat(selected.dataset.modifier) || 0;
      const newPrice = p.price + mod;
      priceEl.textContent = `${newPrice.toFixed(2).replace('.', ',')} €`;
    };
  } else {
    variantSection.style.display = 'none';
    variantSelect.innerHTML = '';
  }

  document.getElementById('modalAddBtn').dataset.productId = p.id;
  document.getElementById('modalAddBtn').textContent = t('addToCartBtn');
  document.getElementById('modalCloseBtn').textContent = t('closeModal');

  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.classList.remove('modal-open');
}

// ============================================
// SHOP STATE
// ============================================
let cart = [];
let orderType = 'pickup';

function loadCart() {
  const saved = localStorage.getItem('cafe_cart');
  if (saved) { try { cart = JSON.parse(saved); } catch(e) {} }
}

function saveCart() {
  localStorage.setItem('cafe_cart', JSON.stringify(cart));
}

function addToCart(productId, variantIndex) {
  const products = getProducts();
  const p = products.find(x => x.id == productId);
  if (!p) return;

  let finalPrice = p.price;
  let sizeLabel = 'Standard';

  if (p.hasVariants && p.variants && p.variants.length > 0) {
    const vi = variantIndex !== undefined ? variantIndex : 0;
    const variant = p.variants[vi];
    if (variant) {
      finalPrice = p.price + (variant.priceModifier || 0);
      sizeLabel = variant.label;
    }
  }

  const key = `${p.id}_${sizeLabel}`;
  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ key, id: p.id, name: p.name, price: finalPrice, size: sizeLabel, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  
  const translatedName = p[`name_${currentLang}`] || p.name;
  showCartNotification(translatedName);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function updateCartQuantity(index, newQty) {
  if (newQty <= 0) { removeFromCart(index); }
  else { cart[index].quantity = newQty; saveCart(); updateCartUI(); }
}

function getCartTotal() {
  return cart.reduce((t, item) => t + (item.price * item.quantity), 0);
}

function getCartItemCount() {
  return cart.reduce((t, item) => t + item.quantity, 0);
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartContainer = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const emptyMessage = document.getElementById('emptyCartMessage');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (!cartContainer || !cartCount || !cartTotal) return;

  const itemCount = getCartItemCount();
  cartCount.textContent = itemCount > 99 ? '99+' : itemCount;

  if (cart.length === 0) {
    cartContainer.innerHTML = '';
    if (emptyMessage) emptyMessage.style.display = 'block';
    cartTotal.textContent = '0,00 €';
    if (checkoutBtn) checkoutBtn.disabled = true;
    if (clearCartBtn) clearCartBtn.style.display = 'none';
    return;
  }

  if (emptyMessage) emptyMessage.style.display = 'none';
  if (checkoutBtn) checkoutBtn.disabled = false;
  if (clearCartBtn) clearCartBtn.style.display = 'block';

  cartContainer.innerHTML = cart.map((item, index) => {
    const liveProduct = getProducts().find(p => p.id == item.id);
    const displayName = liveProduct ? (liveProduct[`name_${currentLang}`] || liveProduct.name || item.name) : item.name;

    return `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${displayName}</div>
        <div class="cart-item-meta">${item.size} • ${item.price.toFixed(2).replace('.', ',')} € each</div>
        <div class="cart-item-price">${(item.price * item.quantity).toFixed(2).replace('.', ',')} €</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn minus" data-action="decrease" data-index="${index}" aria-label="Decrease">−</button>
        <span class="qty-display">${item.quantity}</span>
        <button class="qty-btn plus" data-action="increase" data-index="${index}" aria-label="Increase">+</button>
        <button class="remove-item" data-action="remove" data-index="${index}" aria-label="Remove">✕</button>
      </div>
    </div>
  `}).join('');

  cartTotal.textContent = getCartTotal().toFixed(2).replace('.', ',') + ' €';
}

function showCartNotification(name) {
  const n = document.createElement('div');
  n.className = 'cart-notification';
  n.textContent = `✓ ${name} added!`;
  document.body.appendChild(n);
  setTimeout(() => n.classList.add('show'), 10);
  setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 300); }, 2000);
}

function updateSummary() {
  const subtotal = getCartTotal();
  const el = id => document.getElementById(id);
  if (el('summarySubtotal')) el('summarySubtotal').textContent = subtotal.toFixed(2).replace('.', ',') + ' €';

  let deliveryFee = 0;
  if (orderType === 'delivery') {
    const feeEl = el('totalDeliveryFee');
    if (feeEl) deliveryFee = parseFloat(feeEl.textContent.replace(',', '.')) || 0;
    if (el('summaryDeliveryRow')) el('summaryDeliveryRow').style.display = 'flex';
    if (el('summaryDelivery')) el('summaryDelivery').textContent = deliveryFee.toFixed(2).replace('.', ',') + ' €';
  } else {
    if (el('summaryDeliveryRow')) el('summaryDeliveryRow').style.display = 'none';
    if (el('summaryDelivery')) el('summaryDelivery').textContent = '0,00 €';
  }

  if (el('summaryTotal')) el('summaryTotal').textContent = (subtotal + deliveryFee).toFixed(2).replace('.', ',') + ' €';

  const summaryItems = el('summaryItems');
  if (summaryItems) {
    summaryItems.innerHTML = cart.map(item => {
      const liveProduct = getProducts().find(p => p.id == item.id);
      const displayName = liveProduct ? (liveProduct[`name_${currentLang}`] || liveProduct.name || item.name) : item.name;
      
      return `
      <div class="summary-item">
        <span>${displayName}${item.size !== 'Standard' ? ' ('+item.size+')' : ''} ×${item.quantity}</span>
        <span>${(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
      </div>
    `}).join('');
  }
}

function validateOrder(formData) {
  if (!formData.customerName) { alert('Please enter your name.'); return false; }
  if (!formData.customerEmail || !formData.customerEmail.includes('@')) { alert('Please enter a valid email.'); return false; }
  if (!formData.customerPhone || formData.customerPhone.length < 8) { alert('Please enter a valid phone number.'); return false; }
  if (formData.items.length === 0) { alert('Your cart is empty.'); return false; }
  if (orderType === 'pickup') {
    if (!formData.pickupDate) { alert('Please select a pickup date.'); return false; }
    if (!formData.pickupTime) { alert('Please select a pickup time.'); return false; }
  } else {
    if (!formData.deliveryDate) { alert('Please select a delivery date.'); return false; }
    if (!formData.deliveryTime) { alert('Please select a delivery time.'); return false; }
    if (!formData.deliveryAddress) { alert('Please enter a delivery address.'); return false; }
  }
  return true;
}

function calculateDeliveryFee() {
  const addressInput = document.getElementById('deliveryAddress');
  if (!addressInput || !addressInput.value) return;
  const base = 10, perKm = 1;
  const dist = Math.floor(Math.random() * 20) + 1;
  const cost = dist * perKm;
  const total = base + cost;
  const el = id => document.getElementById(id);
  if (el('distanceKm')) el('distanceKm').textContent = dist.toFixed(1);
  if (el('distanceCost')) el('distanceCost').textContent = cost.toFixed(2).replace('.', ',') + ' €';
  if (el('totalDeliveryFee')) el('totalDeliveryFee').textContent = total.toFixed(2).replace('.', ',') + ' €';
  updateSummary();
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const loadingOverlay = document.getElementById('loadingOverlay');
  const el = id => document.getElementById(id);

  const formData = {
    customerName: el('customerName').value.trim(),
    customerEmail: el('customerEmail').value.trim(),
    customerPhone: el('customerPhone').value.trim(),
    orderType,
    items: cart.map(i => ({ name: i.name, size: i.size, price: i.price, quantity: i.quantity })),
    subtotal: getCartTotal()
  };

  if (orderType === 'pickup') {
    formData.pickupDate = el('pickupDate').value;
    formData.pickupTime = el('pickupTime').value;
  } else {
    formData.deliveryDate = el('deliveryDate').value;
    formData.deliveryTime = el('deliveryTime').value;
    formData.deliveryAddress = el('deliveryAddress').value.trim();
    const feeEl = el('totalDeliveryFee');
    formData.deliveryFee = feeEl ? parseFloat(feeEl.textContent.replace(',', '.')) : 10;
  }

  formData.specialRequests = el('specialRequests').value.trim();
  formData.total = formData.subtotal + (formData.deliveryFee || 0);

  if (!validateOrder(formData)) return;
  if (loadingOverlay) loadingOverlay.classList.add('active');

  try {
    const response = await fetch('/api/shop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    if (loadingOverlay) loadingOverlay.classList.remove('active');
    if (result.success) {
      if (el('confirmEmail')) el('confirmEmail').textContent = formData.customerEmail;
      if (el('successModal')) el('successModal').classList.add('open');
      if (el('checkoutModal')) el('checkoutModal').classList.remove('open');
      cart = []; saveCart(); updateCartUI();
    } else {
      alert('Error placing order: ' + (result.message || 'Please try again.'));
    }
  } catch (err) {
    if (loadingOverlay) loadingOverlay.classList.remove('active');
    alert('Error placing order. Please try again or contact us directly.');
  }
}

// ============================================
// INIT
// ============================================
function initializeShop() {
  loadCart();
  updateCartUI();
  renderProducts();
  applyTranslations();

  const el = id => document.getElementById(id);

  const langBtn = document.getElementById('shopLangToggle');
  if (langBtn) {
    langBtn.textContent = currentLang.toUpperCase();
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'lt' : 'en';
      localStorage.setItem('coco_lang', currentLang);
      langBtn.textContent = currentLang.toUpperCase();
      applyTranslations();
    });
  }

  const productGrid = el('productGrid');
  if (productGrid) {
    productGrid.addEventListener('click', e => {
      const card = e.target.closest('.menu-item');
      if (card) {
        openProductModal(card.dataset.id);
      }
    });
  }

  const modalAddBtn = el('modalAddBtn');
  if (modalAddBtn) {
    modalAddBtn.addEventListener('click', () => {
      const productId = modalAddBtn.dataset.productId;
      const variantSelect = el('modalVariantSelect');
      const vi = variantSelect ? parseInt(variantSelect.value) : 0;
      addToCart(productId, vi);
      closeProductModal();
    });
  }

  const modalCloseBtn = el('modalCloseBtn');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);
  const modalOverlay = el('productModalOverlay');
  if (modalOverlay) modalOverlay.addEventListener('click', closeProductModal);

  const typeBtns = document.querySelectorAll('.type-btn');
  const pickupSection = el('pickupSection');
  const deliverySection = el('deliverySection');

  if (pickupSection) pickupSection.classList.add('active');
  if (deliverySection) deliverySection.classList.remove('active');

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      orderType = btn.dataset.type;

      const fields = {
        deliveryAddress: el('deliveryAddress'),
        deliveryDate: el('deliveryDate'),
        deliveryTime: el('deliveryTime'),
        pickupDate: el('pickupDate'),
        pickupTime: el('pickupTime'),
      };

      if (orderType === 'pickup') {
        if (pickupSection) pickupSection.classList.add('active');
        if (deliverySection) deliverySection.classList.remove('active');
        if (fields.deliveryAddress) fields.deliveryAddress.required = false;
        if (fields.deliveryDate) fields.deliveryDate.required = false;
        if (fields.deliveryTime) fields.deliveryTime.required = false;
        if (fields.pickupDate) fields.pickupDate.required = true;
        if (fields.pickupTime) fields.pickupTime.required = true;
      } else {
        if (deliverySection) deliverySection.classList.add('active');
        if (pickupSection) pickupSection.classList.remove('active');
        if (fields.pickupDate) fields.pickupDate.required = false;
        if (fields.pickupTime) fields.pickupTime.required = false;
        if (fields.deliveryAddress) fields.deliveryAddress.required = true;
        if (fields.deliveryDate) fields.deliveryDate.required = true;
        if (fields.deliveryTime) fields.deliveryTime.required = true;
      }
      updateSummary();
    });
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.category);
    });
  });

  const cartToggle = el('cartToggle');
  const cartSidebar = el('cartSidebar');
  const cartOverlay = el('cartOverlay');
  const closeCartBtn = el('closeCart');

  function openCart() { cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); document.body.classList.add('cart-open'); }
  function closeCartFn() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.classList.remove('cart-open'); }

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartFn);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartFn);

  const checkoutBtn = el('checkoutBtn');
  const clearCartBtn = el('clearCartBtn');
  const checkoutModal = el('checkoutModal');
  const closeModal = el('closeModal');

  if (checkoutBtn) checkoutBtn.addEventListener('click', () => { updateSummary(); checkoutModal.classList.add('open'); closeCartFn(); });
  if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
  if (closeModal) closeModal.addEventListener('click', () => checkoutModal.classList.remove('open'));

  const cartItemsEl = el('cartItems');
  if (cartItemsEl) {
    cartItemsEl.addEventListener('click', e => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const index = Number(btn.dataset.index);
      const action = btn.dataset.action;
      if (action === 'increase') updateCartQuantity(index, cart[index].quantity + 1);
      else if (action === 'decrease') updateCartQuantity(index, cart[index].quantity - 1);
      else if (action === 'remove') removeFromCart(index);
    });
  }

  const checkoutForm = el('checkoutForm');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  const deliveryAddressInput = el('deliveryAddress');
  if (deliveryAddressInput) deliveryAddressInput.addEventListener('blur', calculateDeliveryFee);

  const closeSuccessBtn = el('closeSuccessBtn');
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', () => el('successModal').classList.remove('open'));

  const today = new Date().toISOString().split('T')[0];
  if (el('pickupDate')) el('pickupDate').min = today;
  if (el('deliveryDate')) el('deliveryDate').min = today;

  updateSummary();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeShop);
} else {
  initializeShop();
}
