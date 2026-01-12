// Centralized form options data - extracted for use in AI matching

import type { Category, LabeledOption, Condition } from '../types/aiSuggestions'

export const categories: Category[] = [
  { l1: 'Decorative Objects', l2: 'Bowls and Baskets', l3: ['Bowls', 'Baskets', 'Trays'] },
  { l1: 'Decorative Objects', l2: 'Boxes', l3: ['Jewelry Boxes', 'Decorative Boxes', 'Storage Boxes'] },
  { l1: 'Decorative Objects', l2: 'Candle Holders', l3: ['Candelabras', 'Candle Lamps', 'Candle Sconces'] },
  { l1: 'Decorative Objects', l2: 'Clocks', l3: ['Wall Clocks', 'Mantle Clocks', 'Grandfather Clocks'] },
  { l1: 'Decorative Objects', l2: 'Desk Accessories', l3: ['Paperweights', 'Letter Holders', 'Pen Stands'] },
  { l1: 'Decorative Objects', l2: 'Picture Frames', l3: ['Table Frames', 'Wall Frames', 'Standing Frames'] },
  { l1: 'Decorative Objects', l2: 'Sculptures', l3: ['Abstract', 'Figurative', 'Busts'] },
  { l1: 'Decorative Objects', l2: 'Vases and Vessels', l3: ['Floor Vases', 'Table Vases', 'Urns'] },
  { l1: 'Lighting', l2: 'Chandeliers and Pendants', l3: ['Crystal Chandeliers', 'Modern Pendants', 'Vintage Chandeliers'] },
  { l1: 'Lighting', l2: 'Floor Lamps', l3: ['Arc Lamps', 'Torchiere', 'Reading Lamps'] },
  { l1: 'Lighting', l2: 'Flush Mount', l3: ['Ceiling Lights', 'Semi-Flush Mount', 'Recessed Lighting'] },
  { l1: 'Lighting', l2: 'Lanterns', l3: ['Outdoor Lanterns', 'Indoor Lanterns', 'Hanging Lanterns'] },
  { l1: 'Lighting', l2: 'Table Lamps', l3: ['Desk Lamps', 'Bedside Lamps', 'Accent Lamps'] },
  { l1: 'Lighting', l2: 'Wall Lights and Sconces', l3: ['Swing Arm Sconces', 'Candle Sconces', 'Picture Lights'] },
  { l1: 'Seating', l2: 'Dining Chairs', l3: ['Side Chairs', 'Arm Chairs', 'Bar Stools'] },
  { l1: 'Seating', l2: 'Stools', l3: ['Counter Stools', 'Footstools', 'Ottomans'] },
  { l1: 'Tables', l2: 'Vanities', l3: ['Makeup Vanities', 'Dressing Tables', 'Bathroom Vanities'] },
  // Extended categories for better matching
  { l1: 'Furniture', l2: 'Coffee Tables', l3: ['Round Coffee Tables', 'Square Coffee Tables', 'Oval Coffee Tables'] },
  { l1: 'Furniture', l2: 'Dining Tables', l3: ['Rectangular', 'Round', 'Extendable'] },
  { l1: 'Furniture', l2: 'Side Tables', l3: ['End Tables', 'Accent Tables', 'Nesting Tables'] },
  { l1: 'Furniture', l2: 'Console Tables', l3: ['Entryway Consoles', 'Sofa Tables', 'Hallway Tables'] },
  { l1: 'Furniture', l2: 'Desks', l3: ['Writing Desks', 'Executive Desks', 'Secretary Desks'] },
  { l1: 'Furniture', l2: 'Cabinets', l3: ['Display Cabinets', 'Storage Cabinets', 'Bar Cabinets'] },
  { l1: 'Furniture', l2: 'Bookcases', l3: ['Open Bookcases', 'Closed Bookcases', 'Modular Shelving'] },
  { l1: 'Furniture', l2: 'Dressers', l3: ['Chest of Drawers', 'Armoires', 'Highboys'] },
  { l1: 'Furniture', l2: 'Beds', l3: ['Platform Beds', 'Canopy Beds', 'Headboards'] },
  { l1: 'Seating', l2: 'Sofas', l3: ['Sectionals', 'Loveseats', 'Settees'] },
  { l1: 'Seating', l2: 'Armchairs', l3: ['Club Chairs', 'Wingback Chairs', 'Lounge Chairs'] },
  { l1: 'Seating', l2: 'Benches', l3: ['Entryway Benches', 'Window Benches', 'Storage Benches'] },
]

