// ============================================
// SHOP STATE
// ============================================
let cart = [];
let orderType = 'pickup'; // Default to pickup

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

// ============================================
// UPDATE CART UI
// ============================================
function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const emptyMessage = document.getElementById('emptyCartMessage');
    
    if (!cartContainer) return;
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '';
        if (emptyMessage) emptyMessage.style.display = 'block';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    if (emptyMessage) emptyMessage.style.display = 'none';
    
    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-size">${item.size}</p>
                <p class="item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="item-controls">
                <button class="qty-btn minus" onclick="updateCartQuantity(${index}, ${item.quantity - 1})">−</button>
                <input type="number" class="qty-input" value="${item.quantity}" onchange="updateCartQuantity(${index}, parseInt(this.value))">
                <button class="qty-btn plus" onclick="updateCartQuantity(${index}, ${item.quantity + 1})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button>
            </div>
        </div>
    `).join('');
    
    cartTotal.textContent = '$' + getCartTotal().toFixed(2);
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
// TOGGLE ORDER TYPE (PICKUP / DELIVERY)
// ============================================
function toggleOrderType(type) {
    orderType = type;
    
    const pickupSection = document.getElementById('pickupSection');
    const deliverySection = document.getElementById('deliverySection');
    const pickupBtn = document.getElementById('pickupBtn');
    const deliveryBtn = document.getElementById('deliveryBtn');
    
    if (type === 'pickup') {
        pickupSection.style.display = 'block';
        deliverySection.style.display = 'none';
        pickupBtn.classList.add('active');
        deliveryBtn.classList.remove('active');
    } else {
        pickupSection.style.display = 'none';
        deliverySection.style.display = 'block';
        pickupBtn.classList.remove('active');
        deliveryBtn.classList.add('active');
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
    const feeElement = document.getElementById('deliveryFee');
    
    if (!addressInput || !addressInput.value) return;
    
    // Base fee: $10 + $1 per km
    const baseFee = 10;
    const pricePerKm = 1;
    
    // TODO: Integrate Google Maps API to calculate real distance
    // For now, simulate with random distance
    const simulatedDistance = Math.floor(Math.random() * 20) + 1;
    const fee = baseFee + (simulatedDistance * pricePerKm);
    
    if (distanceElement) distanceElement.textContent = simulatedDistance.toFixed(1);
    if (feeElement) feeElement.textContent = '$' + fee.toFixed(2);
}

// ============================================
// HANDLE CHECKOUT SUBMIT
// ============================================
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
    } else {
        formData.deliveryDate = document.getElementById('deliveryDate').value;
        formData.deliveryTime = document.getElementById('deliveryTime').value;
        formData.deliveryAddress = document.getElementById('deliveryAddress').value.trim();
        const distanceKm = parseFloat(document.getElementById('distanceKm').textContent) || 0;
        formData.deliveryFee = 10 + (distanceKm * 1);
        formData.distanceKm = distanceKm;
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
        // FETCH CALL TO API
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
            document.getElementById('confirmEmail').textContent = formData.customerEmail;
            document.getElementById('successModal').classList.add('open');
            document.getElementById('checkoutModal').classList.remove('open');
            cart = [];
            saveCart();
            updateCartUI();
        } else {
            alert('Error placing order: ' + (result.message || 'Please try again.'));
        }
    } catch (error) {
        loadingOverlay.classList.remove('active');
        alert('Error placing order. Please try again or contact us directly.');
        console.error('Order error:', error);
    }
}

// ============================================
// INIT ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartUI();
    
    // Attach checkout form listener
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
    
    // Attach delivery address listener for fee calculation
    const deliveryAddress = document.getElementById('deliveryAddress');
    if (deliveryAddress) {
        deliveryAddress.addEventListener('blur', calculateDeliveryFee);
    }
});