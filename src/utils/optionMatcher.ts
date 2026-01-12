// Utility functions for matching AI-extracted values to valid form options

import type { LabeledOption, Category } from '../types/aiSuggestions'
import {
  categories,
  materialOptions,
  styleOptions,
  countryOptions,
  creatorOptions,
  conditions,
  periods,
  wearOptions,
} from '../data/formOptions'

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching when exact matches aren't found
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

/**
 * Calculate similarity score between two strings (0-1)
 */
function similarity(a: string, b: string): number {
  const aLower = a.toLowerCase()
  const bLower = b.toLowerCase()

  // Exact match
  if (aLower === bLower) return 1

  // One contains the other
  if (aLower.includes(bLower) || bLower.includes(aLower)) {
    return 0.9
  }

  // Levenshtein-based similarity
  const maxLen = Math.max(a.length, b.length)
  if (maxLen === 0) return 1
  const distance = levenshteinDistance(aLower, bLower)
  return 1 - distance / maxLen
}

/**
 * Find the best matching option from a list of strings
 */
export function findBestStringMatch(
  input: string,
  options: string[],
  threshold: number = 0.6
): string | null {
  if (!input || options.length === 0) return null

  let bestMatch: string | null = null
  let bestScore = 0

  for (const option of options) {
    const score = similarity(input, option)
    if (score > bestScore && score >= threshold) {
      bestScore = score
      bestMatch = option
    }
  }

  return bestMatch
}

/**
 * Find the best matching option from a list of labeled options
 * Returns the value (not the label)
 */
export function findBestLabeledMatch(
  input: string,
  options: LabeledOption[],
  threshold: number = 0.6
): string | null {
  if (!input || options.length === 0) return null

  let bestMatch: LabeledOption | null = null
  let bestScore = 0

  for (const option of options) {
    // Check both label and value for matches
    const labelScore = similarity(input, option.label)
    const valueScore = similarity(input, option.value)
    const score = Math.max(labelScore, valueScore)

    if (score > bestScore && score >= threshold) {
      bestScore = score
      bestMatch = option
    }
  }

  return bestMatch?.value ?? null
}

/**
 * Find matching materials from input text
 * Can handle comma-separated lists or multiple mentions
 */
export function findMatchingMaterials(input: string): string[] {
  const matched: string[] = []

  for (const material of materialOptions) {
    const materialLower = material.toLowerCase()
    // Check for exact word boundaries
    const regex = new RegExp(`\\b${materialLower}\\b`, 'i')
    if (regex.test(input)) {
      matched.push(material)
    }
  }

  return matched
}

/**
 * Find matching category from input text
 * Returns the best matching category object
 */
