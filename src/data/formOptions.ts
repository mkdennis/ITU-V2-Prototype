// Centralized form options data - extracted for use in AI matching

import type { Category, LabeledOption, Condition } from '../types/aiSuggestions'

export const categories: Category[] = [
  { l1: 'Art', l2: 'Drawings and Watercolor Paintings', l3: ['Abstract Drawings and Watercolors', 'Animal Drawings and Watercolors', 'Figurative Drawings and Watercolors', 'Interior Drawings and Watercolors', 'Landscape Drawings and Watercolors', 'Nude Drawings and Watercolors', 'Portrait Drawings and Watercolors', 'Still-life Drawings and Watercolors'] },
  { l1: 'Art', l2: 'Mixed Media', l3: [] },
  { l1: 'Art', l2: 'More Art', l3: [] },
  { l1: 'Art', l2: 'Paintings', l3: ['Abstract Paintings', 'Animal Paintings', 'Figurative Paintings', 'Interior Paintings', 'Landscape Paintings', 'Nude Paintings', 'Portrait Paintings', 'Still-life Paintings'] },
  { l1: 'Art', l2: 'Photography', l3: ['Abstract Photography', 'Black and White Photography', 'Color Photography', 'Figurative Photography', 'Landscape Photography', 'Nude Photography', 'Portrait Photography', 'Still-life Photography'] },
  { l1: 'Art', l2: 'Prints and Multiples', l3: ['Abstract Prints', 'Animal Prints', 'Figurative Prints', 'Interior Prints', 'Landscape Prints', 'More Prints', 'Nude Prints', 'Portrait Prints', 'Still-life Prints'] },
  { l1: 'Art', l2: 'Sculptures', l3: ['Abstract Sculptures', 'Figurative Sculptures', 'Nude Sculptures', 'Still-life Sculptures'] },
  { l1: 'Fashion', l2: 'Accessories', l3: ['Babushka', 'Bandannas', 'Bandeaus', 'Beanies', 'Belts', 'Berets', 'Bonnets', 'Braces', 'Canes and Walking Sticks', 'Caps', 'Cloche Hats', 'Contour', 'Corsages', 'Cravats', 'Cummerbunds', 'Fichu', 'Gauntlets', 'Gloves', 'Handheld Fans', 'Handkerchiefs', 'Hats', 'Hoods', 'Muffs', 'Neckcloths', 'Neckties', 'Sashes', 'Scarves', 'Shoes', 'Sunglasses', 'Suspenders', 'Ties', 'Visors', 'Waist Belts'] },
  { l1: 'Fashion', l2: 'Books', l3: ['Antique Books', 'Avant Garde Books', 'Body', 'Classic', 'Clothes', 'Collection', 'Costumes', 'Couture', 'Dandy', 'Design', 'Fashion', 'Fashion Books', 'Look', 'Modernist', 'Retro', 'Softcover and Paperback', 'Style', 'Vintage', 'Wearable Art'] },
  { l1: 'Fashion', l2: 'Clothing', l3: ['Blouses', 'Coats and Outerwear', 'Day Dresses', 'Evening Dresses and Gowns', 'Jackets', 'Lingerie', 'Pants', 'Shirts', 'Shoes', 'Shorts', 'Skirts', 'Sportswear', 'Suits, Outfits and Ensembles', 'Sweaters', 'Swimwear'] },
  { l1: 'Fashion', l2: 'Ephemera', l3: ['Ashtrays', 'Barware', 'Baskets', 'Boxes', 'Centerpieces', 'Ceramics', 'Children', 'Clocks', 'Coatstands', 'Curiosities', 'Decorative Mounted Boxes', 'Decorative Objects', 'Dry Bar', 'For The Desk', 'For The Table', 'Games', 'Globes', 'Jewelry Boxes', 'Knife Boxes', 'Miscellaneous', 'Other', 'Pillows and Throws', 'Rugs', 'Sculptures', 'Teacaddies and Canisters', 'Textiles and Quilts', 'Toys', 'Trunks and Luggage', 'Umbrella Stands', 'Vases', 'Wine Coolers', 'Wine Service'] },
  { l1: 'Fashion', l2: 'Handbags and Purses', l3: ['Backpacks', 'Briefcases and Attachés', 'Clutches', 'Crossbody Bags and Messenger Bags', 'Evening Bags and Minaudières', 'Luggage and Travel Bags', 'Novelty Bags', 'Shoulder Bags', 'Top Handle Bags', 'Tote Bags', 'Wallets and Small Accessories'] },
  { l1: 'Furniture', l2: 'Asian Art and Furniture', l3: ['Antiquities', 'Ceramics', 'Furniture', 'Lacquer', 'Metalwork', 'More Asian Art, Objects and Furniture', 'Paintings and Screens', 'Prints', 'Scholar\'s Objects', 'Sculptures and Carvings', 'Textiles'] },
  { l1: 'Furniture', l2: 'Building and Garden Elements', l3: ['Andirons', 'Architectural Elements', 'Balustrades and Fixtures', 'Bathroom Fixtures', 'Doors and Gates', 'Fireplace Tools and Chimney Pots', 'Fireplaces and Mantels', 'Flooring', 'Fountains', 'Garden Ornaments', 'Panelling', 'Patio and Garden Furniture', 'Pedestals and Columns', 'Planters and Jardinieres', 'Stairs', 'Statues', 'Stone Sinks', 'Sundials', 'Urns', 'Windows'] },
  { l1: 'Furniture', l2: 'Case Pieces and Storage Cabinets', l3: ['Apothecary Cabinets', 'Blanket Chests', 'Bookcases', 'Buffets', 'Cabinets', 'Commodes and Chests of Drawers', 'Corner Cupboards', 'Credenzas', 'Cupboards', 'Desks', 'Dressers', 'Dry Bars', 'Linen Presses', 'Secretaires', 'Shelves', 'Sideboards', 'Vitrines', 'Wardrobes and Armoires'] },
  { l1: 'Furniture', l2: 'Decorative Objects', l3: ['Bowls and Baskets', 'Boxes', 'Candle Holders', 'Clocks', 'Desk Accessories', 'Picture Frames', 'Sculptures', 'Vases and Vessels'] },
  { l1: 'Furniture', l2: 'Folk Art', l3: ['Antiquities', 'Carnival Art', 'Ceramics', 'Decoys', 'Game Boards', 'Masks', 'Mirrors', 'More Folk Art', 'Native American Objects', 'Nautical Objects', 'Outsider and Self Taught Art', 'Painted Furniture', 'Paintings', 'Political and Patriotic Memorabilia', 'Posters', 'Primitives', 'Quilts', 'Rugs', 'Sculptures and Carvings', 'Signs', 'Toys', 'Tribal Art', 'Weathervanes'] },
  { l1: 'Furniture', l2: 'Lighting', l3: ['Chandeliers and Pendants', 'Floor Lamps', 'Flush Mount', 'Lanterns', 'More Lighting', 'Table Lamps', 'Wall Lights and Sconces'] },
  { l1: 'Furniture', l2: 'Mirrors', l3: ['Convex Mirrors', 'Floor Mirrors and Full-Length Mirrors', 'Girandoles', 'Mantel Mirrors and Fireplace Mirrors', 'More Mirrors', 'Pier Mirrors and Console Mirrors', 'Sunburst Mirrors', 'Table Mirrors', 'Trumeau Mirrors', 'Wall Mirrors'] },
  { l1: 'Furniture', l2: 'More Furniture and Collectibles', l3: ['Bedroom Furniture', 'Children\'s Furniture', 'Collectibles and Curiosities', 'Home Accents', 'Racks and Stands', 'Textiles'] },
  { l1: 'Furniture', l2: 'Rugs and Carpets', l3: ['Caucasian Rugs', 'Central Asian Rugs', 'Chinese and East Asian Rugs', 'Indian Rugs', 'More Carpets', 'Moroccan and North African Rugs', 'North and South American Rugs', 'Persian Rugs', 'Russian and Scandinavian Rugs', 'Turkish Rugs', 'Western European Rugs'] },
  { l1: 'Furniture', l2: 'Seating', l3: ['Armchairs', 'Benches', 'Bergere Chairs', 'Canapes', 'Chairs', 'Chaise Longues', 'Club Chairs', 'Corner Chairs', 'Daybeds', 'Dining Room Chairs', 'Footstools', 'Living Room Sets', 'Lounge Chairs', 'Loveseats', 'Office Chairs and Desk Chairs', 'Ottomans and Poufs', 'Rocking Chairs', 'Sectional Sofas', 'Settees', 'Side Chairs', 'Slipper Chairs', 'Sofas', 'Stools', 'Swivel Chairs', 'Windsor Chairs', 'Wingback Chairs'] },
  { l1: 'Furniture', l2: 'Serveware, Ceramics, Silver and Glass', l3: ['Ashtrays', 'Barware', 'Butcher Blocks', 'Centerpieces', 'Ceramics', 'Crystal Serveware', 'Delft and Faience', 'Dinner Plates', 'Glass', 'Knife Boxes', 'More Dining and Entertaining', 'Pitchers', 'Platters and Serveware', 'Porcelain', 'Pottery', 'Serving Bowls', 'Serving Pieces', 'Sheffield and Silverplate', 'Soup Tureens', 'Sterling Silver', 'Tableware', 'Tea Sets', 'Wine Coolers'] },
  { l1: 'Furniture', l2: 'Tables', l3: ['Candle Stands', 'Card Tables and Tea Tables', 'Carts and Bar Carts', 'Center Tables', 'Coffee and Cocktail Tables', 'Conference Tables', 'Console Tables', 'Demi-lune Tables', 'Desks and Writing Tables', 'Dessert Tables and Tilt-top Tables', 'Dining Room Sets', 'Dining Room Tables', 'Drop-leaf and Pembroke Tables', 'End Tables', 'Farm Tables', 'Game Tables', 'Gueridon', 'Industrial and Work Tables', 'Lowboys', 'Nesting Tables and Stacking Tables', 'Pedestals', 'Serving Tables', 'Side Tables', 'Sofa Tables', 'Tables', 'Tray Tables', 'Vanities'] },
  { l1: 'Furniture', l2: 'Wall Decorations', l3: ['Contemporary Art', 'Decorative Art', 'Drawings', 'Paintings', 'Photography', 'Posters', 'Prints', 'Shadow Boxes', 'Shelves and Wall Cabinets', 'Tapestries', 'Wall Brackets', 'Wall-mounted Sculptures', 'Wallpaper'] },
  { l1: 'Jewelry', l2: 'Bracelets', l3: ['Anklets', 'Bangles', 'Beaded Bracelets', 'Chain Bracelets', 'Charm Bracelets', 'Clamper Bracelets', 'Cuff Bracelets', 'Link Bracelets', 'Modern Bracelets', 'More Bracelets', 'Retro Bracelets', 'Tennis Bracelets'] },
  { l1: 'Jewelry', l2: 'Brooches', l3: ['Brooches'] },
  { l1: 'Jewelry', l2: 'Cufflinks', l3: ['Cufflinks'] },
  { l1: 'Jewelry', l2: 'Earrings', l3: ['Chandelier Earrings', 'Clip-on Earrings', 'Dangle Earrings', 'Drop Earrings', 'Hoop Earrings', 'Lever-Back Earrings', 'More Earrings', 'Stud Earrings'] },
  { l1: 'Jewelry', l2: 'Loose Gemstones', l3: [] },
  { l1: 'Jewelry', l2: 'More Jewelry and Watches', l3: ['More Jewelry'] },
  { l1: 'Jewelry', l2: 'Necklaces', l3: ['Beaded Necklaces', 'Chain Necklaces', 'Choker Necklaces', 'Drop Necklaces', 'Link Necklaces', 'More Necklaces', 'Multi-Strand Necklaces', 'Necklace Enhancers', 'Pendant Necklaces', 'Rope Necklaces'] },
  { l1: 'Jewelry', l2: 'Objets d\'Art and Vertu', l3: ['Boxes and Cases', 'Desk Accessories', 'Enamel Frames and Objects', 'Figurines and Sculptures', 'Frames', 'Models and Miniatures', 'More Objets d\'Art and Vertu', 'Vanity Items'] },
  { l1: 'Jewelry', l2: 'Rings', l3: ['Band Rings', 'Bridal Rings', 'Cluster Rings', 'Cocktail Rings', 'Dome Rings', 'Engagement Rings', 'Fashion Rings', 'More Rings', 'Signet Rings', 'Solitaire Rings', 'Three-Stone Rings', 'Wedding Rings'] },
  { l1: 'Jewelry', l2: 'Silver, Flatware and Silverplate', l3: ['Barware', 'Candleholders and Candelabra', 'Centerpieces and Tazzas', 'Coffee and Tea Sets', 'Dinnerware and Flatware Sets', 'Flatware and Serving Pieces', 'More Silver, Flatware and Silverplate', 'Pitchers and Decanters', 'Platters and Trays', 'Serving Bowls and Tureens', 'Silver Bowls', 'Silver Chargers and Plates', 'Vases'] },
  { l1: 'Jewelry', l2: 'Watches', l3: ['Pocket Watches', 'Wrist Watches'] },
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

// Helper to get all L1 categories (top-level), sorted alphabetically
export function getL1Categories(): string[] {
  return [...new Set(categories.map(c => c.l1))].sort((a, b) => a.localeCompare(b))
}
