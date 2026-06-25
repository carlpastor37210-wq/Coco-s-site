// ============================================
// PRODUCT DATA - From Café Menu
// ============================================
const PRODUCTS = [
    // --- CAKES ---
    {
        id: 'bananu-duona',
        name: 'Bananu Duona',
        nameLt: 'Bananų duona',
        description: 'Moist banana bread with a soft, fluffy texture',
        category: 'cakes',
        sizes: null,
        price: 2.50,
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1621956784855-1b3d40b6e6e4?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    {
        id: 'tinginys-avocado',
        name: 'Tinginys Avocado',
        nameLt: 'Tinginys su Aviečiais',
        description: 'Layered chocolate biscuit cake with avocado cream',
        category: 'cakes',
        sizes: ['Small (11 slices)', 'Large (35 slices)'],
        price: { 'Small (11 slices)': 3.50, 'Large (35 slices)': 35.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        allergens: ['dairy', 'gluten'],
        inStock: true
    },
    {
        id: 'tinginys-orange',
        name: 'Tinginys Orange/Chocolate',
        nameLt: 'Tinginys Apelsinu/Šokoladas',
        description: 'Layered chocolate biscuit cake with orange cream',
        category: 'cakes',
        sizes: ['Small (12 slices)', 'Large (26.5 slices)'],
        price: { 'Small (12 slices)': 3.50, 'Large (26.5 slices)': 35.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
        allergens: ['dairy', 'gluten'],
        inStock: true
    },
    {
        id: 'basque-surio',
        name: 'Basque Cheesecake',
        nameLt: 'Basque Surio (GF)',
        description: 'Creamy Basque-style baked cheesecake, gluten-free',
        category: 'cakes',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 5.00, 'Large (40 slices)': 40.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs'],
        inStock: true
    },
    {
        id: 'pistachio-surio',
        name: 'Pistachio Cheesecake',
        nameLt: 'Pistachio Surio (GF)',
        description: 'Creamy cheesecake topped with pistachios, gluten-free',
        category: 'cakes',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 5.00, 'Large (40 slices)': 40.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1618424464187-c4b3e86e2d34?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs'],
        inStock: true
    },
    {
        id: 'biscoff-surio',
        name: 'Biscoff Cheesecake',
        nameLt: 'Biscoff Surio',
        description: 'Creamy cheesecake with Biscoff lotus spread',
        category: 'cakes',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 4.50, 'Large (40 slices)': 40.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    {
        id: 'morku',
        name: 'Morku Cake',
        nameLt: 'Morkų tortas',
        description: 'Carrot cake with walnuts and cream cheese frosting',
        category: 'cakes',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 4.00, 'Large (40 slices)': 32.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    {
        id: 'aguonu-citrinu',
        name: 'Poppy Seed & Lemon Cake',
        nameLt: 'Aguonų/Citrinų tortas',
        description: 'Classic Lithuanian poppy seed cake with lemon',
        category: 'cakes',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 4.50, 'Large (40 slices)': 36.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1519340243483-4e0f9a71bc2a?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    {
        id: 'mousse-mango',
        name: 'Mango Turmeric Mousse',
        nameLt: 'Mousse Cake (Mango/Turmeric)',
        description: 'Light mango mousse cake with turmeric twist',
        category: 'cakes',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 4.00, 'Large (40 slices)': 32.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    {
        id: 'mousse-raspberry',
        name: 'Raspberry Chilli Mousse',
        nameLt: 'Mousse Cake (Raspberry/Chilli)',
        description: 'Light raspberry mousse with a hint of chilli',
        category: 'cakes',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 4.00, 'Large (40 slices)': 32.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1559618880-1e7c3b02f3b9?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    {
        id: 'chocolate-fudge',
        name: 'Chocolate Fudge Cake',
        nameLt: 'Chocolate Fudge',
        description: 'Rich, decadent chocolate fudge cake',
        category: 'cakes',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 5.00, 'Large (40 slices)': 40.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    
    // --- SINGLE SERVE BARS & COOKIES ---
    {
        id: 'brownies',
        name: 'Brownies',
        nameLt: 'Brownies',
        description: 'Fudgy chocolate brownies',
        category: 'bars',
        sizes: null,
        price: 3.20,
        unit: 'unit',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    {
        id: 'lemonies',
        name: 'Lemonies',
        nameLt: 'Lemonies',
        description: 'Lemon flavored brownie-like bars',
        category: 'bars',
        sizes: null,
        price: 3.20,
        unit: 'unit',
        image: 'https://images.unsplash.com/photo-1558961363-fa8f7fd04b33?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    {
        id: 'choco-cookies',
        name: 'Choco Chips Cookies',
        nameLt: 'Choco chips cookies',
        description: 'Crispy cookies loaded with chocolate chips',
        category: 'bars',
        sizes: null,
        price: 1.20,
        unit: 'unit',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
        allergens: ['dairy', 'eggs', 'gluten'],
        inStock: true
    },
    
    // --- VEGAN OPTIONS ---
    {
        id: 'vegan-tiramisu',
        name: 'Vegan Tiramisu',
        nameLt: 'Veganiškas Tiramisu',
        description: 'Plant-based tiramisu with espresso soaked layers',
        category: 'vegan',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 5.00, 'Large (40 slices)': 40.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
        allergens: ['almonds', 'cashews'],
        inStock: true
    },
    {
        id: 'vegan-surio-blueberry',
        name: 'Creamy Vegan Blueberry Cheesecake',
        nameLt: 'Creamy Vegan Šurio (Mėlynių/Kardamono)',
        description: 'Creamy vegan cheesecake with blueberry cardamom',
        category: 'vegan',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 4.50, 'Large (40 slices)': 36.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
        allergens: ['almonds', 'cashews'],
        inStock: true
    },
    {
        id: 'vegan-surio-raspberry',
        name: 'Vegan Raspberry Cheesecake',
        nameLt: 'Veganiškas Šuris (Aviečių)',
        description: 'Plant-based cheesecake with raspberry',
        category: 'vegan',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 4.50, 'Large (40 slices)': 36.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1618424464187-c4b3e86e2d34?w=400&h=300&fit=crop',
        allergens: ['almonds', 'cashews'],
        inStock: true
    },
    {
        id: 'vegan-surio-mango',
        name: 'Vegan Mango Passion Cheesecake',
        nameLt: 'Veganiškas Šuris (Mango/Pasifloros)',
        description: 'Tropical vegan cheesecake with mango and passionfruit',
        category: 'vegan',
        sizes: ['Small (8 slices)', 'Large (40 slices)'],
        price: { 'Small (8 slices)': 4.50, 'Large (40 slices)': 36.00 },
        unit: 'slice',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        allergens: ['almonds', 'cashews'],
        inStock: true
    }
];

// ============================================
// ALLERGEN DISPLAY MAPPING
// ============================================
const ALLERGEN_INFO = {
    'dairy': 'Contains Dairy',
    'eggs': 'Contains Eggs',
    'gluten': 'Contains Gluten',
    'almonds': 'Contains Almonds',
    'cashews': 'Contains Cashews'
};

// ============================================
// CART STATE
// ============================================
let cart = JSON.parse(localStorage.getItem('cocoCart')) || [];
let orderType = 'pickup';

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initProductGrid();
    initCart();
    initFilters();
    initCheckoutModal();
    setMinDate();
});

// ============================================
// PRODUCT GRID
// ============================================
function initProductGrid() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = PRODUCTS.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const hasSizes = product.sizes !== null;
    const allergens = product.allergens.map(a => ALLERGEN_INFO[a]).join(', ');
    
    if (hasSizes) {
        return `
            <article class="product-card has-sizes" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'">
                    ${!product.inStock ? '<span class="out-of-stock">Out of Stock</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-allergens">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${allergens}</span>
                    </div>
                    <div class="product-actions">
                        <div class="size-selector">
                            <label>Select Size:</label>
                            <select class="size-select" data-product-id="${product.id}">
                                ${product.sizes.map((size, i) => `<option value="${size}" ${i === 0 ? 'selected' : ''}>${size}</option>`).join('')}
                            </select>
                        </div>
                        <div class="price-qty">
                            <span class="product-price" data-product-id="${product.id}">€${getPrice(product, product.sizes[0]).toFixed(2)}</span>
                            <div class="quantity-control">
                                <button class="qty-btn minus" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>-</button>
                                <input type="number" class="qty-input" value="1" min="1" max="99" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                                <button class="qty-btn plus" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>+</button>
                            </div>
                        </div>
                        <button class="add-to-cart-btn" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i> Add to Order
                        </button>
                    </div>
                </div>
            </article>
        `;
    } else {
        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'">
                    ${!product.inStock ? '<span class="out-of-stock">Out of Stock</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-allergens">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${allergens}</span>
                    </div>
                    <div class="product-actions">
                        <div class="price-qty">
                            <span class="product-price">€${product.price.toFixed(2)} / ${product.unit}</span>
                            <div class="quantity-control">
                                <button class="qty-btn minus" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>-</button>
                                <input type="number" class="qty-input" value="1" min="1" max="99" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                                <button class="qty-btn plus" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>+</button>
                            </div>
                        </div>
                        <button class="add-to-cart-btn" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i> Add to Order
                        </button>
                    </div>
                </div>
            </article>
        `;
    }
}

function getPrice(product, size) {
    if (product.sizes === null) {
        return product.price;
    }
    return product.price[size] || Object.values(product.price)[0];
}

// ============================================
// CART FUNCTIONALITY
// ============================================
function initCart() {
    updateCartUI();
    
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) {
            const btn = e.target.closest('.add-to-cart-btn');
            const productId = btn.dataset.productId;
            const sizeSelect = document.querySelector(`.size-select[data-product-id="${productId}"]`);
            const size = sizeSelect ? sizeSelect.value : null;
            const qtyInput = document.querySelector(`.qty-input[data-product-id="${productId}"]`);
            const qty = parseInt(qtyInput.value) || 1;
            
            addToCart(productId, size, qty);
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-plus"></i> Add to Order';
            }, 1500);
        }
        
        // Quantity controls
        if (e.target.closest('.qty-btn')) {
            const btn = e.target.closest('.qty-btn');
            const productId = btn.dataset.productId;
            const input = document.querySelector(`.qty-input[data-product-id="${productId}"]`);
            let val = parseInt(input.value) || 1;
            
            if (btn.classList.contains('plus')) {
                val = Math.min(val + 1, 99);
            } else {
                val = Math.max(val - 1, 1);
            }
            input.value = val;
        }
        
        // Size change - update price display
        if (e.target.closest('.size-select')) {
            const select = e.target.closest('.size-select');
            const productId = select.dataset.productId;
            const product = PRODUCTS.find(p => p.id === productId);
            const price = getPrice(product, select.value);
            const priceEl = document.querySelector(`.product-price[data-product-id="${productId}"]`);
            if (priceEl) {
                priceEl.textContent = `€${price.toFixed(2)}`;
            }
        }
    });
    
    // Cart toggle
    document.getElementById('cartToggle').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.add('open');
        document.getElementById('cartOverlay').classList.add('active');
    });
    
    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('cartOverlay').classList.remove('active');
    });
    
    document.getElementById('cartOverlay').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('cartOverlay').classList.remove('active');
    });
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('cartOverlay').classList.remove('active');
        openCheckoutModal();
    });
}

function addToCart(productId, size, quantity) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const cartItemId = size ? `${productId}-${size}` : productId;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            cartItemId,
            productId,
            name: product.name,
            size,
            price: getPrice(product, size),
            quantity
        });
    }
    
    saveCart();
    updateCartUI();
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCart();
    updateCartUI();
}

function updateQuantity(cartItemId, newQty) {
    const item = cart.find(item => item.cartItemId === cartItemId);
    if (item) {
        if (newQty <= 0) {
            removeFromCart(cartItemId);
        } else {
            item.quantity = newQty;
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('cocoCart', JSON.stringify(cart));
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartUI() {
    const count = getCartCount();
    const total = getCartTotal();
    
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartSubtotal').textContent = `€${total.toFixed(2)}`;
    document.getElementById('checkoutBtn').disabled = cart.length === 0;
    
    const cartItemsEl = document.getElementById('cartItems');
    const emptyEl = document.getElementById('cartEmpty');
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '';
        emptyEl.style.display = 'block';
    } else {
        emptyEl.style.display = 'none';
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    ${item.size ? `<span class="cart-item-size">${item.size}</span>` : ''}
                    <span class="cart-item-price">€${item.price.toFixed(2)} / unit</span>
                </div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="updateQuantity('${item.cartItemId}', ${item.quantity - 1})">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="updateQuantity('${item.cartItemId}', ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-total">€${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item-btn" onclick="removeFromCart('${item.cartItemId}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
}

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// ============================================
// FILTERS
// ============================================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.category);
        });
    });
}

function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const product = PRODUCTS.find(p => p.id === card.dataset.productId);
        if (category === 'all' || product.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// ============================================
// CHECKOUT MODAL
// ============================================
function initCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    const closeBtn = document.getElementById('closeModal');
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });
    
    // Order type toggle
    const typeBtns = document.querySelectorAll('.type-btn');
    typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            typeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            orderType = btn.dataset.type;
            updateOrderTypeUI();
        });
    });
    
    // Form submission
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
    
    // Close success modal
    closeSuccessBtn.addEventListener('click', () => {
        successModal.classList.remove('open');
        cart = [];
        saveCart();
        updateCartUI();
    });
    
    // Address input for distance calculation
    const deliveryAddress = document.getElementById('deliveryAddress');
    deliveryAddress.addEventListener('blur', () => {
        if (orderType === 'delivery' && deliveryAddress.value.trim()) {
            calculateDeliveryFee(deliveryAddress.value.trim());
        }
    });
}

function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('open');
    populateOrderSummary();
    setMinDate();
}

function updateOrderTypeUI() {
    const pickupSection = document.getElementById('pickupSection');
    const deliverySection = document.getElementById('deliverySection');
    const summaryDeliveryRow = document.getElementById('summaryDeliveryRow');
    
    if (orderType === 'pickup') {
        pickupSection.classList.add('active');
        deliverySection.classList.remove('active');
        summaryDeliveryRow.style.display = 'none';
    } else {
        pickupSection.classList.remove('active');
        deliverySection.classList.add('active');
        summaryDeliveryRow.style.display = 'flex';
        
        // Recalculate delivery fee
        const address = document.getElementById('deliveryAddress').value.trim();
        if (address) {
            calculateDeliveryFee(address);
        } else {
            updateDeliveryUI(0);
        }
    }
}

function setMinDate() {
    const today = new Date();
    today.setDate(today.getDate() + 3); // Minimum 3 days advance
    const minDate = today.toISOString().split('T')[0];
    
    document.getElementById('pickupDate').min = minDate;
    document.getElementById('pickupDate').value = minDate;
    document.getElementById('deliveryDate').min = minDate;
    document.getElementById('deliveryDate').value = minDate;
}

function calculateDeliveryFee(address) {
    // Using OpenRouteService for accurate distance calculation
    // Origin: Taikos pr. 13, Kaunas (55.7277, 24.3458)
    const originCoords = { lat: 55.7277, lng: 24.3458 };
    
    // For demo purposes, estimate based on address (in production, use geocoding API)
    // Most Kaunas addresses will be roughly 1-20 km from Taikos pr. 13
    const estimatedDistance = estimateDistance(address);
    updateDeliveryUI(estimatedDistance);
}

function estimateDistance(address) {
    // Simple heuristic: for Kaunas addresses, estimate distance
    // In production, this should use a geocoding API
    address = address.toLowerCase();
    
    // Known distances from Taikos pr. 13
    const knownLocations = {
        'taikos': 0,
        'santakos': 3,
        'laisves': 4,
        'vilnius': 5,
        'kaunas': 2
    };
    
    // Check if any known location is in address
    for (const [loc, dist] of Object.entries(knownLocations)) {
        if (address.includes(loc)) {
            return dist;
        }
    }
    
    // Default estimate for Kaunas area
    return 5; // Default 5km estimate
}

function updateDeliveryUI(distanceKm) {
    const baseFee = 10;
    const perKmFee = 1;
    const distanceCost = distanceKm * perKmFee;
    const totalFee = baseFee + distanceCost;
    
    document.getElementById('distanceKm').textContent = distanceKm.toFixed(1);
    document.getElementById('distanceCost').textContent = `€${distanceCost.toFixed(2)}`;
    document.getElementById('totalDeliveryFee').textContent = `€${totalFee.toFixed(2)}`;
    document.getElementById('summaryDelivery').textContent = `€${totalFee.toFixed(2)}`;
    
    updateSummaryTotal();
}

function populateOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span class="summary-item-name">${item.name}${item.size ? ` (${item.size})` : ''}</span>
            <span class="summary-item-qty">x${item.quantity}</span>
            <span class="summary-item-price">€${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    updateSummaryTotal();
}

function updateSummaryTotal() {
    const subtotal = getCartTotal();
    let deliveryFee = 0;
    
    if (orderType === 'delivery') {
        const distanceKm = parseFloat(document.getElementById('distanceKm').textContent) || 0;
        deliveryFee = 10 + (distanceKm * 1);
    }
    
    const total = subtotal + deliveryFee;
    
    document.getElementById('summarySubtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `€${total.toFixed(2)}`;
}

async function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Get form data
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
        formData.pickupAddress = 'Taikos pr. 13, Kaunas';
    } else {
        formData.deliveryDate = document.getElementById('deliveryDate').value;
        formData.deliveryTime = document.getElementById('deliveryTime').value;
        formData.deliveryAddress = document.getElementById('deliveryAddress').value.trim();
        const distanceKm = parseFloat(document.getElementById('distanceKm').textContent) || 0;
        formData.deliveryFee = 10 + (distanceKm * 1);
        formData.deliveryDistance = distanceKm;
    }
    
    formData.specialRequests = document.getElementById('specialRequests').value.trim();
    formData.total = formData.subtotal + (formData.deliveryFee || 0);
    
    // Validate
    if (!validateOrder(formData)) {
        return;
    }
    
    // Show loading
    loadingOverlay.classList.add('active');
    
    try {
        // Send to API
        const response = await fetch('/api/shop/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        loadingOverlay.classList.remove('active');
        
        if (result.success) {
            // Show success modal
            document.getElementById('confirmEmail').textContent = formData.customerEmail;
            document.getElementById('successModal').classList.add('open');
            document.getElementById('checkoutModal').classList.remove('open');
        } else {
            alert('Error placing order: ' + (result.message || 'Please try again.'));
        }
    } catch (error) {
        loadingOverlay.classList.remove('active');
        alert('Error placing order. Please try again or contact us directly.');
        console.error('Order error:', error);
    }
}

function validateOrder(data) {
    // Check cart
    if (!data.items || data.items.length === 0) {
        alert('Your cart is empty!');
        return false;
    }
    
    // Check customer info
    if (!data.customerName || !data.customerEmail || !data.customerPhone) {
        alert('Please fill in all customer information.');
        return false;
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.customerEmail)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Check pickup/delivery details
    if (data.orderType === 'pickup') {
        if (!data.pickupDate || !data.pickupTime) {
            alert('Please select pickup date and time.');
            return false;
        }
    } else {
        if (!data.deliveryAddress) {
            alert('Please enter delivery address.');
            return false;
        }
        if (!data.deliveryDate || !data.deliveryTime) {
            alert('Please select delivery date and preferred time.');
            return false;
        }
    }
    
    // Validate date is at least 3 days ahead
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const selectedDate = new Date(data.orderType === 'pickup' ? data.pickupDate : data.deliveryDate);
    
    if (selectedDate < today) {
        alert('Orders require at least 3 days advance notice. Please select a later date.');
        return false;
    }
    
    return true;
}