export function findMatchingCategory(input: string): Category | null {
  const inputLower = input.toLowerCase()
  let bestMatch: Category | null = null
  let bestScore = 0

  // Common category keywords mapping
  const categoryKeywords: Record<string, { l1: string; l2: string }> = {
    'coffee table': { l1: 'Furniture', l2: 'Coffee Tables' },
    'dining table': { l1: 'Furniture', l2: 'Dining Tables' },
    'side table': { l1: 'Tables', l2: 'Side Tables' },
    'end table': { l1: 'Furniture', l2: 'Side Tables' },
    'console': { l1: 'Furniture', l2: 'Console Tables' },
    'desk': { l1: 'Furniture', l2: 'Desks' },
    'cabinet': { l1: 'Furniture', l2: 'Cabinets' },
    'bookcase': { l1: 'Furniture', l2: 'Bookcases' },
    'bookshelf': { l1: 'Furniture', l2: 'Bookcases' },
    'dresser': { l1: 'Furniture', l2: 'Dressers' },
    'chest of drawers': { l1: 'Furniture', l2: 'Dressers' },
    'bed': { l1: 'Furniture', l2: 'Beds' },
    'headboard': { l1: 'Furniture', l2: 'Beds' },
    'sofa': { l1: 'Seating', l2: 'Sofas' },
    'couch': { l1: 'Seating', l2: 'Sofas' },
    'sectional': { l1: 'Seating', l2: 'Sofas' },
    'loveseat': { l1: 'Seating', l2: 'Sofas' },
    'armchair': { l1: 'Seating', l2: 'Armchairs' },
    'lounge chair': { l1: 'Seating', l2: 'Armchairs' },
    'club chair': { l1: 'Seating', l2: 'Armchairs' },
    'dining chair': { l1: 'Seating', l2: 'Dining Chairs' },
    'side chair': { l1: 'Seating', l2: 'Dining Chairs' },
    'stool': { l1: 'Seating', l2: 'Stools' },
    'bar stool': { l1: 'Seating', l2: 'Stools' },
    'bench': { l1: 'Seating', l2: 'Benches' },
    'ottoman': { l1: 'Seating', l2: 'Stools' },
    'chandelier': { l1: 'Lighting', l2: 'Chandeliers and Pendants' },
    'pendant': { l1: 'Lighting', l2: 'Chandeliers and Pendants' },
    'floor lamp': { l1: 'Lighting', l2: 'Floor Lamps' },
    'table lamp': { l1: 'Lighting', l2: 'Table Lamps' },
    'desk lamp': { l1: 'Lighting', l2: 'Table Lamps' },
    'sconce': { l1: 'Lighting', l2: 'Wall Lights and Sconces' },
    'wall light': { l1: 'Lighting', l2: 'Wall Lights and Sconces' },
    'lantern': { l1: 'Lighting', l2: 'Lanterns' },
    'flush mount': { l1: 'Lighting', l2: 'Flush Mount' },
    'ceiling light': { l1: 'Lighting', l2: 'Flush Mount' },
    'vase': { l1: 'Decorative Objects', l2: 'Vases and Vessels' },
    'urn': { l1: 'Decorative Objects', l2: 'Vases and Vessels' },
    'sculpture': { l1: 'Decorative Objects', l2: 'Sculptures' },
    'bust': { l1: 'Decorative Objects', l2: 'Sculptures' },
    'clock': { l1: 'Decorative Objects', l2: 'Clocks' },
    'mirror': { l1: 'Mirrors', l2: 'Wall Mirrors' },
    'wall mirror': { l1: 'Mirrors', l2: 'Wall Mirrors' },
    'floor mirror': { l1: 'Mirrors', l2: 'Floor Mirrors' },
    'cheval mirror': { l1: 'Mirrors', l2: 'Floor Mirrors' },
    'overmantel': { l1: 'Mirrors', l2: 'Overmantel Mirrors' },
    'convex mirror': { l1: 'Mirrors', l2: 'Convex Mirrors' },
    'trumeau': { l1: 'Mirrors', l2: 'Trumeau Mirrors' },
    'pier mirror': { l1: 'Mirrors', l2: 'Pier Mirrors' },
    'sunburst mirror': { l1: 'Mirrors', l2: 'Sunburst Mirrors' },
    'frame': { l1: 'Decorative Objects', l2: 'Picture Frames' },
    'candle holder': { l1: 'Decorative Objects', l2: 'Candle Holders' },
    'candelabra': { l1: 'Decorative Objects', l2: 'Candle Holders' },
    'bowl': { l1: 'Decorative Objects', l2: 'Bowls and Baskets' },
    'basket': { l1: 'Decorative Objects', l2: 'Bowls and Baskets' },
    'tray': { l1: 'Decorative Objects', l2: 'Bowls and Baskets' },
    'box': { l1: 'Decorative Objects', l2: 'Boxes' },
    'vanity': { l1: 'Tables', l2: 'Vanities' },
    'dressing table': { l1: 'Tables', l2: 'Vanities' },
    // Asian Art and Furniture
    'tansu': { l1: 'Asian Art and Furniture', l2: 'Japanese Furniture' },
    'shoji': { l1: 'Asian Art and Furniture', l2: 'Screens and Room Dividers' },
    'coromandel': { l1: 'Asian Art and Furniture', l2: 'Screens and Room Dividers' },
    'ming': { l1: 'Asian Art and Furniture', l2: 'Chinese Furniture' },
    'qing': { l1: 'Asian Art and Furniture', l2: 'Chinese Furniture' },
    'chinese furniture': { l1: 'Asian Art and Furniture', l2: 'Chinese Furniture' },
    'japanese furniture': { l1: 'Asian Art and Furniture', l2: 'Japanese Furniture' },
    'korean furniture': { l1: 'Asian Art and Furniture', l2: 'Korean Furniture' },
    'asian ceramic': { l1: 'Asian Art and Furniture', l2: 'Asian Ceramics' },
    'celadon': { l1: 'Asian Art and Furniture', l2: 'Asian Ceramics' },
    'imari': { l1: 'Asian Art and Furniture', l2: 'Asian Ceramics' },
    // Building and Garden Elements
    'mantel': { l1: 'Building and Garden Elements', l2: 'Fireplace Elements' },
    'fireplace': { l1: 'Building and Garden Elements', l2: 'Fireplace Elements' },
    'andiron': { l1: 'Building and Garden Elements', l2: 'Fireplace Elements' },
    'garden statue': { l1: 'Building and Garden Elements', l2: 'Garden Ornaments' },
    'sundial': { l1: 'Building and Garden Elements', l2: 'Garden Ornaments' },
    'fountain': { l1: 'Building and Garden Elements', l2: 'Fountains and Planters' },
    'planter': { l1: 'Building and Garden Elements', l2: 'Fountains and Planters' },
    'architectural': { l1: 'Building and Garden Elements', l2: 'Architectural Fragments' },
    'stained glass': { l1: 'Building and Garden Elements', l2: 'Windows and Shutters' },
    'iron gate': { l1: 'Building and Garden Elements', l2: 'Doors and Gates' },
    // Case Pieces and Storage Cabinets
    'armoire': { l1: 'Case Pieces and Storage Cabinets', l2: 'Armoires and Wardrobes' },
    'wardrobe': { l1: 'Case Pieces and Storage Cabinets', l2: 'Armoires and Wardrobes' },
    'buffet': { l1: 'Case Pieces and Storage Cabinets', l2: 'Buffets and Sideboards' },
    'sideboard': { l1: 'Case Pieces and Storage Cabinets', l2: 'Buffets and Sideboards' },
    'credenza': { l1: 'Case Pieces and Storage Cabinets', l2: 'Buffets and Sideboards' },
    'chest': { l1: 'Case Pieces and Storage Cabinets', l2: 'Chests and Trunks' },
    'trunk': { l1: 'Case Pieces and Storage Cabinets', l2: 'Chests and Trunks' },
    'commode': { l1: 'Case Pieces and Storage Cabinets', l2: 'Commodes' },
    'secretary': { l1: 'Case Pieces and Storage Cabinets', l2: 'Secretaries and Desks' },
    'vitrine': { l1: 'Case Pieces and Storage Cabinets', l2: 'Vitrines and Display Cabinets' },
    'curio': { l1: 'Case Pieces and Storage Cabinets', l2: 'Vitrines and Display Cabinets' },
    'china cabinet': { l1: 'Case Pieces and Storage Cabinets', l2: 'Vitrines and Display Cabinets' },
    'highboy': { l1: 'Case Pieces and Storage Cabinets', l2: 'Highboys and Lowboys' },
    'lowboy': { l1: 'Case Pieces and Storage Cabinets', l2: 'Highboys and Lowboys' },
    // Folk Art
    'weathervane': { l1: 'Folk Art', l2: 'Weathervanes and Whirligigs' },
    'whirligig': { l1: 'Folk Art', l2: 'Weathervanes and Whirligigs' },
    'decoy': { l1: 'Folk Art', l2: 'Decoys' },
    'duck decoy': { l1: 'Folk Art', l2: 'Decoys' },
    'trade sign': { l1: 'Folk Art', l2: 'Trade Signs and Figures' },
    'cigar store': { l1: 'Folk Art', l2: 'Trade Signs and Figures' },
    'quilt': { l1: 'Folk Art', l2: 'Textiles and Quilts' },
    'hooked rug': { l1: 'Folk Art', l2: 'Textiles and Quilts' },
    'sampler': { l1: 'Folk Art', l2: 'Textiles and Quilts' },
    'redware': { l1: 'Folk Art', l2: 'Pottery and Ceramics' },
    'stoneware': { l1: 'Folk Art', l2: 'Pottery and Ceramics' },
    // More Furniture and Collectibles
    'bar cart': { l1: 'More Furniture and Collectibles', l2: 'Bar Carts and Bars' },
    'dry bar': { l1: 'More Furniture and Collectibles', l2: 'Bar Carts and Bars' },
    'plant stand': { l1: 'More Furniture and Collectibles', l2: 'Pedestals and Plant Stands' },
    'pedestal': { l1: 'More Furniture and Collectibles', l2: 'Pedestals and Plant Stands' },
    'hall tree': { l1: 'More Furniture and Collectibles', l2: 'Coat Racks and Hall Trees' },
    'coat rack': { l1: 'More Furniture and Collectibles', l2: 'Coat Racks and Hall Trees' },
    'etagere': { l1: 'More Furniture and Collectibles', l2: 'Etageres and Shelving' },
    'room divider': { l1: 'More Furniture and Collectibles', l2: 'Room Dividers' },
    'folding screen': { l1: 'More Furniture and Collectibles', l2: 'Room Dividers' },
    // Rugs and Carpets
    'persian rug': { l1: 'Rugs and Carpets', l2: 'Persian Rugs' },
    'oriental rug': { l1: 'Rugs and Carpets', l2: 'Oriental Rugs' },
    'turkish rug': { l1: 'Rugs and Carpets', l2: 'Turkish Rugs' },
    'oushak': { l1: 'Rugs and Carpets', l2: 'Turkish Rugs' },
    'moroccan rug': { l1: 'Rugs and Carpets', l2: 'Moroccan Rugs' },
    'kilim': { l1: 'Rugs and Carpets', l2: 'Kilims and Flatweaves' },
    'dhurrie': { l1: 'Rugs and Carpets', l2: 'Kilims and Flatweaves' },
    'runner': { l1: 'Rugs and Carpets', l2: 'Runners' },
    'tapestry': { l1: 'Rugs and Carpets', l2: 'Tapestries' },
    'aubusson': { l1: 'Rugs and Carpets', l2: 'Tapestries' },
    'rug': { l1: 'Rugs and Carpets', l2: 'Contemporary Rugs' },
    'carpet': { l1: 'Rugs and Carpets', l2: 'Contemporary Rugs' },
    // Serveware, Ceramics, Silver and Glass
    'flatware': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Flatware and Cutlery' },
    'silverware': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Flatware and Cutlery' },
    'hollowware': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Hollowware' },
    'tea service': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Tea and Coffee Sets' },
    'tea set': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Tea and Coffee Sets' },
    'coffee set': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Tea and Coffee Sets' },
    'porcelain': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Porcelain and China' },
    'china': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Porcelain and China' },
    'dinnerware': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Porcelain and China' },
    'murano': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Art Glass' },
    'art glass': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Art Glass' },
    'decanter': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Barware' },
    'barware': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Barware' },
    'crystal': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Crystal' },
    'stemware': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Crystal' },
    'tureen': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Serving Pieces' },
    'platter': { l1: 'Serveware, Ceramics, Silver and Glass', l2: 'Serving Pieces' },
  }

  // Check keyword matches first (highest priority)
  for (const [keyword, cat] of Object.entries(categoryKeywords)) {
    if (inputLower.includes(keyword)) {
      // Find the full category object
      const fullCat = categories.find(c => c.l1 === cat.l1 && c.l2 === cat.l2)
      if (fullCat) {
        return fullCat
      }
      // Return a basic category if not in our list
      return { l1: cat.l1, l2: cat.l2 }
    }
  }

  // Fall back to fuzzy matching on L2 categories
  for (const cat of categories) {
    const l2Score = similarity(input, cat.l2)
    if (l2Score > bestScore && l2Score >= 0.5) {
      bestScore = l2Score
      bestMatch = cat
    }

    // Also check L3 subcategories
    if (cat.l3) {
      for (const sub of cat.l3) {
        const subScore = similarity(input, sub)
        if (subScore > bestScore && subScore >= 0.5) {
          bestScore = subScore
          bestMatch = cat
        }
      }
    }
  }

  return bestMatch
}

