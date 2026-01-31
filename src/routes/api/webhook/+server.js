import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST({ request }) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return json({ error: 'Invalid signature' }, { status: 400 });
  }
  
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('✅ Payment received:', {
        email: session.customer_details?.email,
        product: session.metadata?.productId,
        amount: session.amount_total / 100,
        currency: session.currency
      });
      
      // TODO: Send download link via email
      // For now, just log the successful payment
      
      // Notify via Telegram (optional - can add later)
      
      break;
    }
    
    case 'payment_intent.succeeded': {
      console.log('💰 Payment intent succeeded');
      break;
    }
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  return json({ received: true });
}
