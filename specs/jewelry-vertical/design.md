# Jewelry Vertical - Design Document

## Overview

The Jewelry Vertical is a specialized item upload form for listing jewelry items on the platform. This vertical extends the existing form infrastructure with jewelry-specific fields, categories, and options. While a basic jewelry component (`ItemUploadFormJewelry.tsx`) already exists, it currently contains placeholder data copied from furniture and needs to be properly designed with jewelry-specific fields and categories.

Jewelry is a distinct vertical from Art, Fashion, and Furniture due to its unique attributes: gemstones, precious metals, gender targeting, specific cuts, and specialized styles (Art Nouveau, Edwardian, etc.). The form must capture these attributes accurately to enable proper discovery and buyer matching.

## Goals

- **Primary**: Create a complete, jewelry-specific upload form with accurate categories and field options
- **Secondary**: Implement conditional field display (Stone Cut appears only when stones are selected)
- **Tertiary**: Simplify the Creator field compared to furniture (no attribution/role dropdowns)
- **Quality**: Maintain consistency with existing vertical patterns while adding jewelry-specific UX considerations

## Non-Goals

- **Not implementing**: Real API integration for category/option data (using mock data)
- **Not implementing**: Advanced gemstone certification/grading systems
- **Not implementing**: Watch-specific complications or movement fields (future work)
- **Not implementing**: AI-assisted field suggestions specific to jewelry (will use existing AI infrastructure)

## Requirements

### Functional Requirements

#### Item Details Section (Required Fields - In Order)

1. **Title** - Text input (existing pattern)
2. **Date of Manufacture/Period** - Text input with period dropdown (existing pattern)
3. **Creator** - Single searchable dropdown (SIMPLIFIED from furniture - no attribution/role)
4. **Gender** - NEW dropdown field
5. **Item Condition** - Condition dropdown with descriptions (existing pattern)
6. **Wear** - Searchable dropdown (existing pattern, disabled when New)
7. **Restoration Work & Modifications** - Multi-select dropdown (existing pattern)
8. **Additional Comments** - Textarea (existing pattern, disabled when Excellent/New)
9. **Item Dimensions** - Number inputs for width, depth, height (existing pattern)

#### Additional Details Section

1. **Place of Origin/Style** - Two dropdowns in a row (existing pattern)
2. **Stone(s)** - NEW multi-select dropdown
3. **Stone Cut** - NEW conditional multi-select dropdown (shows only when stones selected)
4. **Metals** - NEW multi-select dropdown
5. **Other Characteristics** - Multi-select dropdown with fixed values
6. **Customization** - NEW text input field

#### Categories (L1: Jewelry > L2 with L3 subcategories)

| L2 Category | L3 Subcategories |
|-------------|------------------|
| Bracelets | Bangles, Charm Bracelets, Cuff Bracelets, Link Bracelets, Tennis Bracelets |
| Brooches | Cameo Brooches, Figural Brooches, Floral Brooches, Geometric Brooches, Bar Pins |
| Cufflinks | Novelty Cufflinks, Gemstone Cufflinks, Enamel Cufflinks, Vintage Cufflinks, Designer Cufflinks |
| Earrings | Stud Earrings, Drop Earrings, Hoop Earrings, Chandelier Earrings, Clip-On Earrings |
| Loose Gemstones | Diamonds, Colored Gemstones, Pearls, Semi-Precious Stones, Certified Stones |
| Necklaces | Pendant Necklaces, Chain Necklaces, Chokers, Lariat Necklaces, Statement Necklaces |
| Objects d'Art and Vertu | Boxes and Cases, Desk Accessories, Miniatures, Smoking Accessories, Vanity Items |
| Rings | Engagement Rings, Wedding Bands, Cocktail Rings, Signet Rings, Stackable Rings |
| Silver, Flatware and Silverplate | Sterling Silver, Silver Plate, Hollowware, Flatware Sets, Serving Pieces |
| Watches | Dress Watches, Sport Watches, Chronographs, Pocket Watches, Vintage Watches |

### Non-Functional Requirements

- **Performance**: Form should load within 2 seconds with all options
- **Accessibility**: All dropdowns keyboard navigable, proper ARIA labels
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: Responsive design, touch-friendly dropdowns