/**
 * Find matching style from input
 */
export function findMatchingStyle(input: string): string | null {
  // Common style aliases
  const styleAliases: Record<string, string> = {
    'mid century': 'mid-century-modern',
    'mid-century': 'mid-century-modern',
    'mcm': 'mid-century-modern',
    'danish': 'danish-modern',
    'scandi': 'scandinavian',
    'deco': 'art-deco',
    'nouveau': 'art-nouveau',
  }

  const inputLower = input.toLowerCase()

  // Check aliases first
  for (const [alias, value] of Object.entries(styleAliases)) {
    if (inputLower.includes(alias)) {
      return value
    }
  }

  return findBestLabeledMatch(input, styleOptions, 0.5)
}

/**
 * Find matching country/origin from input
 */
export function findMatchingOrigin(input: string): string | null {
  // Common origin aliases
  const originAliases: Record<string, string> = {
    'usa': 'US',
    'u.s.': 'US',
    'u.s.a.': 'US',
    'america': 'US',
    'american': 'US',
    'uk': 'GB',
    'britain': 'GB',
    'british': 'GB',
    'england': 'GB',
    'english': 'GB',
  }

  const inputLower = input.toLowerCase()

  // Check aliases first
  for (const [alias, value] of Object.entries(originAliases)) {
    if (inputLower.includes(alias)) {
      return value
    }
  }

  return findBestLabeledMatch(input, countryOptions, 0.6)
}

