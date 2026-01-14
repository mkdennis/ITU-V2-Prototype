// Jewelry-specific form options data

import type { Category, LabeledOption, Condition } from '../types/aiSuggestions'

// Jewelry-specific categories
export const jewelryCategories: Category[] = [
  { l1: 'Jewelry', l2: 'Bracelets', l3: ['Bangles', 'Charm Bracelets', 'Cuff Bracelets', 'Link Bracelets', 'Tennis Bracelets'] },
  { l1: 'Jewelry', l2: 'Brooches', l3: ['Cameo Brooches', 'Figural Brooches', 'Floral Brooches', 'Geometric Brooches', 'Bar Pins'] },
  { l1: 'Jewelry', l2: 'Cufflinks', l3: ['Novelty Cufflinks', 'Gemstone Cufflinks', 'Enamel Cufflinks', 'Vintage Cufflinks', 'Designer Cufflinks'] },
  { l1: 'Jewelry', l2: 'Earrings', l3: ['Stud Earrings', 'Drop Earrings', 'Hoop Earrings', 'Chandelier Earrings', 'Clip-On Earrings'] },
  { l1: 'Jewelry', l2: 'Loose Gemstones', l3: ['Diamonds', 'Colored Gemstones', 'Pearls', 'Semi-Precious Stones', 'Certified Stones'] },
  { l1: 'Jewelry', l2: 'Necklaces', l3: ['Pendant Necklaces', 'Chain Necklaces', 'Chokers', 'Lariat Necklaces', 'Statement Necklaces'] },
  { l1: 'Jewelry', l2: 'Objects d\'Art and Vertu', l3: ['Boxes and Cases', 'Desk Accessories', 'Miniatures', 'Smoking Accessories', 'Vanity Items'] },
  { l1: 'Jewelry', l2: 'Rings', l3: ['Engagement Rings', 'Wedding Bands', 'Cocktail Rings', 'Signet Rings', 'Stackable Rings'] },
  { l1: 'Jewelry', l2: 'Silver, Flatware and Silverplate', l3: ['Sterling Silver', 'Silver Plate', 'Hollowware', 'Flatware Sets', 'Serving Pieces'] },
  { l1: 'Jewelry', l2: 'Watches', l3: ['Dress Watches', 'Sport Watches', 'Chronographs', 'Pocket Watches', 'Vintage Watches'] },
]

// Gender options
export const genderOptions: LabeledOption[] = [
  { value: 'womens', label: "Women's" },
  { value: 'mens', label: "Men's" },
  { value: 'unisex', label: 'Unisex' },
  { value: 'childrens', label: "Children's" },
]

// Stone options
export const stoneOptions: string[] = [
  'Diamond',
  'Ruby',
  'Sapphire',
  'Emerald',
  'Pearl',
  'Opal',
  'Amethyst',
  'Topaz',
  'Turquoise',
  'Garnet',
  'Peridot',
  'Aquamarine',
  'Citrine',
  'Tanzanite',
  'Morganite',
  'Tourmaline',
  'Alexandrite',
  'Spinel',
  'Jade',
  'Onyx',
  'Coral',
  'Lapis Lazuli',
  'Moonstone',
  'Quartz',
]

// Stone cut options
export const stoneCutOptions: string[] = [
  'Round Brilliant',
  'Princess',
  'Cushion',
  'Oval',
  'Emerald Cut',
  'Pear',
  'Marquise',
  'Asscher',
  'Radiant',
  'Heart',
  'Baguette',
  'Trillion',
  'Cabochon',
  'Rose Cut',
  'Old European',
  'Old Mine',
  'Step Cut',
  'Mixed Cut',
]

// Metal options
export const metalOptions: string[] = [
  'Yellow Gold',
  'White Gold',
  'Rose Gold',
  'Platinum',
  'Sterling Silver',
  'Vermeil',
  'Palladium',
  'Titanium',
  'Stainless Steel',
  'Brass',
  'Copper',
  'Bronze',
  'Mixed Metals',
  '10K Gold',
  '14K Gold',
  '18K Gold',
  '22K Gold',
  '24K Gold',
]

