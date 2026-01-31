<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let loading = true;
  let session = null;
  let error = null;
  
  onMount(async () => {
    const sessionId = $page.url.searchParams.get('session_id');
    if (!sessionId) {
      error = 'No session ID';
      loading = false;
      return;
    }
    
    try {
      const res = await fetch(`/api/session?id=${sessionId}`);
      const data = await res.json();
      if (data.error) {
        error = data.error;
      } else {
        session = data;
      }
    } catch (e) {
      error = 'Failed to load order details';
    }
    loading = false;
  });
</script>

<svelte:head>
  <title>Thank You! | Prime Robotics</title>
</svelte:head>

<div class="success">
  {#if loading}
    <div class="loading">Loading order details...</div>
  {:else if error}
    <div class="error">
      <h1>Something went wrong</h1>
      <p>{error}</p>
      <a href="/">Back to Shop</a>
    </div>
  {:else}
    <div class="content">
      <h1>Thank You!</h1>
      <p>Your purchase was successful.</p>
      
      {#if session?.customer_email}
        <p>A download link has been sent to <strong>{session.customer_email}</strong></p>
      {/if}
      
      <div class="download-box">
        <h2>Your Download</h2>
        <p>Click below to download your files:</p>
        <a href="/download/{session?.productId}" class="download-btn">Download Now</a>
      </div>
      
      <p class="support">Questions? Email <a href="mailto:office@prime-robotics.eu">office@prime-robotics.eu</a></p>
      
      <a href="/" class="back">← Back to Shop</a>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0f172a;
    color: #e2e8f0;
  }
  
  .success {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .content, .error, .loading {
    text-align: center;
    max-width: 500px;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .download-box {
    background: #1e293b;
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
    border: 1px solid #334155;
  }
  
  .download-box h2 {
    margin-top: 0;
  }
  
  .download-btn {
    display: inline-block;
    background: #22c55e;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: background 0.2s;
  }
  
  .download-btn:hover {
    background: #16a34a;
  }
  
  .support {
    color: #94a3b8;
    font-size: 0.9rem;
  }
  
  .support a {
    color: #60a5fa;
  }
  
  .back {
    color: #60a5fa;
    text-decoration: none;
  }
  
  .error h1 {
    color: #f87171;
  }
  
  .error a {
    color: #60a5fa;
  }
</style>