/**
 * Find matching condition from input
 */
export function findMatchingCondition(input: string): string | null {
  const conditionNames = conditions.map(c => c.name)
  return findBestStringMatch(input, conditionNames, 0.7)
}

/**
 * Find matching creator from input
 */
export function findMatchingCreator(input: string): string | null {
  return findBestLabeledMatch(input, creatorOptions, 0.6)
}

/**
 * Find matching period from a year or date string
 */
export function findMatchingPeriod(input: string): string | null {
  // Try to extract a year
  const yearMatch = input.match(/\b(1[5-9]\d{2}|20[0-2]\d)\b/)
  if (yearMatch) {
    const year = parseInt(yearMatch[1])

    if (year >= 2020) return '2020-'

    // Calculate decade
    const decade = Math.floor(year / 10) * 10
    const periodString = `${decade}-${decade + 9}`

    if (periods.includes(periodString)) {
      return periodString
    }
  }

  // Check for century mentions
  if (input.toLowerCase().includes('21st century')) return '21st Century'
  if (input.toLowerCase().includes('20th century')) return '20th Century'
  if (input.toLowerCase().includes('19th century')) return '19th Century'
  if (input.toLowerCase().includes('18th century')) return '18th Century'

  // Direct period match
  return findBestStringMatch(input, periods, 0.8)
}

