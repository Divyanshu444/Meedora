import type { Product } from './shopify-types'

export const mockProducts: Product[] = [
  // ─── EARRINGS ───
  {
    id: 'prod_aira_hoops',
    handle: 'aira-hammered-hoops',
    title: 'Aira Hammered Gold Hoops',
    description:
      'Lightweight, handcrafted textured hoops finished in 18k-tone gold. Designed for all-day comfort with secure click-top snap closures.',
    productType: 'Earrings',
    tags: ['Everyday', 'Gold-plated', 'Bestseller'],
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
        {
          url: '/images/meedora-ritual.png',
          altText: 'Aira Hammered Gold Hoops worn on ear',
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
          id: 'var_aira_gold',
          title: '18k Gold Plated',
          availableForSale: true,
          price: { amount: '1299.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1699.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: '18k Gold Plated' }],
          image: {
            url: '/images/products/aira-hoops.png',
            altText: 'Aira Hammered Gold Hoops in 18k Gold',
            width: 1000,
            height: 1250,
          },
        },
        {
          id: 'var_aira_silver',
          title: 'Silver Finish',
          availableForSale: true,
          price: { amount: '1299.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1699.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: 'Silver Finish' }],
          image: {
            url: '/images/products/aira-hoops.png',
            altText: 'Aira Hammered Hoops in Silver',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['18k Gold Plated', 'Silver Finish'] }],
    seo: {
      title: 'Aira Hammered Gold Hoops | Meedora',
      description: 'Handcrafted gold-plated hoops for everyday wear with textured finish.',
    },
    metafields: [
      { key: 'material', value: 'High-grade hypoallergenic brass base' },
      { key: 'plating', value: '18k Micron Gold Plating with protective anti-tarnish e-coating' },
      { key: 'care', value: 'Store dry in Meedora signature box; keep away from harsh perfumes' },
      { key: 'size', value: 'Diameter: 28mm · Thickness: 3mm · Weight: 6.2g (ultra-lightweight)' },
      { key: 'styling', value: 'Pairs effortlessly with casual workwear or a crisp white linen shirt' },
    ],
  },
  {
    id: 'prod_noor_jhumkas',
    handle: 'noor-kundan-pearl-jhumkas',
    title: 'Noor Kundan & Pearl Jhumkas',
    description:
      'Intricately set faux Kundan stones accented by clustered seed pearls. Lightweight hollow bell architecture allows comfortable wear throughout weddings and festivals.',
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
          altText: 'Noor Kundan & Pearl Jhumkas front view',
          width: 1000,
          height: 1250,
        },
        {
          url: '/images/meedora-campaign.png',
          altText: 'Noor Jhumkas worn for festive celebration',
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
          id: 'var_noor_gold',
          title: 'Antique Gold / Pearl Drops',
          availableForSale: true,
          price: { amount: '2199.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '2999.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Style', value: 'Antique Gold / Pearl Drops' }],
          image: {
            url: '/images/products/noor-jhumkas.png',
            altText: 'Noor Kundan & Pearl Jhumkas',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Style', values: ['Antique Gold / Pearl Drops'] }],
    seo: {
      title: 'Noor Kundan & Pearl Jhumkas | Meedora',
      description: 'Handcrafted festive jhumkas with Kundan stones and seed pearls.',
    },
    metafields: [
      { key: 'material', value: 'Sculpted brass with faceted glass kundan and imitation seed pearls' },
      { key: 'plating', value: 'Rich 22k tone antique gold plating with lacquer seal' },
      { key: 'care', value: 'Wipe with cotton swab after wear; keep inside the velvet pouch' },
      { key: 'size', value: 'Length: 48mm · Bell Width: 22mm · Weight: 14g per pair' },
      { key: 'styling', value: 'Ideal with raw silk kurtas, chanderi sarees, and festive lehengas' },
    ],
  },
  {
    id: 'prod_miraya_studs',
    handle: 'miraya-floral-crystal-studs',
    title: 'Miraya Floral Crystal Studs',
    description:
      'Petite botanical studs featuring seven prong-set simulated crystals framing a golden core. Subtle brilliance for office and daily meetings.',
    productType: 'Earrings',
    tags: ['Everyday', 'Gifts Under ₹999', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/aira-hoops.png',
      altText: 'Miraya Floral Crystal Studs by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/aira-hoops.png',
          altText: 'Miraya Floral Crystal Studs by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '849.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '849.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_miraya_gold',
          title: '18k Gold Plated',
          availableForSale: true,
          price: { amount: '849.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1199.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: '18k Gold Plated' }],
          image: {
            url: '/images/products/aira-hoops.png',
            altText: 'Miraya Floral Crystal Studs',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['18k Gold Plated'] }],
    seo: {
      title: 'Miraya Floral Crystal Studs | Meedora',
      description: 'Dainty floral everyday studs with simulated crystals and gold plating.',
    },
    metafields: [
      { key: 'material', value: 'Nickel-free brass with AAA grade cubic zirconia' },
      { key: 'plating', value: '18k Yellow Gold micron electroplating' },
      { key: 'care', value: 'Store dry in airtight bag; remove before sleeping' },
      { key: 'size', value: 'Diameter: 9mm · Push-back post with comfort butterfly closure' },
      { key: 'styling', value: 'Subtle sparkle designed to pair with second-hole piercings or solo' },
    ],
  },

  // ─── NECKLACES & PENDANTS ───
  {
    id: 'prod_sitara_necklace',
    handle: 'sitara-celestial-pendant',
    title: 'Sitara Celestial Pendant Necklace',
    description:
      'A delicate beaded chain suspending a handcrafted starburst pendant set with brilliant micro-faceted stones. An understated centerpiece for your neckline.',
    productType: 'Necklaces & Pendants',
    tags: ['Everyday', 'Gifting', 'Gold-plated', 'Bestseller'],
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
        {
          url: '/images/meedora-ritual.png',
          altText: 'Sitara Pendant worn close-up on model',
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
          id: 'var_sitara_16',
          title: '16 + 2 inch Extender / Gold',
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
      { key: 'material', value: 'Hypoallergenic brass with micro-pavé simulated stones' },
      { key: 'plating', value: 'Premium 18k Gold Vermeil-style micro plating' },
      { key: 'care', value: 'Store flat in provided blush box to avoid chain tangling' },
      { key: 'size', value: 'Pendant: 14mm · Chain: 40cm + 5cm extension' },
      { key: 'styling', value: 'Stacks seamlessly with plain snake chains or sits gracefully solo on V-necks' },
    ],
  },
  {
    id: 'prod_aditi_pearl_choker',
    handle: 'aditi-freshwater-pearl-choker',
    title: 'Aditi Dainty Pearl Choker',
    description:
      'Graduated imitation rice pearls strung on silk thread with an adjustable gold extension clasp. Classic elegance updated for modern daily wear.',
    productType: 'Necklaces & Pendants',
    tags: ['Everyday', 'Gifting', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/sitara-necklace.png',
      altText: 'Aditi Dainty Pearl Choker by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/sitara-necklace.png',
          altText: 'Aditi Dainty Pearl Choker by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '1499.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1499.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_aditi_gold',
          title: 'Gold Clasp / 14-16 inch',
          availableForSale: true,
          price: { amount: '1499.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1999.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Clasp', value: '18k Gold Clasp' }],
          image: {
            url: '/images/products/sitara-necklace.png',
            altText: 'Aditi Dainty Pearl Choker',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Clasp', values: ['18k Gold Clasp'] }],
    seo: {
      title: 'Aditi Dainty Pearl Choker | Meedora',
      description: 'Handcrafted pearl choker with 18k gold adjustable clasp.',
    },
    metafields: [
      { key: 'material', value: 'Cultured look seed pearls with brass lobster clasp' },
      { key: 'plating', value: '18k Micron Gold on all metal components' },
      { key: 'care', value: 'Keep away from oils and water; wipe with soft dry cloth' },
      { key: 'size', value: 'Length: 35cm + 6cm adjustable chain' },
      { key: 'styling', value: 'Effortless collarbone fit for high-neck tops or casual collars' },
    ],
  },
  {
    id: 'prod_zuri_snake_chain',
    handle: 'zuri-layered-snake-chain',
    title: 'Zuri Dual Layered Snake Chain',
    description:
      'Two complementary herringbone chains joined into one seamless clasp. Liquid-smooth drape that catches natural sunlight at every angle.',
    productType: 'Necklaces & Pendants',
    tags: ['Everyday', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/sitara-necklace.png',
      altText: 'Zuri Dual Layered Snake Chain by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/sitara-necklace.png',
          altText: 'Zuri Dual Layered Snake Chain by Meedora',
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
          id: 'var_zuri_gold',
          title: '18k Gold Plated',
          availableForSale: true,
          price: { amount: '1299.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1749.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: '18k Gold Plated' }],
          image: {
            url: '/images/products/sitara-necklace.png',
            altText: 'Zuri Dual Layered Snake Chain',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['18k Gold Plated'] }],
    seo: {
      title: 'Zuri Dual Layered Snake Chain | Meedora',
      description: 'Double strand herringbone gold-plated snake chain necklace.',
    },
    metafields: [
      { key: 'material', value: 'Solid brass flat-woven links' },
      { key: 'plating', value: 'Long-lasting 18k gold tone with scratch-resistant seal' },
      { key: 'care', value: 'Store flat; do not bend or kink the herringbone links' },
      { key: 'size', value: 'Upper tier: 38cm · Lower tier: 43cm + 5cm extension' },
      { key: 'styling', value: 'Gives the instant look of an intentional multi-chain stack' },
    ],
  },

  // ─── RINGS ───
  {
    id: 'prod_gul_ring',
    handle: 'gul-petal-adjustable-ring',
    title: 'Gul Petal Adjustable Ring',
    description:
      'Inspired by blooming petals at dawn. Gently contoured band with comfort curve and open back for flexible sizing across fingers.',
    productType: 'Rings',
    tags: ['Everyday', 'Gifts Under ₹999', 'Gold-plated', 'Bestseller'],
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
          id: 'var_gul_gold',
          title: '18k Gold / Adjustable',
          availableForSale: true,
          price: { amount: '899.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1199.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: '18k Gold Plated' }],
          image: {
            url: '/images/products/gul-ring.png',
            altText: 'Gul Petal Adjustable Ring',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['18k Gold Plated'] }],
    seo: {
      title: 'Gul Petal Adjustable Ring | Meedora',
      description: 'Handcrafted floral petal gold ring with adjustable fit.',
    },
    metafields: [
      { key: 'material', value: 'Lead and nickel free brass' },
      { key: 'plating', value: '18k Micron Gold with high-gloss protective finish' },
      { key: 'care', value: 'Remove before washing hands, sanitizing, or swimming' },
      { key: 'size', value: 'Adjustable inner diameter 16mm–18mm (fits sizes 10–16 comfortably)' },
      { key: 'styling', value: 'Can be worn on pointer, middle, or ring finger by gently squeezing' },
    ],
  },
  {
    id: 'prod_riya_baguette_ring',
    handle: 'riya-baguette-solitaire-ring',
    title: 'Riya Baguette Solitaire Ring',
    description:
      'A clean east-west set emerald-cut baguette cubic zirconia on an ultra-slim band. Sleek architectural geometry for everyday elegance.',
    productType: 'Rings',
    tags: ['Everyday', 'Gifts Under ₹999', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/gul-ring.png',
      altText: 'Riya Baguette Solitaire Ring by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/gul-ring.png',
          altText: 'Riya Baguette Solitaire Ring by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '799.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '799.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_riya_gold',
          title: '18k Gold / Size 12-14',
          availableForSale: true,
          price: { amount: '799.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1099.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Size', value: 'Adjustable (12-14)' }],
          image: {
            url: '/images/products/gul-ring.png',
            altText: 'Riya Baguette Solitaire Ring',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Size', values: ['Adjustable (12-14)'] }],
    seo: {
      title: 'Riya Baguette Solitaire Ring | Meedora',
      description: 'East-west baguette stone ring in gold finish.',
    },
    metafields: [
      { key: 'material', value: 'Solid brass with hand-set baguette cubic zirconia' },
      { key: 'plating', value: '18k Micron Yellow Gold plating' },
      { key: 'care', value: 'Wipe dry with lint-free cloth after daily wear' },
      { key: 'size', value: 'Stone: 6mm x 3mm · Band thickness: 1.5mm' },
      { key: 'styling', value: 'Designed to stack flush beneath wider statement bands' },
    ],
  },
  {
    id: 'prod_meher_filigree_ring',
    handle: 'meher-vintage-filigree-ring',
    title: 'Meher Vintage Filigree Ring',
    description:
      'Intricate lace-like Indian filigree work sculpted with a raised navette center. Captures antique heritage charm with lightweight modern wearability.',
    productType: 'Rings',
    tags: ['Festive', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/gul-ring.png',
      altText: 'Meher Vintage Filigree Ring by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/gul-ring.png',
          altText: 'Meher Vintage Filigree Ring by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '1099.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1099.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_meher_gold',
          title: 'Antique Gold / Adjustable',
          availableForSale: true,
          price: { amount: '1099.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1499.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: 'Antique Gold' }],
          image: {
            url: '/images/products/gul-ring.png',
            altText: 'Meher Vintage Filigree Ring',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['Antique Gold'] }],
    seo: {
      title: 'Meher Vintage Filigree Ring | Meedora',
      description: 'Handcrafted vintage filigree statement ring in gold tone.',
    },
    metafields: [
      { key: 'material', value: 'Artisan hand-punched brass alloy' },
      { key: 'plating', value: 'Vintage antique gold tone with semi-matte sealant' },
      { key: 'care', value: 'Keep away from moisture; store in airtight ziplock' },
      { key: 'size', value: 'Face width: 22mm · Adjustable shank fits sizes 12–18' },
      { key: 'styling', value: 'Makes a regal statement on the index finger for ethnic celebrations' },
    ],
  },

  // ─── BRACELETS & BANGLES ───
  {
    id: 'prod_tara_bracelet',
    handle: 'tara-dainty-chain-bracelet',
    title: 'Tara Dainty Chain Bracelet',
    description:
      'Minimalist interlocking links with a tiny drop pearl. Sits flush against the wrist, perfect for stacking alongside your watch or wearing solo.',
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
          id: 'var_tara_gold',
          title: '18k Gold / 6.5 - 7.5 inch',
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
      { key: 'material', value: 'Anti-tarnish gold plated brass with miniature glass pearl' },
      { key: 'plating', value: '18k Micron Gold electroplate' },
      { key: 'care', value: 'Wipe clean with microfiber cloth; remove before showering' },
      { key: 'size', value: 'Length: 16.5cm + 3cm extension' },
      { key: 'styling', value: 'Sits cleanly next to metal-strap wristwatches or delicate cuffs' },
    ],
  },
  {
    id: 'prod_riva_hammered_cuff',
    handle: 'riva-hammered-open-cuff',
    title: 'Riva Hammered Open Cuff',
    description:
      'A sculptural open cuff bracelet with light-catching hammered facets. Flexible structure allows gentle adjustment to hug any wrist contour.',
    productType: 'Bracelets & Bangles',
    tags: ['Everyday', 'Gold-plated', 'Bestseller'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/aira-hoops.png',
      altText: 'Riva Hammered Open Cuff by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/aira-hoops.png',
          altText: 'Riva Hammered Open Cuff by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '1399.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1399.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_riva_gold',
          title: '18k Gold Plated / Free Size',
          availableForSale: true,
          price: { amount: '1399.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1899.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: '18k Gold Plated' }],
          image: {
            url: '/images/products/aira-hoops.png',
            altText: 'Riva Hammered Open Cuff',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['18k Gold Plated'] }],
    seo: {
      title: 'Riva Hammered Open Cuff | Meedora',
      description: 'Handcrafted hammered open gold cuff bracelet.',
    },
    metafields: [
      { key: 'material', value: 'Solid hand-hammered malleable brass' },
      { key: 'plating', value: '18k High Micron Gold with protective e-coat' },
      { key: 'care', value: 'Store separately in pouch to maintain satin sheen' },
      { key: 'size', value: 'Width: 8mm · Inner diameter: 58mm (adjustable)' },
      { key: 'styling', value: 'Bold minimalism that complements both western tailoring and festive silks' },
    ],
  },
  {
    id: 'prod_kavya_kada_pair',
    handle: 'kavya-textured-kada-pair',
    title: 'Kavya Textured Kada Pair',
    description:
      'Pair of classic Indian kadas with refined rope twist detailing and hidden screw clasp. Heavier weight gives a reassuring, authentic feel on the wrist.',
    productType: 'Bracelets & Bangles',
    tags: ['Festive', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/aira-hoops.png',
      altText: 'Kavya Textured Kada Pair by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/aira-hoops.png',
          altText: 'Kavya Textured Kada Pair by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '2499.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '2499.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_kavya_size26',
          title: 'Size 2.6 (Medium)',
          availableForSale: true,
          price: { amount: '2499.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '3299.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Size', value: '2.6 (Medium)' }],
          image: {
            url: '/images/products/aira-hoops.png',
            altText: 'Kavya Textured Kada Pair',
            width: 1000,
            height: 1250,
          },
        },
        {
          id: 'var_kavya_size28',
          title: 'Size 2.8 (Large)',
          availableForSale: true,
          price: { amount: '2499.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '3299.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Size', value: '2.8 (Large)' }],
          image: {
            url: '/images/products/aira-hoops.png',
            altText: 'Kavya Textured Kada Pair',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Size', values: ['2.6 (Medium)', '2.8 (Large)'] }],
    seo: {
      title: 'Kavya Textured Kada Pair | Meedora',
      description: 'Textured gold kada bangles pair for festive occasions.',
    },
    metafields: [
      { key: 'material', value: 'Heavy cast brass with rope motif engraving' },
      { key: 'plating', value: '22k Gold tone traditional micron polish' },
      { key: 'care', value: 'Store in Meedora box lined with velvet; avoid moisture' },
      { key: 'size', value: 'Pair of 2 bangles · Standard 2.6 and 2.8 diameter options' },
      { key: 'styling', value: 'Wear one on each wrist or stack together for festive opulence' },
    ],
  },

  // ─── ANKLETS ───
  {
    id: 'prod_anaya_anklet',
    handle: 'anaya-delicate-payal-anklet',
    title: 'Anaya Delicate Bell Anklet',
    description:
      'A contemporary reimagining of the classic Indian payal. Whispering mini bead drops that move gracefully with every step without loud chime.',
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
          id: 'var_anaya_silver',
          title: 'Silver Finish / Single',
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
      { key: 'material', value: 'Silver-plated copper-brass alloy' },
      { key: 'plating', value: 'Rhodium protective finish for non-tarnish daily wear' },
      { key: 'care', value: 'Avoid direct contact with water, chlorine, and foot creams' },
      { key: 'size', value: 'Length: 24cm + 4cm extension clasp' },
      { key: 'styling', value: 'Pairs gracefully with mojaris, sandals, or bare feet at home' },
    ],
  },
  {
    id: 'prod_roohi_beaded_payal',
    handle: 'roohi-minimalist-beaded-payal',
    title: 'Roohi Minimalist Beaded Payal',
    description:
      'Ultra-dainty single strand payal dotted with micro gold beads. So light you will forget you are wearing it until the mirror catches the glint.',
    productType: 'Anklets',
    tags: ['Everyday', 'Gifts Under ₹999', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/sitara-necklace.png',
      altText: 'Roohi Minimalist Beaded Payal by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/sitara-necklace.png',
          altText: 'Roohi Minimalist Beaded Payal by Meedora',
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
          id: 'var_roohi_gold',
          title: '18k Gold Plated',
          availableForSale: true,
          price: { amount: '899.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '1199.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: '18k Gold Plated' }],
          image: {
            url: '/images/products/sitara-necklace.png',
            altText: 'Roohi Minimalist Beaded Payal',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['18k Gold Plated'] }],
    seo: {
      title: 'Roohi Minimalist Beaded Payal | Meedora',
      description: 'Dainty beaded gold payal for everyday wear.',
    },
    metafields: [
      { key: 'material', value: 'High strength core wire with brass micro-beads' },
      { key: 'plating', value: '18k Micron Gold with anti-rust treatment' },
      { key: 'care', value: 'Wipe dry after exposure to rain or perspiration' },
      { key: 'size', value: 'Length: 23cm + 5cm extension' },
      { key: 'styling', value: 'Understated beauty peeking out under cigarette pants or anarkalis' },
    ],
  },
  {
    id: 'prod_mehrunisa_kundan_payal',
    handle: 'mehrunisa-kundan-charm-payal',
    title: 'Mehrunisa Kundan Charm Payal',
    description:
      'Festive ankle adornment strung with floral Kundan florets and freshwater-look seed pearls. Crafted for Navratri garba nights and wedding celebrations.',
    productType: 'Anklets',
    tags: ['Festive', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/noor-jhumkas.png',
      altText: 'Mehrunisa Kundan Charm Payal by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/noor-jhumkas.png',
          altText: 'Mehrunisa Kundan Charm Payal by Meedora',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '1799.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1799.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_mehrunisa_pair',
          title: 'Pair (2 pieces) / Antique Gold',
          availableForSale: true,
          price: { amount: '1799.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '2399.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Quantity', value: 'Pair of 2' }],
          image: {
            url: '/images/products/noor-jhumkas.png',
            altText: 'Mehrunisa Kundan Charm Payal',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Quantity', values: ['Pair of 2'] }],
    seo: {
      title: 'Mehrunisa Kundan Charm Payal | Meedora',
      description: 'Festive Kundan and pearl payal pair for celebrations.',
    },
    metafields: [
      { key: 'material', value: 'Brass framework with bezel-set Kundan stones' },
      { key: 'plating', value: 'Antique Gold 22k tone plating' },
      { key: 'care', value: 'Store wrapped in cotton inside the Meedora keepsake box' },
      { key: 'size', value: 'Length: 25cm + 3cm adjustable hook' },
      { key: 'styling', value: 'The ultimate ankle adornment for festive lehengas and festive skirts' },
    ],
  },

  // ─── JEWELLERY SETS ───
  {
    id: 'prod_sitara_festive_set',
    handle: 'sitara-festive-choker-studs-set',
    title: 'Sitara Festive Choker & Studs Set',
    description:
      'A harmonious pairing of our starburst choker necklace with matching celestial studs. Thoughtfully bundled in our signature luxury presentation box.',
    productType: 'Jewellery Sets',
    tags: ['Festive', 'Gifting', 'Gold-plated', 'Bestseller'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/sitara-necklace.png',
      altText: 'Sitara Festive Choker & Studs Set by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/sitara-necklace.png',
          altText: 'Sitara Festive Choker & Studs Set by Meedora',
          width: 1000,
          height: 1250,
        },
        {
          url: '/images/products/aira-hoops.png',
          altText: 'Sitara Matching Studs detail',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '3499.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '3499.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_sitara_set_gold',
          title: '18k Gold Plated Complete Set',
          availableForSale: true,
          price: { amount: '3499.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '4599.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Option', value: 'Necklace + Studs Set' }],
          image: {
            url: '/images/products/sitara-necklace.png',
            altText: 'Sitara Festive Set',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Option', values: ['Necklace + Studs Set'] }],
    seo: {
      title: 'Sitara Festive Choker & Studs Set | Meedora',
      description: 'Complete celestial jewelry set with choker necklace and matching studs.',
    },
    metafields: [
      { key: 'material', value: 'High grade brass with pavé simulated diamonds' },
      { key: 'plating', value: '18k Micron Gold Plating with high-durability seal' },
      { key: 'care', value: 'Store each piece in its custom velvet insert slot' },
      { key: 'size', value: 'Choker: 36cm + 6cm extender · Studs: 11mm diameter' },
      { key: 'styling', value: 'Take the guesswork out of pairing: seamless coordination for festive evenings' },
    ],
  },
  {
    id: 'prod_noor_royal_heritage_set',
    handle: 'noor-royal-heritage-kundan-set',
    title: 'Noor Royal Heritage Kundan Set',
    description:
      'Regal bridal & festive ensemble comprising a grand Kundan collar necklace and matching tiered jhumkas. Made for the moments when you want to feel unforgettable.',
    productType: 'Jewellery Sets',
    tags: ['Festive', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/noor-jhumkas.png',
      altText: 'Noor Royal Heritage Kundan Set by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/noor-jhumkas.png',
          altText: 'Noor Royal Heritage Kundan Set by Meedora',
          width: 1000,
          height: 1250,
        },
        {
          url: '/images/meedora-campaign.png',
          altText: 'Noor Heritage Set on model',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '4299.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '4299.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_noor_set_gold',
          title: 'Royal Antique Gold Set',
          availableForSale: true,
          price: { amount: '4299.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '5699.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: 'Antique Gold' }],
          image: {
            url: '/images/products/noor-jhumkas.png',
            altText: 'Noor Royal Heritage Set',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['Antique Gold'] }],
    seo: {
      title: 'Noor Royal Heritage Kundan Set | Meedora',
      description: 'Antique Kundan and pearl collar necklace with jhumkas set.',
    },
    metafields: [
      { key: 'material', value: 'Traditional jadau-style Kundan setting with clustered seed pearls' },
      { key: 'plating', value: '22k tone heritage gold finish with green enamel meenakari back' },
      { key: 'care', value: 'Store dry in the provided blush rigid box' },
      { key: 'size', value: 'Necklace: adjustable dori thread tie · Jhumkas: 55mm drop' },
      { key: 'styling', value: 'Stunning complement for deep sweetheart, scoop, or boat neck bridal blouses' },
    ],
  },
  {
    id: 'prod_zoya_layering_duo',
    handle: 'zoya-minimalist-pendant-studs-duo',
    title: 'Zoya Minimalist Pendant & Studs Duo',
    description:
      'Everyday essential duo: a feather-light coin pendant suspended on a fine curb chain, accompanied by matched textured button studs. The quintessential daily adornment.',
    productType: 'Jewellery Sets',
    tags: ['Everyday', 'Gifting', 'Gold-plated'],
    availableForSale: true,
    updatedAt: new Date().toISOString(),
    featuredImage: {
      url: '/images/products/sitara-necklace.png',
      altText: 'Zoya Minimalist Pendant & Studs Duo by Meedora',
      width: 1000,
      height: 1250,
    },
    images: {
      nodes: [
        {
          url: '/images/products/sitara-necklace.png',
          altText: 'Zoya Minimalist Pendant & Studs Duo by Meedora',
          width: 1000,
          height: 1250,
        },
        {
          url: '/images/products/aira-hoops.png',
          altText: 'Zoya Studs Component',
          width: 1000,
          height: 1250,
        },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '2299.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '2299.00', currencyCode: 'INR' },
    },
    variants: {
      nodes: [
        {
          id: 'var_zoya_gold',
          title: '18k Gold Plated Duo',
          availableForSale: true,
          price: { amount: '2299.00', currencyCode: 'INR' },
          compareAtPrice: { amount: '2999.00', currencyCode: 'INR' },
          selectedOptions: [{ name: 'Finish', value: '18k Gold Plated' }],
          image: {
            url: '/images/products/sitara-necklace.png',
            altText: 'Zoya Minimalist Duo',
            width: 1000,
            height: 1250,
          },
        },
      ],
    },
    options: [{ name: 'Finish', values: ['18k Gold Plated'] }],
    seo: {
      title: 'Zoya Minimalist Pendant & Studs Duo | Meedora',
      description: 'Handcrafted gold daily wear pendant and studs matching jewelry set.',
    },
    metafields: [
      { key: 'material', value: '100% hypoallergenic brass with brush finish' },
      { key: 'plating', value: '18k Micron Yellow Gold plating with e-coat' },
      { key: 'care', value: 'Wipe with soft cloth after daily wear' },
      { key: 'size', value: 'Pendant: 12mm on 42cm chain · Studs: 7mm' },
      { key: 'styling', value: 'The ultimate self-gift or effortless gift for sister or friend' },
    ],
  },
]
