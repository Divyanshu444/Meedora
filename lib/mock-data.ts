import type { Product, Collection } from './shopify-types'

export const mockProducts: Product[] = [
  {
    id: 'prod_aira_hoops',
    handle: 'aira-hammered-hoops',
    title: 'Aira Hammered Gold Hoops',
    description:
      'Lightweight, handcrafted textured hoops finished in 18k-tone gold. Designed for all-day wear with secure snap closures.',
    productType: 'Earrings',
    tags: ['Everyday', 'Gold-plated', 'Under ₹1,500', 'Bestseller'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/aira-hoops.png',
      altText: 'Aira Hammered Gold Hoops by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/aira-hoops.png',
          altText: 'Aira Hammered Gold Hoops front view',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '1299.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1299.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_aira_1',
          title: '18k Gold Plated / Standard',
          availableForSale: true,
          price: { amount: '1299.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1699.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: '18k Gold Plated' }],
          image: {
            url: '/images/products/aira-hoops.png',
            altText: 'Aira Hammered Gold Hoops',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['18k Gold Plated'] }],
    seo: {
      title: 'Aira Hammered Gold Hoops | Meedora',
      description: 'Handcrafted gold-plated hoops for everyday wear.',
    },
    metafields: [
      { key: 'material', value: 'Brass with 18k Micron Gold Plating' },
      { key: 'plating', value: 'Anti-tarnish protective e-coating' },
      { key: 'care', value: 'Wipe gently with soft cloth, avoid direct perfume contact' },
      { key: 'size', value: 'Diameter: 28mm, Thickness: 3mm' },
    ],
  },
  {
    id: 'prod_sitara_necklace',
    handle: 'sitara-celestial-pendant',
    title: 'Sitara Celestial Pendant Necklace',
    description:
      'A delicate beaded chain suspending a handcrafted starburst pendant set with brilliant simulated stones. An understated centerpiece for your neckline.',
    productType: 'Necklaces & Pendants',
    tags: ['Everyday', 'Gifting', 'Gold-plated', 'New', 'Bestseller'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/sitara-necklace.png',
      altText: 'Sitara Celestial Pendant Necklace by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/sitara-necklace.png',
          altText: 'Sitara Celestial Pendant Necklace by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '1899.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1899.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_sitara_1',
          title: '18k Gold Plated / 16 inch',
          availableForSale: true,
          price: { amount: '1899.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '2499.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Length', value: '16 + 2 inch extender' }],
          image: {
            url: '/images/products/sitara-necklace.png',
            altText: 'Sitara Celestial Pendant Necklace',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Length', values: ['16 + 2 inch extender'] }],
    seo: {
      title: 'Sitara Celestial Pendant Necklace | Meedora',
      description: 'Handcrafted celestial pendant necklace in warm 18k gold tone.',
    },
    metafields: [
      { key: 'material', value: 'Hypoallergenic brass with micro-set stones' },
      { key: 'plating', value: 'Premium 18k Gold Vermeil style finish' },
      { key: 'care', value: 'Store in airtight pouch provided' },
      { key: 'size', value: 'Pendant: 14mm, Chain: 40cm + 5cm extension' },
    ],
  },
  {
    id: 'prod_gul_ring',
    handle: 'gul-petal-adjustable-ring',
    title: 'Gul Petal Adjustable Ring',
    description:
      'Inspired by blooming petals at dawn. Gently contoured band with comfort curve and open back for flexible sizing.',
    productType: 'Rings',
    tags: ['Everyday', 'Gifts Under ₹999', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/gul-ring.png',
      altText: 'Gul Petal Adjustable Ring by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/gul-ring.png',
          altText: 'Gul Petal Adjustable Ring by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '899.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '899.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_gul_1',
          title: 'Gold / Adjustable',
          availableForSale: true,
          price: { amount: '899.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1199.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Size', value: 'Adjustable (fits 10-16)' }],
          image: {
            url: '/images/products/gul-ring.png',
            altText: 'Gul Petal Adjustable Ring',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Size', values: ['Adjustable (fits 10-16)'] }],
    seo: {
      title: 'Gul Petal Adjustable Ring | Meedora',
      description: 'Handcrafted floral petal gold ring with adjustable fit.',
    },
    metafields: [
      { key: 'material', value: 'Lead and nickel free brass' },
      { key: 'plating', value: '18k Micron Gold with gloss seal' },
      { key: 'care', value: 'Remove before sanitizing or swimming' },
      { key: 'size', value: 'Adjustable inner diameter 16mm–18mm' },
    ],
  },
  {
    id: 'prod_noor_jhumkas',
    handle: 'noor-kundan-pearl-jhumkas',
    title: 'Noor Kundan & Pearl Jhumkas',
    description:
      'Intricately set faux Kundan stones accented by clustered seed pearls. Lightweight design allows comfortable wear through long celebrations.',
    productType: 'Earrings',
    tags: ['Festive', 'Gold-plated', 'Bestseller'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/noor-jhumkas.png',
      altText: 'Noor Kundan & Pearl Jhumkas by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/noor-jhumkas.png',
          altText: 'Noor Kundan & Pearl Jhumkas by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '2199.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '2199.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_noor_1',
          title: 'Antique Gold / Pair',
          availableForSale: true,
          price: { amount: '2199.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '2999.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Color', value: 'Antique Gold with Seed Pearls' }],
          image: {
            url: '/images/products/noor-jhumkas.png',
            altText: 'Noor Kundan & Pearl Jhumkas',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Color', values: ['Antique Gold with Seed Pearls'] }],
    seo: {
      title: 'Noor Kundan & Pearl Jhumkas | Meedora',
      description: 'Lightweight festive jhumkas with handcrafted kundan and pearl drops.',
    },
    metafields: [
      { key: 'material', value: 'High grade alloy with faux kundan and pearls' },
      { key: 'plating', value: 'Micron gold antique finish' },
      { key: 'care', value: 'Store dry in Meedora signature box' },
      { key: 'size', value: 'Length: 48mm, Width: 22mm, Weight: 14g' },
    ],
  },
  {
    id: 'prod_tara_bracelet',
    handle: 'tara-dainty-chain-bracelet',
    title: 'Tara Dainty Chain Bracelet',
    description:
      'Minimalist interlocking links with a tiny drop pearl. Sits flush against the wrist, perfect for stacking alongside your watch.',
    productType: 'Bracelets & Bangles',
    tags: ['Everyday', 'Gifts Under ₹999', 'Gifting'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/aira-hoops.png',
      altText: 'Tara Dainty Chain Bracelet by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/aira-hoops.png',
          altText: 'Tara Dainty Chain Bracelet by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '949.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '949.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_tara_1',
          title: '18k Gold Plated / 6.5 - 7.5 inch',
          availableForSale: true,
          price: { amount: '949.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Length', value: 'Adjustable 6.5 to 7.5 inch' }],
          image: {
            url: '/images/products/aira-hoops.png',
            altText: 'Tara Dainty Chain Bracelet',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Length', values: ['Adjustable 6.5 to 7.5 inch'] }],
    seo: {
      title: 'Tara Dainty Chain Bracelet | Meedora',
      description: 'Dainty gold chain bracelet handcrafted in India.',
    },
    metafields: [
      { key: 'material', value: 'Anti-tarnish gold plated brass' },
      { key: 'plating', value: '18k Micron Gold' },
      { key: 'care', value: 'Wipe clean with microfiber cloth' },
      { key: 'size', value: 'Length: 16.5cm + 3cm extension' },
    ],
  },
  {
    id: 'prod_anaya_anklet',
    handle: 'anaya-delicate-payal-anklet',
    title: 'Anaya Delicate Bell Anklet',
    description:
      'A contemporary reimagining of the classic Indian payal. Whispering mini bead drops that move gracefully with every step.',
    productType: 'Anklets',
    tags: ['Everyday', 'Festive', 'Silver'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/sitara-necklace.png',
      altText: 'Anaya Delicate Bell Anklet by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/sitara-necklace.png',
          altText: 'Anaya Delicate Bell Anklet by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '1199.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1199.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_anaya_1',
          title: 'Silver Finish / Pair',
          availableForSale: true,
          price: { amount: '1199.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1599.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: 'Silver Plated' }],
          image: {
            url: '/images/products/sitara-necklace.png',
            altText: 'Anaya Delicate Bell Anklet',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['Silver Plated'] }],
    seo: {
      title: 'Anaya Delicate Bell Anklet | Meedora',
      description: 'Handcrafted subtle anklet designed for everyday elegance.',
    },
    metafields: [
      { key: 'material', value: 'Sterling silver plated alloy' },
      { key: 'plating', value: 'Rhodium protective seal' },
      { key: 'care', value: 'Avoid direct contact with water and lotions' },
      { key: 'size', value: 'Length: 24cm + 4cm extension' },
    ],
  },
]
