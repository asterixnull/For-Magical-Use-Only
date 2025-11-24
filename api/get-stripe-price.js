// api/get-stripe-price.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { priceId } = req.query;

  if (!priceId) {
    return res.status(400).json({ error: 'A priceId query parameter is required.' });
  }

  try {
    const price = await stripe.prices.retrieve(priceId);
    res.status(200).json({
      unit_amount: price.unit_amount,
      currency: price.currency,
    });
  } catch (error) {
    console.error('Error fetching price from Stripe:', error);
    res.status(500).json({ error: 'Failed to retrieve price information.' });
  }
};
