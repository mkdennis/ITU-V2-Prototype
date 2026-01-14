# CLAUDE.md — Jewelry Vertical

## Project Context

The Jewelry Vertical is a specialized item upload form for listing jewelry on the platform. This feature enhances the existing `ItemUploadFormJewelry.tsx` component with jewelry-specific categories, fields, and data options. Unlike furniture which has complex creator attribution, jewelry uses a simplified single-dropdown pattern. The form includes conditional logic (Stone Cut field appears only when stones are selected) and jewelry-specific fields like Gender, Metals, and Customization.

## Before Starting Work

1. Read specs/jewelry-vertical/design.md completely - it contains all field specifications and mock data
2. Check specs/jewelry-vertical/implementation.md for current status
3. Review specs/jewelry-vertical/decisions.md for past architectural choices
4. Study these reference implementations for patterns:
   - `src/components/ItemUploadFormFurniture.tsx` - section organization, multi-select usage
   - `src/components/ItemUploadFormArt.tsx` - simplified creator pattern (single dropdown)
   - `src/components/ItemUploadFormFashion.tsx` - gender field pattern
   - `src/data/formOptions.ts` - data structure patterns

## Code Patterns

### Form Structure
- Follow existing vertical patterns: Item Details section first, then Additional Details
- Use existing components: `SearchableDropdown`, `MultiSelectDropdown`, `ConditionDropdown`, `TextInput`, `Textarea`, `NumberInput`
- Maintain consistent spacing and layout with other verticals

### State Management
- Use `useState` for each form field
- Group related fields logically
- Implement proper state handlers for conditional fields (e.g., clearing Stone Cut when stones deselected)

Example:
```typescript
const [stones, setStones] = useState<string[]>([])
const [stoneCuts, setStoneCuts] = useState<string[]>([])

const handleStonesChange = (newStones: string[]) => {
  setStones(newStones)
  // Clear stone cuts if no stones selected
  if (newStones.length === 0) {
    setStoneCuts([])
  }
}
```

### Data Organization
- Create `src/data/jewelryOptions.ts` for jewelry-specific data
- Export all data arrays using the same patterns as `formOptions.ts`
- Use `LabeledOption[]` for dropdowns with values and labels
- Use `string[]` for simple multi-select options
- Use `Category[]` for category hierarchies

### Creator Field Simplification
- **Critical**: Jewelry uses a SINGLE searchable dropdown for Creator/Brand
- **Do NOT** use the three-column pattern from furniture (attribution + creator + role)
- The label should be "Creator/Brand"
- Use `jewelryCreatorOptions` array

## Key Files

| What | Where |
|------|-------|
| Main jewelry form | src/components/ItemUploadFormJewelry.tsx |
| Jewelry-specific data | src/data/jewelryOptions.ts (CREATE) |
| Shared form options | src/data/formOptions.ts (reference) |
| Type definitions | src/types/aiSuggestions.ts (EXTEND) |
| Dropdown components | src/components/SearchableDropdown.tsx, MultiSelectDropdown.tsx (USE) |

## Critical Implementation Details

