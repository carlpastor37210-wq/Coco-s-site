// ============================================
// SHOP ORDER API
// ============================================
export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // ============================================
    // VALIDATION
    // ============================================
    if (!formData.items || formData.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing customer information' 
      });
    }

    // ============================================
    // PROCESS ORDER (without payment)
    // ============================================
    const orderId = `ORDER-${Date.now()}`;
    
    const orderData = {
      orderId,
      timestamp: new Date().toISOString(),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      items: formData.items,
      orderType: formData.orderType,
      subtotal: formData.subtotal,
      deliveryFee: formData.deliveryFee || 0,
      total: formData.total,
      specialRequests: formData.specialRequests || '',
      
      // Pickup or Delivery details
      ...(formData.orderType === 'pickup' ? {
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime
      } : {
        deliveryAddress: formData.deliveryAddress,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        distanceKm: formData.distanceKm || 0
      })
    };

    // TODO: In production, save to database
    // For now, we'll just return success
    console.log('Order received:', orderData);

    // ============================================
    // SEND CONFIRMATION EMAIL (optional)
    // ============================================
    // TODO: Integrate email service (SendGrid, Mailgun, etc.)
    // await sendConfirmationEmail(formData.customerEmail, orderData);

    // ============================================
    // RESPONSE
    // ============================================
    return res.status(200).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: orderId,
      orderData: orderData
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing order. Please try again.',
      error: error.message
    });
  }
}