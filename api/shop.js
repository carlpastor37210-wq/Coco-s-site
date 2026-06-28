export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      orderType,
      pickupDate,
      pickupTime,
      deliveryAddress,
      deliveryDate,
      deliveryTime,
      deliveryFee,
      subtotal,
      total,
      items,
      specialRequests
    } = req.body;

    if (!customerName || !customerEmail || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and at least one item are required.'
      });
    }

    // Build items list for email
    const itemsList = items
      .map(item => `• ${item.name} x${item.quantity} — €${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const orderDetails = orderType === 'delivery'
      ? `Delivery Address: ${deliveryAddress}\nDelivery Date: ${deliveryDate}\nDelivery Time: ${deliveryTime}\nDelivery Fee: €${deliveryFee.toFixed(2)}`
      : `Pickup Date: ${pickupDate}\nPickup Time: ${pickupTime}`;

    const emailContent = `
NEW ORDER — Coco's Café

Customer:
  Name: ${customerName}
  Email: ${customerEmail}
  Phone: ${customerPhone || 'Not provided'}

Order Type: ${orderType === 'delivery' ? 'Delivery' : 'Pickup'}
${orderDetails}

Items:
${itemsList}

Subtotal: €${subtotal.toFixed(2)}
Total: €${total.toFixed(2)}

Special Requests:
${specialRequests || 'None'}
    `.trim();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Coco\'s Café Orders <orders@kavinecoco.com>',
        to: 'info@kavinecoco.com',
        reply_to: customerEmail,
        subject: `New Order from ${customerName} — €${total.toFixed(2)}`,
        text: emailContent
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend error:', result);
      return res.status(500).json({
        success: false,
        message: 'Failed to place order. Please try again.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order placed successfully!'
    });

  } catch (error) {
    console.error('Order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
}
