import { error } from '@sveltejs/kit';
import { getProduct } from '$lib/products.js';
import fs from 'fs';
import path from 'path';

// Map product IDs to file paths
const fileMap = {
  'kuka-krl-reference': 'kuka-krl-reference/pdf/KUKA-KRL-Reference-Light.pdf',
  'abb-rapid-reference': 'abb-rapid-reference/pdf/ABB-RAPID-Complete-Reference.pdf',
  'fanuc-karel-reference': 'fanuc-karel-reference/pdf/Fanuc-Karel-Reference.pdf',
  'ur-urscript-reference': 'ur-urscript-reference/pdf/Universal-Robots-URScript-Reference.pdf',
  'comau-pdl2-reference': 'comau-pdl2-reference/pdf/Comau-PDL2-Complete-Reference.pdf',
  'yaskawa-inform-reference': 'yaskawa-inform-reference/pdf/Yaskawa-INFORM-Complete-Reference.pdf',
  'safety-standards': 'safety-standards-reference/pdf/Robot-Safety-Standards-Quick-Guide.pdf',
  'kuka-pick-place': 'KUKA-PickPlace-Template-v1.0.tar.gz',
  'abb-pick-place': 'ABB-PickPlace-Template-v1.0.tar.gz',
  'fanuc-pick-place': 'Fanuc-PickPlace-Template-v1.0.tar.gz',
  'ur-pick-place': 'UR-PickPlace-Template-v1.0.tar.gz',
  'comau-pick-place': 'Comau-PickPlace-Template-v1.0.tar.gz',
  'yaskawa-pick-place': 'Yaskawa-PickPlace-Template-v1.0.tar.gz',
  'error-handling-bundle': 'Error-Handling-Bundle-v1.0.tar.gz'
};

export async function GET({ params }) {
  const product = getProduct(params.id);
  
  if (!product) {
    throw error(404, 'Product not found');
  }
  
  const filePath = fileMap[params.id];
  if (!filePath) {
    throw error(404, 'File not found');
  }
  
  // For now, return a redirect to GitHub raw files or just a placeholder
  // In production, files would be stored in cloud storage
  
  // Placeholder: return product info
  return new Response(JSON.stringify({
    product: product.name,
    message: 'Download will be available soon. Files are being configured.',
    file: filePath
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
