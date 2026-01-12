// AI Assist Parser Service
// Uses Claude API to parse listing text and match to form fields

import type { AISuggestions, AIParseResult } from '../types/aiSuggestions'
import {
  findMatchingCategory,
  findMatchingMaterials,
  findMatchingStyle,
  findMatchingOrigin,
  findMatchingCondition,
  findMatchingCreator,
  findMatchingPeriod,
  findMatchingWeight,
  findMatchingWear,
  findMatchingRestoration,
  extractDimensions,
  extractDateOfManufacture,
} from '../utils/optionMatcher'
import {
  categories,
  materialOptions,
  styleOptions,
  countryOptions,
  creatorOptions,
  conditions,
  periods,
  weightOptions,
  restorationOptions,
} from '../data/formOptions'

// API configuration
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

// Get API key from environment variable
function getApiKey(): string | null {
  // Check for Vite environment variable
  return import.meta.env.VITE_ANTHROPIC_API_KEY || null
}

/**
 * Build the system prompt for Claude
 */
function buildSystemPrompt(): string {
  // Create formatted option lists for Claude to reference
  const categoryList = categories.map(c => `${c.l1} > ${c.l2}`).join(', ')
  const materialList = materialOptions.join(', ')
  const styleList = styleOptions.map(s => s.label).join(', ')
  const conditionList = conditions.map(c => c.name).join(', ')
  const countryList = countryOptions.map(c => c.label).join(', ')
  const creatorList = creatorOptions.map(c => c.label).join(', ')
  const periodList = periods.slice(0, 20).join(', ') + '...' // Truncate for brevity
  const weightList = weightOptions.map(w => w.label).join(', ')

  return `You are an expert at analyzing antique and vintage furniture/decorative object listings. Your task is to extract structured data from listing descriptions.

IMPORTANT: Only return values that you can confidently determine from the input. If you're unsure about a field, omit it entirely.

Available options for each field (you MUST match to these exact values when possible):

CATEGORIES: ${categoryList}

MATERIALS: ${materialList}

STYLES: ${styleList}

CONDITIONS: ${conditionList}
Note: Condition cannot be "New" for antique/vintage items.

COUNTRIES/ORIGINS: ${countryList}

KNOWN CREATORS/DESIGNERS: ${creatorList}

PERIODS: ${periodList}

WEIGHT CATEGORIES: ${weightList}

For dimensions, extract width, depth, and height as numbers. Note the unit (inches or cm).

For date of manufacture:
- Use full year when known (e.g., "1965")
- Use "circa YEAR" if uncertain on exact year
- Use decade format like "1960s" if that's what's provided

For title generation:
- 50-70 characters
- Include: furniture type + material
- Also include if available: creator, style, period/year, origin
- Title Case
- Avoid abbreviations and generic adjectives

Return your response as valid JSON only, with no additional commentary.`
}

/**
 * Build the user prompt with the listing text
 */
function buildUserPrompt(listingText: string): string {
  return `Analyze this listing and extract structured data. Return a JSON object with these fields (omit any you can't determine):

{
  "category": { "l1": "top-level category", "l2": "subcategory" },
  "title": "generated title 50-70 chars",
  "dateOfManufacture": "year or circa year",
  "period": "decade range like 1960-1969",
  "materials": ["Material1", "Material2"],
  "condition": "condition name",
  "wear": "wear description if applicable",
  "restoration": ["restoration work done"],
  "dimensions": { "width": number, "depth": number, "height": number },
  "dimensionUnit": "in" or "cm",
  "weight": "weight category",
  "creator": "creator/designer name",
  "style": "style name",
  "placeOfOrigin": "country name",
  "description": "2-3 paragraph description with condition, style, historical context"
}

Listing text:
"""
${listingText}
"""`
}

/**
 * Parse the AI response and validate/match to form options
 */
