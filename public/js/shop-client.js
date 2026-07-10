// ============================================
// PRODUCT DATA — EDIT YOUR MENU HERE
// ============================================
const dessertPlaceholderImage = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80';

const products = [
    // BARS & COOKIES
    { name: "Bananų duona (Banana bread)", price: 2.50, category: "bars", allergens: "Dairy, Eggs, Gluten", description: "Soft, cozy loaf with a rich banana flavour and a tender crumb.", badge: "Bestseller" },
    { name: "Choco Chips Cookies (per unit)", price: 1.20, category: "bars", allergens: "Dairy, Eggs, Gluten", description: "Chunky cookies with buttery dough and melted chocolate pockets.", badge: "Freshly baked" },
    { name: "Tinginys (Avietių / Apelsinų-šokoladas)", price: 3.50, category: "bars", allergens: "Dairy, Gluten", description: "A delicate, sliceable dessert with fruit and chocolate notes.", badge: "Seasonal" },
    { name: "Brownies", price: 3.20, category: "bars", allergens: "Dairy, Eggs, Gluten", description: "Fudgy brownies with a shiny crackled top and deep chocolate flavour.", badge: "Classic" },
    { name: "Lemonies (lemon brownies)", price: 3.20, category: "bars", allergens: "Dairy, Eggs, Gluten", description: "Bright lemony brownies with a soft, tangy finish.", badge: "New" },

    // CAKES
    { name: "Basque Sūrio (GF)", price: 5.00, category: "cakes", allergens: "Dairy, Eggs", description: "A creamy baked cheesecake with a caramelised top and gluten-free base.", badge: "GF" },
    { name: "Pistachio Sūrio (GF)", price: 5.00, category: "cakes", allergens: "Dairy", description: "Nutty, elegant, and rich with roasted pistachio flavour.", badge: "GF" },
    { name: "Biscoff Sūrio", price: 4.50, category: "cakes", allergens: "Dairy, Gluten", description: "Silky cheesecake layered with caramelised biscuit notes.", badge: "Fan favourite" },
    { name: "Morkų (Carrot cake)", price: 4.00, category: "cakes", allergens: "Dairy, Eggs, Gluten", description: "Moist carrot cake with warming spices and cream cheese frosting.", badge: "Classic" },
    { name: "Aguonų/citrinų tortas (Poppy seed/lemon)", price: 4.50, category: "cakes", allergens: "Dairy, Eggs, Gluten", description: "A fragrant cake with citrus brightness and a tender crumb.", badge: "Seasonal" },
    { name: "Mousse Cake (Mango/turmeric, Braškių/chilli)", price: 4.00, category: "cakes", allergens: "Dairy, Eggs, Gluten", description: "Light mousse layers with bold colour and layered flavour.", badge: "Limited" },
    { name: "Chocolate Fudge", price: 5.00, category: "cakes", allergens: "Dairy, Eggs, Gluten", description: "A rich chocolate cake with smooth fudge filling and ganache finish.", badge: "House special" },

    // VEGAN
    { name: "Veganiškai Tiramisu", price: 5.00, category: "vegan", allergens: "Cashews", description: "Creamy vegan tiramisu with espresso depth and a soft finish.", badge: "Vegan" },
    { name: "Creamy Veganiškai Sūrio (Mėlynių/kardamono)", price: 4.50, category: "vegan", allergens: "Almonds, Cashews · Sugar-free", description: "Silky vegan cheesecake with berry and cardamom notes.", badge: "Sugar-free" },
    { name: "Veganiškai Sūrio (Aviečių, Mango-Pasifloru)", price: 4.50, category: "vegan", allergens: "Almonds, Cashews · Sugar-free", description: "A bright, fruity dessert with tropical depth and a creamy texture.", badge: "Vegan" },
];