/**
 * Find matching weight category from input
 */
export function findMatchingWeight(input: string): string | null {
  const inputLower = input.toLowerCase()

  // Try to extract weight in lbs or kg
  const lbsMatch = input.match(/(\d+)\s*(lbs?|pounds?)/i)
  const kgMatch = input.match(/(\d+)\s*(kg|kilos?|kilograms?)/i)

  let weightLbs: number | null = null

  if (lbsMatch) {
    weightLbs = parseInt(lbsMatch[1])
  } else if (kgMatch) {
    // Convert kg to lbs
    weightLbs = parseInt(kgMatch[1]) * 2.2
  }

  if (weightLbs !== null) {
    if (weightLbs < 40) return 'less-40'
    if (weightLbs <= 70) return '40-70'
    if (weightLbs <= 200) return '70-200'
    return 'more-200'
  }

  // Check for descriptive weight
  if (inputLower.includes('heavy') || inputLower.includes('massive')) {
    return 'more-200'
  }
  if (inputLower.includes('light') || inputLower.includes('lightweight')) {
    return 'less-40'
  }

  return null
}

/**
 * Find matching wear from input
 */
export function findMatchingWear(input: string): string | null {
  return findBestLabeledMatch(input, wearOptions, 0.5)
}

/**
 * Find matching restoration work from input
 */