// Other characteristics (fixed list per requirements)
export const otherCharacteristicsOptions: string[] = [
  'Amber',
  'Bakelite',
  'Bone',
  'Chronograph',
  'Crystal',
  'Ebony',
  'Enamel',
  'Fur',
  'Galalith',
  'Glass',
  'Hair',
  'Horn',
  'Ivory',
]

// Jewelry-specific styles
export const jewelryStyleOptions: LabeledOption[] = [
  { value: 'art-nouveau', label: 'Art Nouveau' },
  { value: 'art-deco', label: 'Art Deco' },
  { value: 'edwardian', label: 'Edwardian' },
  { value: 'victorian', label: 'Victorian' },
  { value: 'georgian', label: 'Georgian' },
  { value: 'retro', label: 'Retro' },
  { value: 'mid-century', label: 'Mid-Century' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'modern', label: 'Modern' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'estate', label: 'Estate' },
  { value: 'antique', label: 'Antique' },
  { value: 'belle-epoque', label: 'Belle Epoque' },
]

// Jewelry creators/brands
export const jewelryCreatorOptions: LabeledOption[] = [
  { value: 'cartier', label: 'Cartier' },
  { value: 'tiffany', label: 'Tiffany & Co.' },
  { value: 'van-cleef', label: 'Van Cleef & Arpels' },
  { value: 'bulgari', label: 'Bulgari' },
  { value: 'harry-winston', label: 'Harry Winston' },
  { value: 'chopard', label: 'Chopard' },
  { value: 'graff', label: 'Graff' },
  { value: 'david-yurman', label: 'David Yurman' },
  { value: 'buccellati', label: 'Buccellati' },
  { value: 'piaget', label: 'Piaget' },
  { value: 'rolex', label: 'Rolex' },
  { value: 'patek-philippe', label: 'Patek Philippe' },
  { value: 'omega', label: 'Omega' },
  { value: 'mikimoto', label: 'Mikimoto' },
  { value: 'lalique', label: 'Lalique' },
  { value: 'georg-jensen', label: 'Georg Jensen' },
  { value: 'chanel', label: 'Chanel' },
  { value: 'hermes', label: 'Hermes' },
  { value: 'boucheron', label: 'Boucheron' },
  { value: 'pomellato', label: 'Pomellato' },
]

// Jewelry-specific conditions
export const jewelryConditions: Condition[] = [
  {
    name: 'Distressed',
    description: 'Visible signs of previous wear including scratches, dents, or stone damage. May have missing stones, broken clasps, or significant wear to metal surfaces.'
  },
  {
    name: 'Fair',
    description: 'Shows moderate wear including light scratches, minor dents, or slight discoloration. All stones intact. May need professional cleaning or minor repair.'
  },
  {
    name: 'Good',
    description: 'Light wear consistent with age. Minor surface scratches visible under magnification. All components functional. Most vintage and estate jewelry fits this condition.'
  },
  {
    name: 'Excellent',
    description: 'Minimal to no visible wear. Original finish intact. All stones secure and undamaged. Fully functional clasps and settings. May show very light signs of handling.'
  },
  {
    name: 'New',
    description: 'Brand new, unworn condition. Original packaging and documentation where applicable. No scratches, wear, or handling marks.'
  },
]

// Jewelry-specific wear options
export const jewelryWearOptions: LabeledOption[] = [
  { value: 'consistent', label: 'Wear consistent with age and use' },
  { value: 'surface-scratches', label: 'Surface Scratches' },
  { value: 'patina', label: 'Patina Development' },
  { value: 'plating-wear', label: 'Plating Wear' },
  { value: 'stone-chips', label: 'Minor Stone Chips' },
]

// Jewelry-specific restoration options
export const jewelryRestorationOptions: string[] = [
  'Rhodium Plating',
  'Re-Polishing',
  'Stone Replacement',
  'Prong Re-Tipping',
  'Clasp Replacement',
  'Chain Repair',
  'Resizing',
  'Cleaning',
  'Engraving Additions',
]
