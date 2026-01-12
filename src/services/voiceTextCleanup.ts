// Voice Text Cleanup Service
// Uses Claude API to clean up and format speech-to-text transcriptions

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

// Get API key from environment variable (reuse existing pattern)
function getApiKey(): string | null {
  return import.meta.env.VITE_ANTHROPIC_API_KEY || null
}

/**
 * Build the system prompt for text cleanup
 */
function buildCleanupSystemPrompt(): string {
  return `You are a text cleanup assistant for antique and vintage item descriptions. Your task is to:

1. Fix any speech recognition errors or misheard words
2. Add proper punctuation and capitalization
3. Fix grammar issues
4. Remove filler words (um, uh, like, you know, so, etc.)
5. Format numbers and measurements properly
6. Keep the original meaning and intent intact
7. Do NOT add any new information - only clean up what was said
8. Do NOT change technical terms, brand names, or specialized vocabulary

Return ONLY the cleaned text with no additional commentary or explanation.`
}

/**
 * Clean up transcribed text using Claude API
 */
export async function cleanupTranscribedText(rawText: string): Promise<string> {
  // If no text or very short text, return as-is
  if (!rawText || rawText.trim().length < 5) {
    return rawText.trim()
  }

  const apiKey = getApiKey()

  // If no API key, return the raw text with basic cleanup
  if (!apiKey) {
    console.warn('[Voice Cleanup] No API key found, returning raw text with basic cleanup')
    return basicTextCleanup(rawText)
  }

  try {
    console.log('[Voice Cleanup] Sending text to Claude for cleanup...')
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
        max_tokens: 1000,
        system: buildCleanupSystemPrompt(),
        messages: [
          {
            role: 'user',
            content: `Please clean up this speech-to-text transcription:\n\n"${rawText}"`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Voice Cleanup] API request failed:', response.status, errorText)
      return basicTextCleanup(rawText)
    }

    const data = await response.json()
    const cleanedText = data.content?.[0]?.text || rawText

    console.log('[Voice Cleanup] Successfully cleaned text')
    // Remove any quotes that Claude might have added
    return cleanedText.replace(/^["']|["']$/g, '').trim()
  } catch (error) {
    console.error('[Voice Cleanup] Error cleaning text:', error)
    return basicTextCleanup(rawText)
  }
}

/**
 * Basic text cleanup fallback when API is not available
 */
function basicTextCleanup(text: string): string {
  return text
    .trim()
    // Remove multiple spaces
    .replace(/\s+/g, ' ')
    // Capitalize first letter
    .replace(/^./, (char) => char.toUpperCase())
    // Add period at end if missing punctuation
    .replace(/([^.!?])$/, '$1.')
}