function parseAndValidateResponse(
  rawResponse: string,
  originalText: string
): AISuggestions {
  const suggestions: AISuggestions = {}

  try {
    // Extract JSON from response (handle potential markdown code blocks)
    let jsonStr = rawResponse
    const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (jsonMatch) {
      jsonStr = jsonMatch[1]
    }

    const parsed = JSON.parse(jsonStr.trim())

    // Validate and match each field

    // Category - prioritize AI response, validate against our options
    if (parsed.category?.l1 && parsed.category?.l2) {
      const matchedCat = findMatchingCategory(`${parsed.category.l1} ${parsed.category.l2}`)
      if (matchedCat) {
        suggestions.category = matchedCat
      } else {
        // Use AI response as-is if no match
        suggestions.category = { l1: parsed.category.l1, l2: parsed.category.l2 }
      }
    } else {
      // Try to extract from original text
      const matchedCat = findMatchingCategory(originalText)
      if (matchedCat) {
        suggestions.category = matchedCat
      }
    }

    // Title
    if (parsed.title && typeof parsed.title === 'string') {
      suggestions.title = parsed.title.slice(0, 100) // Limit length
    }

    // Date of Manufacture
    if (parsed.dateOfManufacture) {
      suggestions.dateOfManufacture = parsed.dateOfManufacture
    } else {
      const extracted = extractDateOfManufacture(originalText)
      if (extracted) {
        suggestions.dateOfManufacture = extracted
      }
    }

    // Period - validate against our options
    if (parsed.period) {
      const matched = findMatchingPeriod(parsed.period)
      if (matched) {
        suggestions.period = matched
      }
    } else if (suggestions.dateOfManufacture) {
      const matched = findMatchingPeriod(suggestions.dateOfManufacture)
      if (matched) {
        suggestions.period = matched
      }
    }

    // Materials - validate each against our options
    if (Array.isArray(parsed.materials)) {
      const validMaterials: string[] = []
      for (const mat of parsed.materials) {
        const lower = mat.toLowerCase()
        const matched = materialOptions.find(m => m.toLowerCase() === lower)
        if (matched) {
          validMaterials.push(matched)
        }
      }
      if (validMaterials.length > 0) {
        suggestions.materials = validMaterials
      }
    }
    // Also try extracting from original text if AI didn't find materials
    if (!suggestions.materials?.length) {
      const extracted = findMatchingMaterials(originalText)
      if (extracted.length > 0) {
        suggestions.materials = extracted
      }
    }

    // Condition - validate against our options
    if (parsed.condition) {
      const matched = findMatchingCondition(parsed.condition)
      if (matched && matched !== 'New') {
        suggestions.condition = matched
      }
    }

    // Wear
    if (parsed.wear) {
      const matched = findMatchingWear(parsed.wear)
      if (matched) {
        suggestions.wear = matched
      }
    }

    // Restoration
    if (Array.isArray(parsed.restoration) && parsed.restoration.length > 0) {
      const validRestoration: string[] = []
      for (const rest of parsed.restoration) {
        const matched = restorationOptions.find(
          r => r.toLowerCase() === rest.toLowerCase()
        )
        if (matched) {
          validRestoration.push(matched)
        }
      }
      if (validRestoration.length > 0) {
        suggestions.restoration = validRestoration
      }
    }

    // Dimensions
    if (parsed.dimensions) {
      suggestions.dimensions = {
        width: typeof parsed.dimensions.width === 'number' ? parsed.dimensions.width : undefined,
        depth: typeof parsed.dimensions.depth === 'number' ? parsed.dimensions.depth : undefined,
        height: typeof parsed.dimensions.height === 'number' ? parsed.dimensions.height : undefined,
      }
      suggestions.dimensionUnit = parsed.dimensionUnit === 'cm' ? 'cm' : 'in'
    } else {
      // Try extracting from original text
      const extracted = extractDimensions(originalText)
      if (extracted) {
        suggestions.dimensions = {
          width: extracted.width,
          depth: extracted.depth,
          height: extracted.height,
        }
        suggestions.dimensionUnit = extracted.unit
      }
    }

    // Weight
    if (parsed.weight) {
      const matched = findMatchingWeight(parsed.weight)
      if (matched) {
        suggestions.weight = matched
      }
    }

    // Creator - validate against our options
    if (parsed.creator) {
      const matched = findMatchingCreator(parsed.creator)
      if (matched) {
        suggestions.creator = matched
      }
    }

    // Style - validate against our options
    if (parsed.style) {
      const matched = findMatchingStyle(parsed.style)
      if (matched) {
        suggestions.style = matched
      }
    }

    // Place of Origin - validate against our options
    if (parsed.placeOfOrigin) {
      const matched = findMatchingOrigin(parsed.placeOfOrigin)
      if (matched) {
        suggestions.placeOfOrigin = matched
      }
    }

    // Description
    if (parsed.description && typeof parsed.description === 'string') {
      suggestions.description = parsed.description
    }

  } catch (error) {
    console.error('Failed to parse AI response:', error)
    // Fall back to regex-based extraction from original text
    return extractSuggestionsFromText(originalText)
  }

  return suggestions
}