export function findMatchingRestoration(input: string): string[] {
  const inputLower = input.toLowerCase()
  const matched: string[] = []

  // Keywords for each restoration type
  const restorationKeywords: Record<string, string[]> = {
    'Repairs': ['repair', 'fixed', 'mended'],
    'Replacements': ['replace', 'new parts', 'substitut'],
    'Refinishing': ['refinish', 'restain', 'repaint', 'relacquer'],
    'Reupholstery': ['reupholster', 'new fabric', 'new leather', 'recovered'],
    'Reweaving': ['rewove', 'rewoven', 'reweav'],
    'Rewiring': ['rewir', 'new wiring', 'electrical'],
    'Additions or Alterations to Original': ['alter', 'modif', 'addition', 'custom'],
  }

  for (const [restoration, keywords] of Object.entries(restorationKeywords)) {
    for (const keyword of keywords) {
      if (inputLower.includes(keyword)) {
        matched.push(restoration)
        break
      }
    }
  }

  return matched
}

/**
 * Extract dimensions from text
 * Returns { width, depth, height } in the detected unit
 */
export function extractDimensions(input: string): {
  width?: number
  depth?: number
  height?: number
  unit: 'in' | 'cm'
} | null {
  // Common dimension patterns
  // Format: W x D x H or H x W x D
  const patterns = [
    // W x D x H with units
    /(\d+(?:\.\d+)?)\s*["']?\s*[xX×]\s*(\d+(?:\.\d+)?)\s*["']?\s*[xX×]\s*(\d+(?:\.\d+)?)\s*(in|inches?|"|cm|centimeters?)?/i,
    // Individual dimensions
    /(?:width|w)[:\s]*(\d+(?:\.\d+)?)\s*(in|inches?|"|cm)?/i,
    /(?:depth|d)[:\s]*(\d+(?:\.\d+)?)\s*(in|inches?|"|cm)?/i,
    /(?:height|h)[:\s]*(\d+(?:\.\d+)?)\s*(in|inches?|"|cm)?/i,
  ]

  let width: number | undefined
  let depth: number | undefined
  let height: number | undefined
  let unit: 'in' | 'cm' = 'in' // Default to inches

  // Try W x D x H pattern first
  const dimMatch = input.match(patterns[0])
  if (dimMatch) {
    width = parseFloat(dimMatch[1])
    depth = parseFloat(dimMatch[2])
    height = parseFloat(dimMatch[3])
    if (dimMatch[4] && dimMatch[4].toLowerCase().startsWith('cm')) {
      unit = 'cm'
    }
    return { width, depth, height, unit }
  }

  // Try individual dimension patterns
  const widthMatch = input.match(/(?:width|w)[:\s]*(\d+(?:\.\d+)?)\s*(in|inches?|"|cm)?/i)
  const depthMatch = input.match(/(?:depth|d)[:\s]*(\d+(?:\.\d+)?)\s*(in|inches?|"|cm)?/i)
  const heightMatch = input.match(/(?:height|h)[:\s]*(\d+(?:\.\d+)?)\s*(in|inches?|"|cm)?/i)

  if (widthMatch) width = parseFloat(widthMatch[1])
  if (depthMatch) depth = parseFloat(depthMatch[1])
  if (heightMatch) height = parseFloat(heightMatch[1])

  // Detect unit from any match
  const unitMatches = [widthMatch?.[2], depthMatch?.[2], heightMatch?.[2]].filter(Boolean)
  if (unitMatches.some(u => u?.toLowerCase().startsWith('cm'))) {
    unit = 'cm'
  }

  if (width || depth || height) {
    return { width, depth, height, unit }
  }

  return null
}

/**
 * Extract year/date of manufacture from text
 */
export function extractDateOfManufacture(input: string): string | null {
  // Look for "circa" patterns
  const circaMatch = input.match(/circa\s*(\d{4})/i)
  if (circaMatch) {
    return `circa ${circaMatch[1]}`
  }

  // Look for year ranges
  const rangeMatch = input.match(/(\d{4})\s*[-–]\s*(\d{4})/)
  if (rangeMatch) {
    return `${rangeMatch[1]}-${rangeMatch[2]}`
  }

  // Look for decade patterns like "1960s"
  const decadeMatch = input.match(/(\d{4})s/)
  if (decadeMatch) {
    return `${decadeMatch[1]}s`
  }

  // Look for single year
  const yearMatch = input.match(/\b(1[5-9]\d{2}|20[0-2]\d)\b/)
  if (yearMatch) {
    return yearMatch[1]
  }

  return null
}