export const materialOptions: string[] = [
  'Brass',
  'Bronze',
  'Cherry',
  'Fabric',
  'Glass',
  'Leather',
  'Mahogany',
  'Maple',
  'Marble',
  'Metal',
  'Oak',
  'Pine',
  'Rattan',
  'Solid Wood',
  'Steel',
  'Teak',
  'Velvet',
  'Veneer',
  'Walnut',
  'Wicker',
  // Extended materials
  'Aluminum',
  'Bamboo',
  'Ceramic',
  'Chrome',
  'Copper',
  'Cotton',
  'Crystal',
  'Ebony',
  'Elm',
  'Iron',
  'Lacquer',
  'Linen',
  'Lucite',
  'Nickel',
  'Plastic',
  'Porcelain',
  'Rosewood',
  'Silk',
  'Silver',
  'Stone',
  'Suede',
  'Wool',
]

export const wearOptions: LabeledOption[] = [
  { value: 'consistent', label: 'Wear consistent with age and use' },
  { value: 'minor-losses', label: 'Minor Losses' },
  { value: 'minor-structural', label: 'Minor Structural Damages' },
  { value: 'minor-fading', label: 'Minor Fading' },
]

export const restorationOptions: string[] = [
  'Repairs',
  'Replacements',
  'Refinishing',
  'Reupholstery',
  'Reweaving',
  'Rewiring',
  'Additions or Alterations to Original',
]

export const weightOptions: LabeledOption[] = [
  { value: 'less-40', label: 'Less than 40 lbs (<18 kilos)' },
  { value: '40-70', label: 'Between 40-70 lbs (18-31 kilos)' },
  { value: '70-200', label: 'Between 70-200 lbs (31-90 kilos)' },
  { value: 'more-200', label: 'More than 200 lbs (90+ kilos)' },
]

export const attributionOptions: LabeledOption[] = [
  { value: 'attributed-to', label: 'Attributed To' },
  { value: 'by', label: 'By' },
  { value: 'by-documented', label: 'By and Documented' },
  { value: 'style-of', label: 'In the Style of' },
  { value: 'unattributed', label: 'Unattributed' },
]

export const creatorOptions: LabeledOption[] = [
  { value: 'charles-eames', label: 'Charles Eames' },
  { value: 'ray-eames', label: 'Ray Eames' },
  { value: 'hans-wegner', label: 'Hans Wegner' },
  { value: 'arne-jacobsen', label: 'Arne Jacobsen' },
  { value: 'george-nakashima', label: 'George Nakashima' },
  { value: 'mies-van-der-rohe', label: 'Mies van der Rohe' },
  { value: 'le-corbusier', label: 'Le Corbusier' },
  { value: 'isamu-noguchi', label: 'Isamu Noguchi' },
  { value: 'finn-juhl', label: 'Finn Juhl' },
  { value: 'eero-saarinen', label: 'Eero Saarinen' },
  { value: 'florence-knoll', label: 'Florence Knoll' },
  { value: 'marcel-breuer', label: 'Marcel Breuer' },
  { value: 'alvar-aalto', label: 'Alvar Aalto' },
  { value: 'wendell-castle', label: 'Wendell Castle' },
  { value: 'vladimir-kagan', label: 'Vladimir Kagan' },
  { value: 'paul-evans', label: 'Paul Evans' },
  { value: 'philippe-starck', label: 'Philippe Starck' },
  { value: 'ettore-sottsass', label: 'Ettore Sottsass' },
  { value: 'jean-prouve', label: 'Jean Prouvé' },
  { value: 'charlotte-perriand', label: 'Charlotte Perriand' },
  // Extended creators
  { value: 'ludwig-mies-van-der-rohe', label: 'Ludwig Mies van der Rohe' },
  { value: 'herman-miller', label: 'Herman Miller' },
  { value: 'knoll', label: 'Knoll' },
  { value: 'vitra', label: 'Vitra' },
  { value: 'thonet', label: 'Thonet' },
  { value: 'cassina', label: 'Cassina' },
  { value: 'fritz-hansen', label: 'Fritz Hansen' },
  { value: 'carlo-bugatti', label: 'Carlo Bugatti' },
  { value: 'gio-ponti', label: 'Gio Ponti' },
  { value: 'eileen-gray', label: 'Eileen Gray' },
]

export const roleOptions: LabeledOption[] = [
  { value: 'artist', label: 'Artist' },
  { value: 'author', label: 'Author' },
  { value: 'designer', label: 'Designer' },
  { value: 'maker', label: 'Maker' },
]

