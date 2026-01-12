// Expanded AI Suggestions type for all parseable form fields

export interface AISuggestions {
  // Basic Information
  category?: {
    l1: string
    l2: string
  }

  // Item Details
  title?: string
  dateOfManufacture?: string
  period?: string
  materials?: string[]
  condition?: string
  wear?: string
  restoration?: string[]
  conditionComments?: string

  // Dimensions
  dimensions?: {
    width?: number
    depth?: number
    height?: number
  }
  dimensionUnit?: 'in' | 'cm'
  weight?: string

  // Attribution
  creator?: string
  attribution?: string
  creatorRole?: string

  // Additional Details
  placeOfOrigin?: string
  style?: string

  // Description
  description?: string
}

// Input data passed to the AI parsing service
export interface AIAssistInput {
  textContent: string
  usePrefillDescription: boolean
}

// Response from the AI parsing service
export interface AIParseResult {
  suggestions: AISuggestions
  confidence: {
    [key: string]: number // 0-1 confidence score per field
  }
  rawResponse?: string // For debugging
}

// Category type matching the form structure
export interface Category {
  l1: string
  l2: string
  l3?: string[]
}

// Option types for dropdowns
export interface LabeledOption {
  value: string
  label: string
}

export interface Condition {
  name: string
  description: string
}