### 1. Conditional Stone Cut Field
The Stone Cut multi-select should ONLY appear when the user has selected at least one stone:
```typescript
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

### 2. Field Order (Must Follow Exactly)
**Item Details:**
1. Title
2. Date of Manufacture / Period (side by side)
3. Creator (single dropdown - not three columns!)
4. Gender
5. Item Condition
6. Wear
7. Restoration Work & Modifications
8. Additional Comments
9. Item Dimensions

**Additional Details:**
1. Place of Origin / Style (side by side)
2. Stone(s)
3. Stone Cut (conditional)
4. Metals
5. Other Characteristics
6. Customization

### 3. Categories
Use all 10 L2 categories from design.md:
- Bracelets
- Brooches
- Cufflinks
- Earrings
- Loose Gemstones
- Necklaces
- Objects d'Art and Vertu
- Rings
- Silver, Flatware and Silverplate
- Watches

Each with 5 L3 subcategories (see design.md for full list).

### 4. Other Characteristics
This is a fixed list of exactly 13 values (see design.md):
- Amber, Bakelite, Bone, Chronograph, Crystal, Ebony, Enamel, Fur, Galalith, Glass, Hair, Horn, Ivory

## Don't

- **Don't use the three-column creator pattern from furniture** - jewelry uses a single dropdown
- Don't add categories not specified in design.md
- Don't show Stone Cut field when no stones are selected
- Don't add fields beyond what's specified (e.g., no carat weight - that's future work)
- Don't use furniture/art categories - jewelry has its own
- Don't skip the conditional logic for Stone Cut field
- Don't forget to clear Stone Cut values when stones are deselected
- Don't change the field order specified in design.md

## Do

- Do create `src/data/jewelryOptions.ts` for all jewelry-specific data
- Do use existing components (SearchableDropdown, MultiSelectDropdown, etc.)
- Do follow the exact field order specified in design.md
- Do implement the conditional Stone Cut display
- Do clear Stone Cut when stones are deselected
- Do use jewelry-specific styles, creators, conditions, wear, and restoration options
- Do maintain visual consistency with other vertical forms
- Do test the conditional logic thoroughly
- Do update implementation.md as you complete each section

## Implementation Phases

Work in small, focused PRs:

### Phase 1: Data Layer
- Create `src/data/jewelryOptions.ts`
- Export all 10 category arrays
- Export gender, stones, stoneCuts, metals, otherCharacteristics arrays
- Export jewelry-specific styles, creators, conditions, wear, restoration arrays

### Phase 2: Component - Item Details Section
- Update ItemUploadFormJewelry.tsx Item Details section
- Add Gender field after Creator
- Simplify Creator to single dropdown
- Use jewelry-specific data for all fields

### Phase 3: Component - Additional Details Section
- Add Stones multi-select
- Implement conditional Stone Cut field
- Add Metals multi-select
- Add Other Characteristics multi-select
- Add Customization text input

### Phase 4: Integration & Testing
- Extend AISuggestions interface in types/aiSuggestions.ts
- Test all dropdowns with mock data
- Test conditional Stone Cut logic
- Verify form visual consistency with other verticals

## Testing

### Manual Testing Checklist
- [ ] All 10 jewelry categories appear in category dropdown
- [ ] Gender dropdown shows 4 options
- [ ] Creator field is a single searchable dropdown
- [ ] Stones multi-select works with 24+ options
- [ ] Stone Cut appears ONLY when stones selected
- [ ] Stone Cut clears when all stones deselected
- [ ] Metals multi-select works with 18+ options
- [ ] Other Characteristics shows exactly 13 values
- [ ] Customization text field accepts input
- [ ] Jewelry-specific styles appear in style dropdown
- [ ] Jewelry creators/brands appear in creator dropdown

### Edge Cases to Test
- Select stones, then deselect all → Stone Cut field should disappear and clear
- Select "New" condition → Wear and Additional Comments should disable
- Leave Creator empty → Should allow (not required)
- Multiple stones + multiple cuts → Should allow any combination

## Examples

No standalone examples required - the form itself is the working example. Test by:
1. Run `yarn dev`
2. Select "Jewelry" from welcome modal
3. Test all fields with mock data
4. Verify conditional logic works

## Common Pitfalls

1. **Creator Field Mistake**: Don't copy the three-column furniture pattern. Jewelry has ONE dropdown.
2. **Stone Cut Always Visible**: Don't forget the conditional `{stones.length > 0 && ...}` wrapper
3. **Not Clearing Stone Cut**: When stones are deselected, must clear stoneCuts state
4. **Wrong Categories**: Don't use furniture categories - create jewelry-specific ones
5. **Field Order**: Don't rearrange fields - follow design.md exactly

## AI Suggestions Support

The jewelry vertical integrates with existing AI parsing infrastructure. When extending `AISuggestions` interface, add:

```typescript
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

The AI parser will attempt to extract these fields from user-provided text in the AI Assist flow.

## Questions or Blockers?

If unclear:
1. Check design.md first
2. Look at reference implementations (Furniture, Art, Fashion forms)
3. Check decisions.md for context on past choices
4. Ask the user for clarification

## Success = Reviewable PR

Every PR should be reviewable in under 10 minutes:
- Max 5-7 files changed
- Max 500 lines changed
- Clear description and test plan
- One focused change (e.g., "Add Gender field" not "Complete jewelry form")
