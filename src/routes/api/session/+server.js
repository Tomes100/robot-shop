import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function GET({ url }) {
  const sessionId = url.searchParams.get('id');
  
  if (!sessionId) {
    return json({ error: 'Missing session ID' }, { status: 400 });
  }
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return json({
      customer_email: session.customer_details?.email,
      productId: session.metadata?.productId,
      payment_status: session.payment_status
    });
  } catch (err) {
    console.error('Session lookup error:', err);
    return json({ error: 'Session not found' }, { status: 404 });
  }
}