export const styleOptions: LabeledOption[] = [
  { value: 'art-deco', label: 'Art Deco' },
  { value: 'art-nouveau', label: 'Art Nouveau' },
  { value: 'baroque', label: 'Baroque' },
  { value: 'bauhaus', label: 'Bauhaus' },
  { value: 'chippendale', label: 'Chippendale' },
  { value: 'colonial', label: 'Colonial' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'danish-modern', label: 'Danish Modern' },
  { value: 'french-provincial', label: 'French Provincial' },
  { value: 'georgian', label: 'Georgian' },
  { value: 'gothic', label: 'Gothic' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'louis-xiv', label: 'Louis XIV' },
  { value: 'mid-century-modern', label: 'Mid-Century Modern' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'neoclassical', label: 'Neoclassical' },
  { value: 'queen-anne', label: 'Queen Anne' },
  { value: 'regency', label: 'Regency' },
  { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'victorian', label: 'Victorian' },
  // Extended styles
  { value: 'arts-and-crafts', label: 'Arts and Crafts' },
  { value: 'biedermeier', label: 'Biedermeier' },
  { value: 'brutalist', label: 'Brutalist' },
  { value: 'chinoiserie', label: 'Chinoiserie' },
  { value: 'empire', label: 'Empire' },
  { value: 'federal', label: 'Federal' },
  { value: 'hollywood-regency', label: 'Hollywood Regency' },
  { value: 'louis-xv', label: 'Louis XV' },
  { value: 'louis-xvi', label: 'Louis XVI' },
  { value: 'modernist', label: 'Modernist' },
  { value: 'postmodern', label: 'Postmodern' },
  { value: 'primitive', label: 'Primitive' },
  { value: 'rococo', label: 'Rococo' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'shaker', label: 'Shaker' },
]

export const countryOptions: LabeledOption[] = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BR', label: 'Brazil' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CA', label: 'Canada' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CO', label: 'Colombia' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'EG', label: 'Egypt' },
  { value: 'EE', label: 'Estonia' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GR', label: 'Greece' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JP', label: 'Japan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KR', label: 'South Korea' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MX', label: 'Mexico' },
  { value: 'MA', label: 'Morocco' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NO', label: 'Norway' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russia' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'ES', label: 'Spain' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TR', label: 'Turkey' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'VN', label: 'Vietnam' },
]

export const conditions: Condition[] = [
  {
    name: 'Distressed',
    description: 'Visible signs of previous use that may include scratches, gouges, cracks and fissures and worn corners. May have significant losses, fading or structural instability.',
  },
  {
    name: 'Fair',
    description: 'Shows light scratches and wear from previous use but remains in fair condition. May have some structural issues, including minor instability.',
  },
  {
    name: 'Good',
    description: 'Lightly used, with very light scratches, or minor cosmetic wear, but has no structural issues. Most antique and vintage items fit this condition.',
  },
  {
    name: 'Excellent',
    description: 'Like new or has never been used. Absolutely no scratches or wear. Has no structural issues and is in perfect condition.',
  },
  {
    name: 'New',
    description: 'Brand-new, unused item, not previously owned. Shows absolutely no signs of wear.',
  },
]

export const periods: string[] = [
  '2020-', '2010-2019', '2000-2009',
  '1990-1999', '1980-1989', '1970-1979', '1960-1969', '1950-1959', '1940-1949', '1930-1939', '1920-1929', '1910-1919', '1900-1909',
  '1890-1899', '1880-1889', '1870-1879', '1860-1869', '1850-1859', '1840-1849', '1830-1839', '1820-1829', '1810-1819', '1800-1809',
  '1790-1799', '1780-1789', '1770-1779', '1760-1769', '1750-1759', '1740-1749', '1730-1739', '1720-1729', '1710-1719', '1700-1709',
  '1690-1699', '1680-1689', '1670-1679', '1660-1669', '1650-1659', '1640-1649', '1630-1639', '1620-1629', '1610-1619', '1600-1609',
  '21st Century',
  '20th Century',
  '19th Century',
  '18th Century',
  '17th Century',
  '16th Century',
]

// Helper to get all category strings for matching
export function getAllCategoryStrings(): string[] {
  const strings: string[] = []
  for (const cat of categories) {
    strings.push(`${cat.l1} > ${cat.l2}`)
    if (cat.l3) {
      for (const sub of cat.l3) {
        strings.push(`${cat.l1} > ${cat.l2} > ${sub}`)
      }
    }
  }
  return strings
}

// Helper to get all L2 categories (primary categories)
export function getL2Categories(): string[] {
  return categories.map(c => c.l2)
}

// Helper to get all L1 categories (top-level)
export function getL1Categories(): string[] {
  return [...new Set(categories.map(c => c.l1))]
}