// ============================================
// RENDER PRODUCTS INTO THE GRID
// ============================================
function renderProducts(filter = 'all') {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    const filteredProducts = products.filter(p => filter === 'all' || p.category === filter);

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<div class="empty-products">No desserts match this category yet.</div>';
        return;
    }

    filteredProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        card.dataset.name = p.name;
        card.dataset.price = p.price;
        card.innerHTML = `
            <div class="product-image">
                <img src="${p.image || dessertPlaceholderImage}" alt="${p.name}">
            </div>
            <div class="item-content">
                <div class="item-info">
                    <div class="product-meta">
                        <span class="product-badge">${p.badge}</span>
                    </div>
                    <span class="item-name">${p.name}</span>
                    <p class="product-description">${p.description}</p>
                    <span class="item-allergens">Contains: ${p.allergens}</span>
                </div>
                <div class="item-actions">
                    <span class="item-price">${p.price.toFixed(2).replace('.', ',')} €</span>
                    <button class="add-btn">Add</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// ============================================
// SHOP STATE
// ============================================
let cart = [];
let orderType = 'pickup';

// ============================================
// LOAD CART FROM LOCALSTORAGE
// ============================================
function loadCart() {
    const saved = localStorage.getItem('cafe_cart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

// ============================================
// SAVE CART TO LOCALSTORAGE
// ============================================
function saveCart() {
    localStorage.setItem('cafe_cart', JSON.stringify(cart));
}

// ============================================
// ADD TO CART
// ============================================
function addToCart(productName, productPrice, productSize = 'default') {
    const existingItem = cart.find(item => item.name === productName && item.size === productSize);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            size: productSize,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showCartNotification(productName);
}

// ============================================
// REMOVE FROM CART
// ============================================
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// ============================================
// UPDATE CART QUANTITY
// ============================================
function updateCartQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

// ============================================
// GET CART TOTAL
// ============================================
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

// ============================================
// UPDATE CART UI
// ============================================
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
        if (cartTotal) cartTotal.textContent = '0,00 €';
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (clearCartBtn) clearCartBtn.style.display = 'none';
        return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';
    if (checkoutBtn) checkoutBtn.disabled = false;
    if (clearCartBtn) clearCartBtn.style.display = 'block';

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-meta">${item.size || 'Standard'} • ${item.price.toFixed(2).replace('.', ',')} € each</div>
                <div class="cart-item-price">${(item.price * item.quantity).toFixed(2).replace('.', ',')} €</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn minus" data-action="decrease" data-index="${index}" aria-label="Decrease quantity">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn plus" data-action="increase" data-index="${index}" aria-label="Increase quantity">+</button>
                <button class="remove-item" data-action="remove" data-index="${index}" aria-label="Remove item">✕</button>
            </div>
        </div>
    `).join('');

    const total = getCartTotal();
    cartTotal.textContent = total.toFixed(2).replace('.', ',') + ' €';
}

