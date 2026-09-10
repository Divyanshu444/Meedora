export const siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'localhost:3000'}`

/** Three-axis navigation structure (Category / Edit / Gifting) */
export const categoryCollections = [
  { handle: 'earrings', title: 'Earrings' },
  { handle: 'necklaces-pendants', title: 'Necklaces & Pendants' },
  { handle: 'rings', title: 'Rings' },
  { handle: 'bracelets', title: 'Bracelets & Bangles' },
  { handle: 'anklets', title: 'Anklets' },
  { handle: 'sets', title: 'Jewellery Sets' },
]

export const editCollections = [
  { handle: 'everyday', title: 'Everyday', description: 'Pieces for the woman who adorns herself — no occasion needed.' },
  { handle: 'festive', title: 'Festive', description: 'A little extra shimmer for celebrations big and small.' },
  { handle: 'gifting-edit', title: 'Gifting Edit', description: 'Thoughtful pieces to gift someone (or yourself).' },
]

export const specialCollections = [
  { handle: 'new-arrivals', title: 'New Arrivals' },
  { handle: 'bestsellers', title: 'Bestsellers' },
  { handle: 'sale', title: 'Sale' },
]

export const giftingCollections = [
  { handle: 'gifts-under-999', title: 'Gifts Under ₹999' },
  { handle: 'gifts-for-her', title: 'Gifts for Her' },
]

export const contentLinks = [
  { handle: 'about', title: 'Our story' },
  { handle: 'shipping', title: 'Shipping information' },
  { handle: 'returns', title: 'Returns & exchanges' },
  { handle: 'size-guide', title: 'Size & fit guide' },
  { handle: 'care', title: 'Jewelry care' },
  { handle: 'contact', title: 'Contact us' },
  { handle: 'faq', title: 'Frequently asked questions' },
  { handle: 'privacy', title: 'Privacy policy' },
  { handle: 'terms', title: 'Terms of service' },
  { handle: 'gift-store', title: 'Gift store' },
]

/** Price filter bands for PLP */
export const priceFilters = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 – ₹3,500', min: 2000, max: 3500 },
  { label: 'Above ₹3,500', min: 3500, max: Infinity },
]

/** Metal tone filter options */
export const metalFilters = ['Gold-plated', 'Silver', 'Rose Gold', 'Oxidised']

/** Style tag filter options */
export const styleFilters = ['Everyday', 'Festive', 'Gifting']
