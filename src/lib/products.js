// Product catalog with Stripe price IDs
export const products = [
  // Reference Guides
  {
    id: 'kuka-krl-reference',
    name: 'KUKA KRL Quick Reference',
    description: '3-page quick reference for KUKA KRL programming. Motion commands, logic, variables, I/O, error handling.',
    price: 0,
    priceId: null, // FREE
    category: 'reference',
    brand: 'KUKA',
    featured: true
  },
  {
    id: 'abb-rapid-reference',
    name: 'ABB RAPID Complete Reference',
    description: '3-page reference for ABB RAPID programming. Motion, I/O, error handling, routines, data types.',
    price: 12,
    priceId: 'price_1SvlBK6Eh1qLfWTtmR0X9DNT',
    category: 'reference',
    brand: 'ABB'
  },
  {
    id: 'fanuc-karel-reference',
    name: 'Fanuc Karel Quick Reference',
    description: '3-page reference for Fanuc Karel programming. Motion, I/O, files, error handling.',
    price: 12,
    priceId: 'price_1SvlBL6Eh1qLfWTtQfH0WCX8',
    category: 'reference',
    brand: 'Fanuc'
  },
  {
    id: 'ur-urscript-reference',
    name: 'Universal Robots URScript Reference',
    description: '3-page reference for UR cobot programming. Motion, I/O, safety, communication.',
    price: 12,
    priceId: 'price_1SvlBM6Eh1qLfWTtGOUmgNVD',
    category: 'reference',
    brand: 'UR'
  },
  {
    id: 'comau-pdl2-reference',
    name: 'Comau PDL2 Complete Reference',
    description: '3-page reference for Comau PDL2 programming. Motion, I/O, routines, error handling.',
    price: 15,
    priceId: 'price_1SvlBM6Eh1qLfWTt5nnV4115',
    category: 'reference',
    brand: 'Comau'
  },
  {
    id: 'yaskawa-inform-reference',
    name: 'Yaskawa INFORM Complete Reference',
    description: '3-page reference for Yaskawa INFORM programming. Motion, I/O, welding, jobs.',
    price: 12,
    priceId: 'price_1SvlBN6Eh1qLfWTtrvqsOD5J',
    category: 'reference',
    brand: 'Yaskawa'
  },
  {
    id: 'safety-standards',
    name: 'Robot Safety Standards Quick Guide',
    description: 'Essential safety standards (ISO 10218, ISO/TS 15066) for robot integrators.',
    price: 19,
    priceId: 'price_1SvlBO6Eh1qLfWTtqL8dfDZE',
    category: 'reference',
    brand: 'Safety'
  },
  // Code Templates
  {
    id: 'kuka-pick-place',
    name: 'KUKA Pick & Place Template',
    description: 'Production-ready KRL code template with error handling, I/O, and gripper control.',
    price: 29,
    priceId: 'price_1SvlBP6Eh1qLfWTtDDRXlc5V',
    category: 'template',
    brand: 'KUKA'
  },
  {
    id: 'abb-pick-place',
    name: 'ABB Pick & Place Template',
    description: 'Production-ready RAPID code template with error handling, I/O, and gripper control.',
    price: 29,
    priceId: 'price_1SvlBP6Eh1qLfWTtP1T8JsNw',
    category: 'template',
    brand: 'ABB'
  },
  {
    id: 'fanuc-pick-place',
    name: 'Fanuc Pick & Place Template',
    description: 'Production-ready Karel code template with error handling, I/O, and gripper control.',
    price: 29,
    priceId: 'price_1SvlBQ6Eh1qLfWTtHqcx0iYw',
    category: 'template',
    brand: 'Fanuc'
  },
  {
    id: 'ur-pick-place',
    name: 'UR Pick & Place Template',
    description: 'Production-ready URScript template for cobots with safety features.',
    price: 29,
    priceId: 'price_1SvlBR6Eh1qLfWTtzZk4BHf8',
    category: 'template',
    brand: 'UR'
  },
  {
    id: 'comau-pick-place',
    name: 'Comau Pick & Place Template',
    description: 'Production-ready PDL2 code template with error handling and I/O.',
    price: 29,
    priceId: 'price_1SvlBS6Eh1qLfWTtWU9igpHv',
    category: 'template',
    brand: 'Comau'
  },
  {
    id: 'yaskawa-pick-place',
    name: 'Yaskawa Pick & Place Template',
    description: 'Production-ready INFORM job template with error handling.',
    price: 29,
    priceId: 'price_1SvlBS6Eh1qLfWTtQg6KVf6R',
    category: 'template',
    brand: 'Yaskawa'
  },
  {
    id: 'error-handling-bundle',
    name: 'Error Handling Bundle (KUKA + ABB)',
    description: 'Professional error recovery frameworks for KUKA and ABB robots. Production-tested code.',
    price: 49,
    priceId: 'price_1SvlBT6Eh1qLfWTt59HlCtiA',
    category: 'bundle',
    brand: 'Multi',
    featured: true
  }
];

export function getProduct(id) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}