/**
 * Fallback extraction using regex and keyword matching
 * Used when API call fails or returns invalid response
 */
function extractSuggestionsFromText(text: string): AISuggestions {
  const suggestions: AISuggestions = {}

  // Category
  const category = findMatchingCategory(text)
  if (category) {
    suggestions.category = category
  }

  // Materials
  const materials = findMatchingMaterials(text)
  if (materials.length > 0) {
    suggestions.materials = materials
  }

  // Style
  const style = findMatchingStyle(text)
  if (style) {
    suggestions.style = style
  }

  // Origin
  const origin = findMatchingOrigin(text)
  if (origin) {
    suggestions.placeOfOrigin = origin
  }

  // Condition
  const condition = findMatchingCondition(text)
  if (condition) {
    suggestions.condition = condition
  }

  // Creator
  const creator = findMatchingCreator(text)
  if (creator) {
    suggestions.creator = creator
  }

  // Date of manufacture
  const date = extractDateOfManufacture(text)
  if (date) {
    suggestions.dateOfManufacture = date
  }

  // Period
  const period = findMatchingPeriod(text)
  if (period) {
    suggestions.period = period
  }

  // Dimensions
  const dimensions = extractDimensions(text)
  if (dimensions) {
    suggestions.dimensions = {
      width: dimensions.width,
      depth: dimensions.depth,
      height: dimensions.height,
    }
    suggestions.dimensionUnit = dimensions.unit
  }

  // Weight
  const weight = findMatchingWeight(text)
  if (weight) {
    suggestions.weight = weight
  }

  // Restoration
  const restoration = findMatchingRestoration(text)
  if (restoration.length > 0) {
    suggestions.restoration = restoration
  }

  return suggestions
}

/**
 * Main function to parse listing text using Claude API
 */
export async function parseListingWithAI(
  listingText: string,
  usePrefillDescription: boolean = false
): Promise<AIParseResult> {
  const apiKey = getApiKey()

  // If no API key, fall back to regex-based extraction
  if (!apiKey) {
    console.warn('No Anthropic API key found. Using fallback extraction.')
    const suggestions = extractSuggestionsFromText(listingText)

    // If user wants to prefill description, use original text
    if (usePrefillDescription) {
      suggestions.description = listingText
    }

    return {
      suggestions,
      confidence: {},
    }
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: buildSystemPrompt(),
        messages: [
          {
            role: 'user',
            content: buildUserPrompt(listingText),
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API request failed:', response.status, errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    const rawResponse = data.content?.[0]?.text || ''

    const suggestions = parseAndValidateResponse(rawResponse, listingText)

    // If user wants to prefill description and AI didn't generate one
    if (usePrefillDescription && !suggestions.description) {
      suggestions.description = listingText
    }

    return {
      suggestions,
      confidence: {},
      rawResponse,
    }
  } catch (error) {
    console.error('AI parsing failed, using fallback:', error)
    const suggestions = extractSuggestionsFromText(listingText)

    if (usePrefillDescription) {
      suggestions.description = listingText
    }

    return {
      suggestions,
      confidence: {},
    }
  }
}

/**
 * Test function for development - uses fallback extraction only
 */
export function parseListingOffline(
  listingText: string,
  usePrefillDescription: boolean = false
): AIParseResult {
  const suggestions = extractSuggestionsFromText(listingText)

  if (usePrefillDescription) {
    suggestions.description = listingText
  }

  return {
    suggestions,
    confidence: {},
  }
}
