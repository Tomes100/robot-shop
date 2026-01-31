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
  <title>Robot Programming Resources | KUKA, ABB, Fanuc | Prime Robotics</title>
  <meta name="description" content="Quick reference guides and production-ready code templates for industrial robots. KUKA KRL, ABB RAPID, Fanuc Karel, UR, Comau, Yaskawa. Created by engineers, for engineers.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Robot Programming Resources | Prime Robotics">
  <meta property="og:description" content="Quick references and production-ready templates for KUKA, ABB, Fanuc, UR, Comau, and Yaskawa robots.">
  <meta property="og:type" content="website">
  
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

<div class="page">
  <!-- Header -->
  <header class="header">
    <div class="header-content">
      <a href="https://prime-robotics.eu" class="logo">
        <span class="logo-prime">PRIME</span>
        <span class="logo-robotics">ROBOTICS</span>
      </a>
      <a href="https://prime-robotics.eu/contact" class="btn-contact">Contact</a>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-content">
      <p class="hero-tag">Digital Resources for Robot Programmers</p>
      <h1>Quick References &<br><span class="highlight">Code Templates</span></h1>
      <p class="hero-subtitle">Production-ready resources for KUKA, ABB, Fanuc, UR, Comau & Yaskawa — created by an engineer with 8+ years on the factory floor.</p>
      
      <div class="hero-cta">
        <a href="#products" class="btn-primary">Browse Resources</a>
        {#if freeProduct}
          <button class="btn-secondary" onclick={() => checkout(freeProduct)}>
            Get Free KUKA Reference →
          </button>
        {/if}
      </div>
      
      <p class="hero-proof">Used by engineers at automotive plants across Europe</p>
    </div>
  </section>

  <!-- Free Lead Magnet -->
  {#if freeProduct}
  <section class="free-section">
    <div class="free-card">
      <div class="free-left">
        <span class="free-badge">FREE</span>
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

  <!-- Products -->
  <main id="products">
    <!-- Reference Guides -->
    <section class="section">
      <div class="section-header">
        <h2>Quick Reference Guides</h2>
        <p>3-page cheat sheets with the commands you actually use. Print them, keep them on your phone, or stick them on your monitor.</p>
      </div>
      <div class="grid">
        {#each references as product}
          <article class="card">
            <span class="card-brand">{product.brand}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div class="card-footer">
              <span class="card-price">€{product.price}</span>
              <button class="btn-buy" onclick={() => checkout(product)} disabled={loading === product.id}>
                {loading === product.id ? '...' : 'Buy Now'}
              </button>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <!-- Code Templates -->
    <section class="section">
      <div class="section-header">
        <h2>Production-Ready Templates</h2>
        <p>Skip the boilerplate. These templates include error handling, I/O management, gripper control, and inline documentation.</p>
      </div>
      <div class="grid">
        {#each templates as product}
          <article class="card">
            <div class="card-tags">
              <span class="card-brand">{product.brand}</span>
              <span class="card-type">Template</span>
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <ul class="card-features">
              <li>Error handling included</li>
              <li>I/O & gripper control</li>
              <li>Fully documented</li>
            </ul>
            <div class="card-footer">
              <span class="card-price">€{product.price}</span>
              <button class="btn-buy" onclick={() => checkout(product)} disabled={loading === product.id}>
                {loading === product.id ? '...' : 'Buy Now'}
              </button>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <!-- Bundles -->
    <section class="section">
      <div class="section-header">
        <h2>Bundles — Best Value</h2>
        <p>Save time and money with curated packages.</p>
      </div>
      <div class="grid">
        {#each bundles as product}
          <article class="card card-featured">
            <span class="card-featured-tag">Featured</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <ul class="card-features">
              <li>Multiple robot brands</li>
              <li>Production-tested code</li>
              <li>Save vs. buying separately</li>
            </ul>
            <div class="card-footer">
              <span class="card-price">€{product.price}</span>
              <button class="btn-buy btn-featured" onclick={() => checkout(product)} disabled={loading === product.id}>
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
        <h3>Factory-Tested</h3>
        <p>Created from real projects at automotive plants, not textbook examples.</p>
      </div>
      <div class="trust-item">
        <h3>Time-Saving</h3>
        <p>Stop rewriting the same error handling code. Start with something that works.</p>
      </div>
      <div class="trust-item">
        <h3>Well-Documented</h3>
        <p>Every template includes inline comments explaining the why, not just the what.</p>
      </div>
    </div>
  </section>

  <!-- About -->
  <section class="about">
    <h2>Built by Someone Who Gets It</h2>
    <p>I'm Calin, and I've spent 8+ years programming robots in automotive body shops across Europe — KUKA, ABB, Fanuc, Comau, you name it.</p>
    <p>These resources are what I wish I had when I started. No fluff, no theory — just the practical stuff that makes your job easier.</p>
    <a href="https://prime-robotics.eu" class="about-link">Prime Robotics — Custom robot programming & software →</a>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <p>Questions? <a href="mailto:office@prime-robotics.eu">office@prime-robotics.eu</a></p>
      <p class="footer-copy">© 2026 Prime Robotics S.R.L. Romania</p>
    </div>
  </footer>
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  :global(body) {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #fff;
    color: #2B3C5B;
    line-height: 1.6;
  }
  
  .page {
    min-height: 100vh;
  }
  
  /* Header */
  .header {
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }
  
  .logo-prime {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2B3C5B;
    letter-spacing: 0.05em;
  }
  
  .logo-robotics {
    font-size: 0.7rem;
    font-weight: 600;
    color: #05ACDC;
    letter-spacing: 0.15em;
  }
  
  .btn-contact {
    background: #05ACDC;
    color: #fff;
    padding: 0.5rem 1.25rem;
    border-radius: 0.25rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background 0.2s;
  }
  
  .btn-contact:hover {
    background: #0398bf;
  }
  
  /* Hero */
  .hero {
    background: linear-gradient(135deg, #2B3C5B 0%, #1e2a3f 100%);
    color: #fff;
    padding: 4rem 1.5rem;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .hero-tag {
    color: #05ACDC;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }
  
  .hero h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  
  .highlight {
    color: #05ACDC;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
    color: #cbd5e1;
    max-width: 600px;
    margin: 0 auto 2rem;
  }
  
  .hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  
  .btn-primary {
    background: #05ACDC;
    color: #fff;
    padding: 0.875rem 2rem;
    border-radius: 0.25rem;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    transition: background 0.2s;
    border: none;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background: #0398bf;
  }
  
  .btn-secondary {
    background: transparent;
    color: #05ACDC;
    padding: 0.875rem 2rem;
    border-radius: 0.25rem;
    font-weight: 600;
    font-size: 1rem;
    border: 2px solid #05ACDC;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-secondary:hover {
    background: rgba(5, 172, 220, 0.1);
  }
  
  .hero-proof {
    color: #4ade80;
    font-size: 0.9rem;
  }
  
  /* Free Section */
  .free-section {
    max-width: 900px;
    margin: -2rem auto 0;
    padding: 0 1.5rem;
    position: relative;
    z-index: 10;
  }
  
  .free-card {
    background: #fff;
    border: 2px solid #4ade80;
    border-radius: 0.5rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    flex-wrap: wrap;
  }
  
  .free-left {
    flex: 1;
    min-width: 250px;
  }
  
  .free-badge {
    display: inline-block;
    background: #4ade80;
    color: #fff;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }
  
  .free-card h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #2B3C5B;
  }
  
  .free-card p {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0;
  }
  
  .free-note {
    color: #94a3b8 !important;
    font-size: 0.8rem !important;
    margin-top: 0.5rem !important;
  }
  
  .btn-download {
    background: #4ade80;
    color: #fff;
    padding: 0.875rem 1.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  
  .btn-download:hover {
    background: #22c55e;
  }
  
  /* Main Content */
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
  }
  
  .section {
    margin-bottom: 4rem;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
    color: #2B3C5B;
    margin-bottom: 0.5rem;
  }
  
  .section-header p {
    color: #64748b;
    max-width: 600px;
  }
  
  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  /* Cards */
  .card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.2s;
  }
  
  .card:hover {
    border-color: #05ACDC;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }
  
  .card-featured {
    border-color: #f59e0b;
    background: linear-gradient(135deg, #fffbeb 0%, #fff 100%);
  }
  
  .card-tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .card-brand {
    display: inline-block;
    background: rgba(5, 172, 220, 0.1);
    color: #05ACDC;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }
  
  .card-type {
    background: #f1f5f9;
    color: #64748b;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-weight: 500;
  }
  
  .card-featured-tag {
    display: inline-block;
    background: rgba(245, 158, 11, 0.2);
    color: #d97706;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .card h3 {
    font-size: 1.1rem;
    color: #2B3C5B;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }
  
  .card p {
    color: #64748b;
    font-size: 0.9rem;
    flex-grow: 1;
    margin-bottom: 1rem;
  }
  
  .card-features {
    list-style: none;
    margin: 0 0 1.5rem;
    font-size: 0.85rem;
    color: #475569;
  }
  
  .card-features li {
    margin-bottom: 0.5rem;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
    margin-top: auto;
  }
  
  .card-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2B3C5B;
  }
  
  .btn-buy {
    background: #05ACDC;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .btn-buy:hover:not(:disabled) {
    background: #0398bf;
  }
  
  .btn-buy:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .btn-featured {
    background: #f59e0b;
  }
  
  .btn-featured:hover:not(:disabled) {
    background: #d97706;
  }
  
  /* Trust Section */
  .trust {
    background: #f8fafc;
    padding: 4rem 1.5rem;
  }
  
  .trust h2 {
    text-align: center;
    font-size: 1.5rem;
    color: #2B3C5B;
    margin-bottom: 3rem;
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
  
  .trust-item h3 {
    font-size: 1.1rem;
    color: #2B3C5B;
    margin-bottom: 0.5rem;
  }
  
  .trust-item p {
    color: #64748b;
    font-size: 0.9rem;
  }
  
  /* About */
  .about {
    max-width: 700px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
    text-align: center;
  }
  
  .about h2 {
    font-size: 1.5rem;
    color: #2B3C5B;
    margin-bottom: 1.5rem;
  }
  
  .about p {
    color: #64748b;
    margin-bottom: 1rem;
  }
  
  .about-link {
    display: inline-block;
    color: #05ACDC;
    text-decoration: none;
    font-weight: 600;
    margin-top: 1rem;
  }
  
  .about-link:hover {
    text-decoration: underline;
  }
  
  /* Footer */
  .footer {
    background: #2B3C5B;
    color: #fff;
    padding: 2rem 1.5rem;
    text-align: center;
  }
  
  .footer p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
  
  .footer a {
    color: #05ACDC;
    text-decoration: none;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
  
  .footer-copy {
    color: #94a3b8;
    font-size: 0.8rem !important;
  }
  
  /* Mobile */
  @media (max-width: 640px) {
    .hero {
      padding: 3rem 1rem;
    }
    
    .hero h1 {
      font-size: 1.75rem;
    }
    
    .hero-cta {
      flex-direction: column;
    }
    
    .free-card {
      flex-direction: column;
      text-align: center;
    }
    
    .free-left {
      text-align: center;
    }
    
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
