import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to parse CSV file
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  // Skip header (first line) and return the rest
  return lines.slice(1).map(line => line.trim()).filter(line => line);
}

// Function to convert string to value format (lowercase, hyphenated)
function toValue(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Function to escape special characters in strings for JavaScript
function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')  // Escape backslashes
    .replace(/'/g, "\\'")     // Escape single quotes
    .replace(/"/g, '\\"')     // Escape double quotes
    .replace(/\n/g, '\\n')    // Escape newlines
    .replace(/\r/g, '\\r')    // Escape carriage returns
    .replace(/\t/g, '\\t');   // Escape tabs
}

// Parse all CSV files and sort alphabetically
const creators = parseCSV(path.join(__dirname, 'ITU Prototype Data - Creators.csv')).sort((a, b) => a.localeCompare(b));
const stones = parseCSV(path.join(__dirname, 'ITU Prototype Data - Stone.csv')).sort((a, b) => a.localeCompare(b));
const stoneCuts = parseCSV(path.join(__dirname, 'ITU Prototype Data - Stone Cut.csv')).sort((a, b) => a.localeCompare(b));
const styles = parseCSV(path.join(__dirname, 'ITU Prototype Data - Styles.csv')).sort((a, b) => a.localeCompare(b));

console.log(`Parsed ${creators.length} creators`);
console.log(`Parsed ${stones.length} stones`);
console.log(`Parsed ${stoneCuts.length} stone cuts`);
console.log(`Parsed ${styles.length} styles`);

// Generate TypeScript code for jewelry creators
const jewelryCreatorsCode = `export const jewelryCreatorOptions: LabeledOption[] = [\n${creators.map(creator => `  { value: '${toValue(creator)}', label: '${escapeString(creator)}' }`).join(',\n')}\n]`;

// Generate TypeScript code for stones
const stonesCode = `export const stoneOptions: string[] = [\n${stones.map(stone => `  '${escapeString(stone)}'`).join(',\n')}\n]`;

// Generate TypeScript code for stone cuts
const stoneCutsCode = `export const stoneCutOptions: string[] = [\n${stoneCuts.map(cut => `  '${escapeString(cut)}'`).join(',\n')}\n]`;

// Generate TypeScript code for jewelry styles (since there's overlap with general styles, we'll create jewelry-specific ones)
const jewelryStylesCode = `export const jewelryStyleOptions: LabeledOption[] = [\n${styles.map(style => `  { value: '${toValue(style)}', label: '${escapeString(style)}' }`).join(',\n')}\n]`;

// Write to output file
const outputContent = `// Jewelry-specific data parsed from CSV files
// Generated on ${new Date().toISOString()}

import type { LabeledOption } from '../types/aiSuggestions'

${jewelryCreatorsCode}

${stonesCode}

${stoneCutsCode}

${jewelryStylesCode}
`;

fs.writeFileSync(path.join(__dirname, 'src/data/jewelryOptions.ts'), outputContent);

console.log('\nSuccessfully generated src/data/jewelryOptions.ts');
console.log(`\nSample creators: ${creators.slice(0, 5).join(', ')}`);
console.log(`Sample stones: ${stones.slice(0, 5).join(', ')}`);
console.log(`Sample stone cuts: ${stoneCuts.slice(0, 5).join(', ')}`);
console.log(`Sample styles: ${styles.slice(0, 5).join(', ')}`);