// ============================================
// SHOW CART NOTIFICATION
// ============================================
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `✓ ${productName} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ============================================
// UPDATE CHECKOUT SUMMARY
// ============================================
function updateSummary() {
    const subtotal = getCartTotal();
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryDeliveryRow = document.getElementById('summaryDeliveryRow');
    const summaryDelivery = document.getElementById('summaryDelivery');

    if (summarySubtotal) summarySubtotal.textContent = subtotal.toFixed(2).replace('.', ',') + ' €';

    let deliveryFee = 0;
    if (orderType === 'delivery') {
        const totalFeeEl = document.getElementById('totalDeliveryFee');
        if (totalFeeEl) {
            deliveryFee = parseFloat(totalFeeEl.textContent.replace(',', '.')) || 0;
        }
        if (summaryDeliveryRow) summaryDeliveryRow.style.display = 'flex';
        if (summaryDelivery) summaryDelivery.textContent = deliveryFee.toFixed(2).replace('.', ',') + ' €';
    } else {
        if (summaryDeliveryRow) summaryDeliveryRow.style.display = 'none';
        if (summaryDelivery) summaryDelivery.textContent = '0,00 €';
    }

    if (summaryTotal) summaryTotal.textContent = (subtotal + deliveryFee).toFixed(2).replace('.', ',') + ' €';

    // Populate summary items
    const summaryItems = document.getElementById('summaryItems');
    if (summaryItems) {
        summaryItems.innerHTML = cart.map(item => `
            <div class="summary-item">
                <span>${item.name} ×${item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
            </div>
        `).join('');
    }
}

// ============================================
// VALIDATE ORDER
// ============================================
function validateOrder(formData) {
    if (!formData.customerName) {
        alert('Please enter your name.');
        return false;
    }
    if (!formData.customerEmail || !formData.customerEmail.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (!formData.customerPhone || formData.customerPhone.length < 10) {
        alert('Please enter a valid phone number.');
        return false;
    }
    if (formData.items.length === 0) {
        alert('Your cart is empty.');
        return false;
    }
    if (orderType === 'pickup') {
        if (!formData.pickupDate) {
            alert('Please select a pickup date.');
            return false;
        }
        if (!formData.pickupTime) {
            alert('Please select a pickup time.');
            return false;
        }
    } else {
        if (!formData.deliveryDate) {
            alert('Please select a delivery date.');
            return false;
        }
        if (!formData.deliveryTime) {
            alert('Please select a delivery time.');
            return false;
        }
        if (!formData.deliveryAddress) {
            alert('Please enter a delivery address.');
            return false;
        }
    }
    return true;
}

// ============================================
// CALCULATE DELIVERY FEE
// ============================================
function calculateDeliveryFee() {
    const addressInput = document.getElementById('deliveryAddress');
    const distanceElement = document.getElementById('distanceKm');
    const distanceCostElement = document.getElementById('distanceCost');
    const totalFeeElement = document.getElementById('totalDeliveryFee');

    if (!addressInput || !addressInput.value) return;

    const baseFee = 10;
    const pricePerKm = 1;

    // TODO: Integrate Google Maps API for real distance
    // For now, simulate with random distance
    const simulatedDistance = Math.floor(Math.random() * 20) + 1;
    const distanceCost = simulatedDistance * pricePerKm;
    const totalFee = baseFee + distanceCost;

    if (distanceElement) distanceElement.textContent = simulatedDistance.toFixed(1);
    if (distanceCostElement) distanceCostElement.textContent = distanceCost.toFixed(2).replace('.', ',') + ' €';
    if (totalFeeElement) totalFeeElement.textContent = totalFee.toFixed(2).replace('.', ',') + ' €';

    updateSummary();
}

// ============================================
// HANDLE CHECKOUT SUBMIT
// ============================================
async function handleCheckoutSubmit(e) {
    e.preventDefault();

    const loadingOverlay = document.getElementById('loadingOverlay');

    const formData = {
        customerName: document.getElementById('customerName').value.trim(),
        customerEmail: document.getElementById('customerEmail').value.trim(),
        customerPhone: document.getElementById('customerPhone').value.trim(),
        orderType: orderType,
        items: cart.map(item => ({
            name: item.name,
            size: item.size,
            price: item.price,
            quantity: item.quantity
        })),
        subtotal: getCartTotal()
    };

    if (orderType === 'pickup') {
        formData.pickupDate = document.getElementById('pickupDate').value;
        formData.pickupTime = document.getElementById('pickupTime').value;
    } else {
        formData.deliveryDate = document.getElementById('deliveryDate').value;
        formData.deliveryTime = document.getElementById('deliveryTime').value;
        formData.deliveryAddress = document.getElementById('deliveryAddress').value.trim();
        const totalFeeEl = document.getElementById('totalDeliveryFee');
        formData.deliveryFee = totalFeeEl ? parseFloat(totalFeeEl.textContent.replace(',', '.')) : 10;
    }

    formData.specialRequests = document.getElementById('specialRequests').value.trim();
    formData.total = formData.subtotal + (formData.deliveryFee || 0);

    if (!validateOrder(formData)) {
        return;
    }

    if (loadingOverlay) loadingOverlay.classList.add('active');

    try {
        const response = await fetch('/api/shop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (loadingOverlay) loadingOverlay.classList.remove('active');

        if (result.success) {
            const confirmEmail = document.getElementById('confirmEmail');
            if (confirmEmail) confirmEmail.textContent = formData.customerEmail;
            const successModal = document.getElementById('successModal');
            const checkoutModal = document.getElementById('checkoutModal');
            if (successModal) successModal.classList.add('open');
            if (checkoutModal) checkoutModal.classList.remove('open');
            cart = [];
            saveCart();
            updateCartUI();
        } else {
            alert('Error placing order: ' + (result.message || 'Please try again.'));
        }
    } catch (error) {
        if (loadingOverlay) loadingOverlay.classList.remove('active');
        alert('Error placing order. Please try again or contact us directly.');
        console.error('Order error:', error);
    }
}

// ============================================
// INIT ON PAGE LOAD
// ============================================
function initializeShop() {
    loadCart();
    updateCartUI();
    renderProducts();

    // ---- Pickup / Delivery Toggle (UNIFIED) ----
    const typeBtns = document.querySelectorAll('.type-btn');
    const pickupSection = document.getElementById('pickupSection');
    const deliverySection = document.getElementById('deliverySection');
    const deliveryAddressInput = document.getElementById('deliveryAddress');
    const deliveryDateInput = document.getElementById('deliveryDate');
    const deliveryTimeSelect = document.getElementById('deliveryTime');
    const pickupDateInput = document.getElementById('pickupDate');
    const pickupTimeSelect = document.getElementById('pickupTime');
    const deliveryFeeDisplay = document.getElementById('deliveryFeeDisplay');

    // Set initial state (pickup)
    if (pickupSection) pickupSection.classList.add('active');
    if (deliverySection) deliverySection.classList.remove('active');
    if (deliveryAddressInput) deliveryAddressInput.required = false;
    if (deliveryDateInput) deliveryDateInput.required = false;
    if (deliveryTimeSelect) deliveryTimeSelect.required = false;
    if (pickupDateInput) pickupDateInput.required = true;
    if (pickupTimeSelect) pickupTimeSelect.required = true;

    typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            typeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            orderType = btn.dataset.type;

            if (orderType === 'pickup') {
                if (pickupSection) pickupSection.classList.add('active');
                if (deliverySection) deliverySection.classList.remove('active');
                if (deliveryAddressInput) deliveryAddressInput.required = false;
                if (deliveryDateInput) deliveryDateInput.required = false;
                if (deliveryTimeSelect) deliveryTimeSelect.required = false;
                if (pickupDateInput) pickupDateInput.required = true;
                if (pickupTimeSelect) pickupTimeSelect.required = true;
                if (deliveryFeeDisplay) deliveryFeeDisplay.style.display = 'none';
            } else {
                if (deliverySection) deliverySection.classList.add('active');
                if (pickupSection) pickupSection.classList.remove('active');
                if (pickupDateInput) pickupDateInput.required = false;
                if (pickupTimeSelect) pickupTimeSelect.required = false;
                if (deliveryAddressInput) deliveryAddressInput.required = true;
                if (deliveryDateInput) deliveryDateInput.required = true;
                if (deliveryTimeSelect) deliveryTimeSelect.required = true;
                if (deliveryFeeDisplay) deliveryFeeDisplay.style.display = 'block';
            }

            updateSummary();
        });
    });

    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProducts(button.dataset.category);
        });
    });

    // Add to cart buttons
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-btn')) {
                const card = e.target.closest('.menu-item');
                const name = card.dataset.name;
                const price = parseFloat(card.dataset.price);
                addToCart(name, price);
            }
        });
    }

    // Cart toggle
    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');

    function closeCartMenu() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.classList.remove('cart-open');
    }

    function openCartMenu() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.classList.add('cart-open');
    }

    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            openCartMenu();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartMenu);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartMenu);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            closeCartMenu();
        }
    });

    // Checkout modal
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeModal = document.getElementById('closeModal');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            updateSummary();
            checkoutModal.classList.add('open');
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('open');
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            checkoutModal.classList.remove('open');
        });
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }

    // Cart quantity controls
    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        cartItems.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-action]');
            if (!button) return;

            const index = Number(button.dataset.index);
            const action = button.dataset.action;

            if (action === 'increase') {
                updateCartQuantity(index, cart[index].quantity + 1);
            } else if (action === 'decrease') {
                updateCartQuantity(index, cart[index].quantity - 1);
            } else if (action === 'remove') {
                removeFromCart(index);
            }
        });
    }

    // Delivery fee calculation
    const deliveryAddress = document.getElementById('deliveryAddress');
    if (deliveryAddress) {
        deliveryAddress.addEventListener('blur', calculateDeliveryFee);
    }

    // Success modal close
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            document.getElementById('successModal').classList.remove('open');
        });
    }

    const today = new Date();
    const minDate = today.toISOString().split('T')[0];

    if (pickupDateInput) pickupDateInput.min = minDate;
    if (deliveryDateInput) deliveryDateInput.min = minDate;

    // Initial summary update
    updateSummary();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeShop);
} else {
    initializeShop();
}
