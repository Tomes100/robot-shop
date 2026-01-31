<script>
  import { products } from '$lib/products.js';
  
  let loading = null;
  
  const references = products.filter(p => p.category === 'reference');
  const templates = products.filter(p => p.category === 'template');
  const bundles = products.filter(p => p.category === 'bundle');
  
  async function checkout(product) {
    if (product.price === 0) {
      // Free download - redirect to download page
      window.location.href = `/download/${product.id}`;
      return;
    }
    
    loading = product.id;
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: product.priceId, productId: product.id })
      });
      const { url, error } = await res.json();
      if (error) {
        alert(error);
      } else {
        window.location.href = url;
      }
    } catch (e) {
      alert('Checkout failed. Please try again.');
    }
    loading = null;
  }
</script>

<svelte:head>
  <title>Robot Programming Resources | Prime Robotics</title>
  <meta name="description" content="Quick reference guides and production-ready code templates for KUKA, ABB, Fanuc, UR, Comau, and Yaskawa robots.">
</svelte:head>

<div class="shop">
  <header>
    <h1>🤖 Robot Programming Resources</h1>
    <p>Quick reference guides and production-ready code templates for industrial robots</p>
    <p class="subtitle">By <a href="https://prime-robotics.eu">Prime Robotics</a> — 8+ years of robot programming experience</p>
  </header>

  <section class="category">
    <h2>📚 Quick Reference Guides</h2>
    <p class="category-desc">3-page cheat sheets covering essential commands. Keep on your desk or phone.</p>
    <div class="grid">
      {#each references as product}
        <div class="card" class:free={product.price === 0}>
          <div class="brand">{product.brand}</div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div class="footer">
            <span class="price">
              {#if product.price === 0}
                <span class="free-tag">FREE</span>
              {:else}
                €{product.price}
              {/if}
            </span>
            <button onclick={() => checkout(product)} disabled={loading === product.id}>
              {#if loading === product.id}
                Loading...
              {:else if product.price === 0}
                Download Free
              {:else}
                Buy Now
              {/if}
            </button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="category">
    <h2>💻 Code Templates</h2>
    <p class="category-desc">Production-ready pick & place programs with error handling, I/O, and documentation.</p>
    <div class="grid">
      {#each templates as product}
        <div class="card">
          <div class="brand">{product.brand}</div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div class="footer">
            <span class="price">€{product.price}</span>
            <button onclick={() => checkout(product)} disabled={loading === product.id}>
              {loading === product.id ? 'Loading...' : 'Buy Now'}
            </button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="category">
    <h2>🎁 Bundles</h2>
    <p class="category-desc">Save money with curated bundles.</p>
    <div class="grid">
      {#each bundles as product}
        <div class="card featured">
          <div class="brand">{product.brand}</div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div class="footer">
            <span class="price">€{product.price}</span>
            <button onclick={() => checkout(product)} disabled={loading === product.id}>
              {loading === product.id ? 'Loading...' : 'Buy Now'}
            </button>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <footer class="site-footer">
    <p>Questions? <a href="mailto:office@prime-robotics.eu">office@prime-robotics.eu</a></p>
    <p>© 2026 Prime Robotics S.R.L. | <a href="https://prime-robotics.eu">Main Site</a></p>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0f172a;
    color: #e2e8f0;
  }
  
  .shop {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  header p {
    color: #94a3b8;
    font-size: 1.1rem;
  }
  
  header .subtitle {
    font-size: 0.9rem;
  }
  
  header a {
    color: #60a5fa;
  }
  
  .category {
    margin-bottom: 3rem;
  }
  
  .category h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .category-desc {
    color: #94a3b8;
    margin-bottom: 1.5rem;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .card {
    background: #1e293b;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #334155;
    transition: transform 0.2s, border-color 0.2s;
  }
  
  .card:hover {
    transform: translateY(-2px);
    border-color: #60a5fa;
  }
  
  .card.free {
    border-color: #22c55e;
  }
  
  .card.featured {
    border-color: #f59e0b;
    background: linear-gradient(135deg, #1e293b 0%, #2d1f0f 100%);
  }
  
  .brand {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #60a5fa;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .card h3 {
    font-size: 1.1rem;
    margin: 0 0 0.75rem 0;
  }
  
  .card p {
    color: #94a3b8;
    font-size: 0.9rem;
    flex-grow: 1;
    margin: 0 0 1rem 0;
  }
  
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .price {
    font-size: 1.25rem;
    font-weight: 700;
  }
  
  .free-tag {
    color: #22c55e;
  }
  
  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  button:hover:not(:disabled) {
    background: #2563eb;
  }
  
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .card.free button {
    background: #22c55e;
  }
  
  .card.free button:hover:not(:disabled) {
    background: #16a34a;
  }
  
  .site-footer {
    text-align: center;
    padding: 2rem 0;
    color: #64748b;
    font-size: 0.9rem;
  }
  
  .site-footer a {
    color: #60a5fa;
  }
</style>
