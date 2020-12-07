const stripe = require('stripe')('sk_test_51Hv6PdAXIZRaoh9Grp2DsDbAZRVwMOzQAk9RRBLAfaHqGad1HJHZIuVz7dilResM0HSpo43ZMTO0GDmnmGyq4UGO00zGnqQcXo');

const express = require('express');
const stripeRouter = require('express').Router();
// change domain as needed
const DOMAIN = 'http://localhost:3000'

stripeRouter.post('/create-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stubborn Attachments',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/cancel`,
    });
    res.json({ id: session.id });
});


module.exports = stripeRouter;
