<script>
  import { products } from '$lib/products.js';
  
  let loading = null;
  
  const freeProduct = products.find(p => p.price === 0);
  const references = products.filter(p => p.category === 'reference' && p.price > 0);
  const templates = products.filter(p => p.category === 'template');
  const bundles = products.filter(p => p.category === 'bundle');
  
  async function checkout(product) {
    if (product.price === 0) {
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
      if (error) alert(error);
      else window.location.href = url;
    } catch (e) {
      alert('Checkout failed. Please try again.');
    }
    loading = null;
  }
</script>

<svelte:head>
  <title>Robot Programming Resources | KUKA, ABB, Fanuc Templates | Prime Robotics</title>
  <meta name="description" content="Quick reference guides and production-ready code templates for industrial robots. KUKA KRL, ABB RAPID, Fanuc Karel, UR, Comau, Yaskawa. Created by engineers, for engineers.">
  <meta name="keywords" content="KUKA KRL, ABB RAPID, Fanuc Karel, robot programming, code templates, industrial robots">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Robot Programming Resources | Prime Robotics">
  <meta property="og:description" content="Quick references and production-ready templates for KUKA, ABB, Fanuc, UR, Comau, and Yaskawa robots.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://shop.prime-robotics.eu">
  
  <!-- Schema.org -->
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Prime Robotics Shop",
    "description": "Digital resources for robot programmers",
    "url": "https://shop.prime-robotics.eu",
    "seller": {
      "@type": "Organization",
      "name": "Prime Robotics",
      "url": "https://prime-robotics.eu"
    }
  }
  </script>`}
</svelte:head>

<div class="shop">
  <!-- Hero Section -->
  <header class="hero">
    <p class="eyebrow">From the factory floor to your desk</p>
    <h1>Robot Programming<br><span class="gradient">Made Easier</span></h1>
    <p class="subtitle">Quick reference guides and production-ready code templates for KUKA, ABB, Fanuc, UR, Comau & Yaskawa — created by an engineer with 8+ years on the line.</p>
    
    <div class="social-proof">
      <span class="proof-badge">✓ Used by engineers at automotive plants across Europe</span>
    </div>
    
    <div class="hero-cta">
      <button class="btn-primary" onclick={() => document.getElementById('products').scrollIntoView({behavior: 'smooth'})}>
        Browse Resources
      </button>
      {#if freeProduct}
        <button class="btn-free" onclick={() => checkout(freeProduct)}>
          Get Free KUKA Reference →
        </button>
      {/if}
    </div>
  </header>

  <!-- Free Lead Magnet -->
  {#if freeProduct}
  <section class="free-section">
    <div class="free-card">
      <div class="free-badge">FREE</div>
      <div class="free-content">
        <h2>{freeProduct.name}</h2>
        <p>{freeProduct.description}</p>
        <p class="free-note">No email required. Instant download.</p>
      </div>
      <button class="btn-download" onclick={() => checkout(freeProduct)}>
        Download Free PDF
      </button>
    </div>
  </section>
  {/if}

  <main id="products">
    <!-- Reference Guides -->
    <section class="category">
      <div class="category-header">
        <h2>📚 Quick Reference Guides</h2>
        <p>3-page cheat sheets with the commands you actually use. Print them, keep them on your phone, or stick them on your monitor.</p>
      </div>
      <div class="grid">
        {#each references as product}
          <article class="card">
            <div class="card-top">
              <span class="brand-tag">{product.brand}</span>
            </div>
            <h3>{product.name}</h3>
            <p class="description">{product.description}</p>
            <div class="card-footer">
              <div class="price">€{product.price}</div>
              <button 
                class="btn-buy" 
                onclick={() => checkout(product)} 
                disabled={loading === product.id}
              >
                {loading === product.id ? '...' : 'Buy Now'}
              </button>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <!-- Code Templates -->
    <section class="category">
      <div class="category-header">
        <h2>💻 Production-Ready Templates</h2>
        <p>Skip the boilerplate. These templates include error handling, I/O management, gripper control, and inline documentation — ready for your next project.</p>
      </div>
      <div class="grid">
        {#each templates as product}
          <article class="card">
            <div class="card-top">
              <span class="brand-tag">{product.brand}</span>
              <span class="type-tag">Template</span>
            </div>
            <h3>{product.name}</h3>
            <p class="description">{product.description}</p>
            <ul class="features">
              <li>✓ Error handling included</li>
              <li>✓ I/O & gripper control</li>
              <li>✓ Fully documented</li>
            </ul>
            <div class="card-footer">
              <div class="price">€{product.price}</div>
              <button 
                class="btn-buy" 
                onclick={() => checkout(product)} 
                disabled={loading === product.id}
              >
                {loading === product.id ? '...' : 'Buy Now'}
              </button>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <!-- Bundles -->
    <section class="category">
      <div class="category-header">
        <h2>🎁 Bundles — Best Value</h2>
        <p>Save time and money with curated packages.</p>
      </div>
      <div class="grid">
        {#each bundles as product}
          <article class="card featured">
            <div class="card-top">
              <span class="featured-tag">⭐ Featured</span>
            </div>
            <h3>{product.name}</h3>
            <p class="description">{product.description}</p>
            <ul class="features">
              <li>✓ Multiple robot brands</li>
              <li>✓ Production-tested code</li>
              <li>✓ Save vs. buying separately</li>
            </ul>
            <div class="card-footer">
              <div class="price">€{product.price}</div>
              <button 
                class="btn-buy featured-btn" 
                onclick={() => checkout(product)} 
                disabled={loading === product.id}
              >
                {loading === product.id ? '...' : 'Get Bundle'}
              </button>
            </div>
          </article>
        {/each}
      </div>
    </section>
  </main>

  <!-- Trust Section -->
  <section class="trust">
    <h2>Why These Resources?</h2>
    <div class="trust-grid">
      <div class="trust-item">
        <span class="trust-icon">🏭</span>
        <h3>Factory-Tested</h3>
        <p>Created from real projects at automotive plants, not textbook examples.</p>
      </div>
      <div class="trust-item">
        <span class="trust-icon">⚡</span>
        <h3>Time-Saving</h3>
        <p>Stop rewriting the same error handling code. Start with something that works.</p>
      </div>
      <div class="trust-item">
        <span class="trust-icon">📖</span>
        <h3>Well-Documented</h3>
        <p>Every template includes inline comments explaining the why, not just the what.</p>
      </div>
    </div>
  </section>

  <!-- About -->
  <section class="about">
    <div class="about-content">
      <h2>Built by Someone Who Gets It</h2>
      <p>I'm Calin, and I've spent 8+ years programming robots in automotive body shops across Europe — KUKA, ABB, Fanuc, Comau, you name it.</p>
      <p>These resources are what I wish I had when I started. No fluff, no theory — just the practical stuff that makes your job easier.</p>
      <p class="about-link">
        <a href="https://prime-robotics.eu">Prime Robotics</a> — Custom robot programming & software
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <p>Questions? <a href="mailto:office@prime-robotics.eu">office@prime-robotics.eu</a></p>
      <p class="copyright">© 2026 Prime Robotics S.R.L. Romania</p>
    </div>
  </footer>
</div>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  
  :global(body) {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0f172a;
    color: #f1f5f9;
    line-height: 1.6;
  }
  
  .shop {
    min-height: 100vh;
  }
  
  /* Hero */
  .hero {
    max-width: 800px;
    margin: 0 auto;
    padding: 4rem 1.5rem 3rem;
    text-align: center;
  }
  
  .eyebrow {
    color: #60a5fa;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }
  
  .hero h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 1.5rem;
  }
  
  .gradient {
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .subtitle {
    font-size: 1.125rem;
    color: #94a3b8;
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
  
  .social-proof {
    margin-bottom: 2rem;
  }
  
  .proof-badge {
    display: inline-block;
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #4ade80;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.875rem;
  }
  
  .hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn-primary {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
  }
  
  .btn-free {
    background: transparent;
    color: #4ade80;
    border: 2px solid #4ade80;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-free:hover {
    background: rgba(34, 197, 94, 0.1);
  }
  
  /* Free Section */
  .free-section {
    max-width: 800px;
    margin: 0 auto 3rem;
    padding: 0 1.5rem;
  }
  
  .free-card {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%);
    border: 2px solid rgba(34, 197, 94, 0.3);
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .free-badge {
    background: #22c55e;
    color: #0f172a;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
  
  .free-content {
    flex: 1;
    min-width: 200px;
  }
  
  .free-content h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }
  
  .free-content p {
    margin: 0;
    color: #94a3b8;
  }
  
  .free-note {
    font-size: 0.875rem;
    color: #64748b !important;
    margin-top: 0.5rem !important;
  }
  
  .btn-download {
    background: #22c55e;
    color: #0f172a;
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  
  .btn-download:hover {
    background: #16a34a;
    transform: translateY(-2px);
  }
  
  /* Main Content */
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  /* Category Sections */
  .category {
    margin-bottom: 4rem;
  }
  
  .category-header {
    margin-bottom: 2rem;
  }
  
  .category-header h2 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem;
  }
  
  .category-header p {
    color: #94a3b8;
    margin: 0;
    max-width: 600px;
  }
  
  /* Product Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  /* Product Cards */
  .card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 0.75rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.2s;
  }
  
  .card:hover {
    border-color: #475569;
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  .card.featured {
    border-color: #f59e0b;
    background: linear-gradient(135deg, #1e293b 0%, #27201a 100%);
  }
  
  .card-top {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .brand-tag {
    background: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .type-tag {
    background: rgba(148, 163, 184, 0.2);
    color: #94a3b8;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .featured-tag {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .card h3 {
    font-size: 1.125rem;
    margin: 0 0 0.75rem;
    line-height: 1.3;
  }
  
  .description {
    color: #94a3b8;
    font-size: 0.9rem;
    margin: 0 0 1rem;
    flex-grow: 1;
  }
  
  .features {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
    font-size: 0.875rem;
    color: #cbd5e1;
  }
  
  .features li {
    margin-bottom: 0.5rem;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid #334155;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .btn-buy {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-buy:hover:not(:disabled) {
    background: #2563eb;
  }
  
  .btn-buy:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .featured-btn {
    background: #f59e0b;
  }
  
  .featured-btn:hover:not(:disabled) {
    background: #d97706;
  }
  
  /* Trust Section */
  .trust {
    background: #1e293b;
    padding: 4rem 1.5rem;
    margin: 4rem 0;
  }
  
  .trust h2 {
    text-align: center;
    margin: 0 0 3rem;
    font-size: 1.5rem;
  }
  
  .trust-grid {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .trust-item {
    text-align: center;
  }
  
  .trust-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .trust-item h3 {
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
  }
  
  .trust-item p {
    margin: 0;
    color: #94a3b8;
    font-size: 0.9rem;
  }
  
  /* About Section */
  .about {
    max-width: 700px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    text-align: center;
  }
  
  .about h2 {
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
  }
  
  .about p {
    color: #94a3b8;
    margin: 0 0 1rem;
  }
  
  .about-link {
    margin-top: 1.5rem !important;
  }
  
  .about-link a {
    color: #60a5fa;
    text-decoration: none;
  }
  
  .about-link a:hover {
    text-decoration: underline;
  }
  
  /* Footer */
  .footer {
    border-top: 1px solid #1e293b;
    padding: 2rem 1.5rem;
    text-align: center;
  }
  
  .footer p {
    margin: 0 0 0.5rem;
    color: #64748b;
    font-size: 0.875rem;
  }
  
  .footer a {
    color: #60a5fa;
    text-decoration: none;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
  
  .copyright {
    color: #475569 !important;
  }
  
  /* Mobile Responsive */
  @media (max-width: 640px) {
    .hero {
      padding: 3rem 1rem 2rem;
    }
    
    .hero h1 {
      font-size: 1.75rem;
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .hero-cta {
      flex-direction: column;
    }
    
    .free-card {
      flex-direction: column;
      text-align: center;
    }
    
    .grid {
      grid-template-columns: 1fr;
    }
    
    .trust {
      padding: 3rem 1rem;
    }
  }
</style>