## Technical Approach

### Architecture

The jewelry form follows the established vertical pattern:

```
src/
  components/
    ItemUploadFormJewelry.tsx    [MODIFY - main form component]
  data/
    formOptions.ts               [EXTEND - add jewelry-specific options]
    jewelryOptions.ts            [CREATE - jewelry-specific data]
  types/
    aiSuggestions.ts             [EXTEND - add jewelry fields to AISuggestions]
```

### Components

#### ItemUploadFormJewelry.tsx

- **Purpose**: Main form component for jewelry listings
- **Key Changes**:
  - Replace categories with jewelry-specific categories
  - Simplify Creator to single dropdown (no attribution/role)
  - Add Gender dropdown
  - Add Stones multi-select with conditional Stone Cut
  - Add Metals multi-select
  - Add Other Characteristics multi-select
  - Add Customization text field
  - Replace style options with jewelry-specific styles
  - Replace creator options with jewelry brands/designers

- **State Additions**:
  ```typescript
  const [gender, setGender] = useState<string>('')
  const [stones, setStones] = useState<string[]>([])
  const [stoneCuts, setStoneCuts] = useState<string[]>([])
  const [metals, setMetals] = useState<string[]>([])
  const [otherCharacteristics, setOtherCharacteristics] = useState<string[]>([])
  const [customization, setCustomization] = useState<string>('')
  ```

- **Conditional Logic**:
  ```typescript
  // Show Stone Cut only when stones are selected
  {stones.length > 0 && (
    <MultiSelectDropdown
      label="Stone Cut"
      placeholder="Select stone cuts"
      options={stoneCutOptions}
      value={stoneCuts}
      onChange={setStoneCuts}
    />
  )}
  ```

### Data Model

```typescript
// Jewelry-specific categories
export const jewelryCategories: Category[] = [
  { l1: 'Jewelry', l2: 'Bracelets', l3: ['Bangles', 'Charm Bracelets', 'Cuff Bracelets', 'Link Bracelets', 'Tennis Bracelets'] },
  { l1: 'Jewelry', l2: 'Brooches', l3: ['Cameo Brooches', 'Figural Brooches', 'Floral Brooches', 'Geometric Brooches', 'Bar Pins'] },
  // ... etc
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
```

### API / Interfaces

The form should extend the existing `AISuggestions` interface:

```typescript
// Additions to AISuggestions interface
export interface AISuggestions {
  // ... existing fields ...

  // Jewelry-specific fields
  gender?: string
  stones?: string[]
  stoneCuts?: string[]
  metals?: string[]
  otherCharacteristics?: string[]
  customization?: string
}
```

## UI/UX Considerations

### Field Ordering

**Item Details Section:**
1. Title (text input)
2. Date of Manufacture / Period (side by side)
3. Creator (single searchable dropdown - SIMPLIFIED)
4. Gender (dropdown)
5. Item Condition (condition dropdown with descriptions)
6. Wear (dropdown, disabled when condition is "New")
7. Restoration Work & Modifications (multi-select)
8. Additional Comments (textarea, disabled when Excellent/New)
9. Item Dimensions (width, depth, height in a row)

**Additional Details Section (after divider):**
1. Place of Origin / Style (side by side)
2. Stone(s) (multi-select)
3. Stone Cut (multi-select, CONDITIONAL - shown only when stones selected)
4. Metals (multi-select)
5. Other Characteristics (multi-select)
6. Customization (text input)

### Conditional Display Logic

```typescript
// Stone Cut visibility
{stones.length > 0 && (
  <MultiSelectDropdown
    label="Stone Cut"
    placeholder="Select stone cuts"
    options={stoneCutOptions}
    value={stoneCuts}
    onChange={setStoneCuts}
  />
)}
```

When stones are deselected, the Stone Cut selection should be cleared:

```typescript
const handleStonesChange = (newStones: string[]) => {
  setStones(newStones)
  // Clear stone cuts if no stones selected
  if (newStones.length === 0) {
    setStoneCuts([])
  }
}
```

### Creator Field Simplification

Unlike Furniture which has three dropdowns (Attribution, Creator, Role), Jewelry should have a single dropdown:

