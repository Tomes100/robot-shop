import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST({ request, url }) {
  try {
    const { priceId, productId } = await request.json();
    
    if (!priceId) {
      return json({ error: 'Missing price ID' }, { status: 400 });
    }
    
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${url.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url.origin}`,
      metadata: {
        productId
      }
    });
    
    return json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return json({ error: err.message }, { status: 500 });
  }
}