```jsx
// Jewelry pattern (single dropdown)
<SearchableDropdown
  label="Creator/Brand"
  placeholder="Search for creator or brand"
  options={jewelryCreatorOptions}
  value={creator}
  onChange={setCreator}
/>
```

### Dimension Unit for Jewelry

Consider using millimeters (mm) as the default unit for jewelry dimensions since jewelry pieces are typically small.

## Edge Cases

1. **No stones selected but Stone Cut has values**
   - Clear Stone Cut values when stones are deselected
   - Prevent Stone Cut from being submitted if stones array is empty

2. **Watch category selected**
   - Watches may have different dimension considerations (case diameter vs. band length)
   - Future enhancement: add watch-specific fields for movement, water resistance, etc.

3. **Loose Gemstones category**
   - May not need Metal field
   - Should require Stone and Stone Cut
   - Carat weight becomes more important (future field)

4. **Multiple stones with different cuts**
   - User can select multiple stones AND multiple cuts
   - The UI should allow any combination (e.g., Diamond + Ruby with Round Brilliant + Emerald Cut)

5. **Empty state for multi-select dropdowns**
   - Show placeholder text when no items selected
   - Allow "None" or "N/A" selection for restoration

6. **Unknown creator**
   - Allow empty selection for Creator/Brand field
   - Consider adding "Unknown/Unsigned" option

## Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| Title | Required, non-empty | "Title is required" |
| Date/Period | At least one required | "Date or period is required" |
| Gender | Optional | - |
| Condition | Required | "Condition is required" |
| Stones | Optional | - |
| Stone Cut | Only if stones selected | "Please select stones first" |
| Metals | Optional | - |

## Constraints

- **Technical**: Must use existing component library (MultiSelectDropdown, SearchableDropdown, etc.)
- **Business**: Categories must match the L1/L2/L3 structure for consistency with other verticals
- **Design**: Form layout must maintain visual consistency with Furniture/Art/Fashion forms

## Dependencies

- `MultiSelectDropdown` component (existing) - for stones, metals, other characteristics
- `SearchableDropdown` component (existing) - for creator, gender, style
- `ConditionDropdown` component (existing) - for item condition
- `formOptions.ts` types (existing) - Category, LabeledOption, Condition interfaces

## Migration / Rollout Strategy

1. **Phase 1: Data Layer**
   - Create jewelry-specific options in a new file (src/data/jewelryOptions.ts)
   - Define all mock data arrays

2. **Phase 2: Component Update**
   - Update ItemUploadFormJewelry.tsx with new fields
   - Add state management for new fields
   - Implement conditional Stone Cut display

3. **Phase 3: Integration**
   - Update type definitions for AI suggestions
   - Ensure category selection works with new categories

4. **Phase 4: Testing**
   - Test all dropdowns with mock data
   - Test conditional display logic
   - Test form validation

## Success Criteria

- [ ] All 10 L2 categories display with correct L3 subcategories
- [ ] Gender dropdown renders with 4 options
- [ ] Creator field is a single searchable dropdown (not 3-column layout)
- [ ] Stones multi-select works with 24+ stone options
- [ ] Stone Cut appears ONLY when stones are selected
- [ ] Stone Cut clears when all stones are deselected
- [ ] Metals multi-select works with 18+ metal options
- [ ] Other Characteristics shows exact 13 specified values
- [ ] Customization text input accepts free-form text
- [ ] Form maintains visual consistency with other verticals
- [ ] All fields are keyboard accessible
- [ ] Jewelry-specific conditions display with updated descriptions

## Open Questions

- [ ] Should we add carat weight field for stones/loose gemstones?
- [ ] Should dimension units default to mm or in for jewelry?
- [ ] Do we need certification fields (GIA, AGS) for diamonds?
- [ ] Should watches have separate fields for case size and band length?

## References

- Existing vertical implementations:
  - `src/components/ItemUploadFormFurniture.tsx`
  - `src/components/ItemUploadFormArt.tsx`
  - `src/components/ItemUploadFormFashion.tsx`
- Current jewelry component: `src/components/ItemUploadFormJewelry.tsx`
- Form options data: `src/data/formOptions.ts`
- Type definitions: `src/types/aiSuggestions.ts`
