import './App.css'
import Dropdown from './components/Dropdown'
import RadioButtonGroup from './components/RadioButtonGroup'
import NumberInput from './components/NumberInput'
import TextInput from './components/TextInput'
import Textarea from './components/Textarea'
import ImageUpload from './components/ImageUpload'
import ImageSlot from './components/ImageSlot'
import NavigationHeader from './components/NavigationHeader'
import RecommendedPriceBanner from './components/RecommendedPriceBanner'
import CollapsibleSection from './components/CollapsibleSection'
import SearchableCategoryDropdown from './components/SearchableCategoryDropdown'
import ConditionDropdown from './components/ConditionDropdown'

function App() {
  const categories = [
    { l1: 'Decorative Objects', l2: 'Bowls and Baskets' },
    { l1: 'Decorative Objects', l2: 'Boxes' },
    { l1: 'Decorative Objects', l2: 'Candle Holders' },
    { l1: 'Decorative Objects', l2: 'Clocks' },
    { l1: 'Decorative Objects', l2: 'Desk Accessories' },
    { l1: 'Decorative Objects', l2: 'Picture Frames' },
    { l1: 'Decorative Objects', l2: 'Sculptures' },
    { l1: 'Decorative Objects', l2: 'Vases and Vessels' },
    { l1: 'Lighting', l2: 'Chandeliers and Pendants' },
    { l1: 'Lighting', l2: 'Floor Lamps' },
    { l1: 'Lighting', l2: 'Flush Mount' },
    { l1: 'Lighting', l2: 'Lanterns' },
    { l1: 'Lighting', l2: 'Table Lamps' },
    { l1: 'Lighting', l2: 'Wall Lights and Sconces' },
    { l1: 'Seating', l2: 'Dining Chairs' },
    { l1: 'Seating', l2: 'Stools' },
    { l1: 'Tables', l2: 'Vanities' },
  ]

  const conditions = [
    {
      name: 'Distressed',
      description: 'Visible signs of previous use that may include scratches, gouges, cracks and fissures and worn corners. May have significant losses, fading or structural instability.'
    },
    {
      name: 'Fair',
      description: 'Shows light scratches and wear from previous use but remains in fair condition. May have some structural issues, including minor instability.'
    },
    {
      name: 'Good',
      description: 'Lightly used, with very light scratches, or minor cosmetic wear, but has no structural issues. Most antique and vintage items fit this condition.'
    },
    {
      name: 'Excellent',
      description: 'Like new or has never been used. Absolutely no scratches or wear. Has no structural issues and is in perfect condition.'
    },
    {
      name: 'New',
      description: 'Brand-new, unused item, not previously owned. Shows absolutely no signs of wear.'
    }
  ]

  return (
    <>
      <NavigationHeader />
      <div className="app">
        <div className="form-section" id="basic-information-section">
          <h3>Basic Information</h3>
        <SearchableCategoryDropdown
          label="Category *"
          placeholder="Select a category"
          categories={categories}
        />
        <RadioButtonGroup
          label="Sell as * (cannot be edited after submission)"
          name="sell-as"
          options={[
            { value: 'individual', label: 'an individual item' },
            { value: 'set', label: 'a set' }
          ]}
        />
        <div className="quantity-section">
          <div className="quantity-input-row">
            <NumberInput
              label="Quantity Available"
              suffix="Items"
            />
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span>Unlimited (Typically used for made to order or current production inventory)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="form-section" id="item-details-section">
        <h3>Item Details</h3>
        <TextInput
          label="Title *"
        />
        <div className="form-row">
          <TextInput
            label="Date of Manufacture *"
          />
          <Dropdown
            label="Period *"
            placeholder="Select a period"
          />
        </div>
        <Dropdown
          label="Materials *"
          placeholder="Select materials"
        />
        <ConditionDropdown
          label="Item Condition *"
          placeholder="Select condition"
          conditions={conditions}
        />
        <div className="form-row">
          <Dropdown
            label="Wear"
            placeholder="Select wear"
          />
          <Dropdown
            label="Restoration Work & Modifications *"
            placeholder="Select restoration work"
          />
        </div>
        <div className="dimensions-row">
          <NumberInput
            label="Item Width"
            suffix="in"
          />
          <NumberInput
            label="Item Depth"
            suffix="in"
          />
          <NumberInput
            label="Item Height"
            suffix="in"
          />
        </div>
        <Dropdown
          label="Weight"
          placeholder="Select weight"
        />
        <div className="divider"></div>
        <p className="optional-fields-label">Optional Fields</p>
        <div className="creators-row">
          <Dropdown
            label="Creators"
            placeholder="Select an attribution"
          />
          <Dropdown
            placeholder="Search for creator"
          />
          <Dropdown
            placeholder="Select a role"
          />
        </div>
        <div className="form-row">
          <Dropdown
            label="Place of Origin"
            placeholder="Select place of origin"
          />
          <Dropdown
            label="Style"
            placeholder="Select style"
          />
        </div>
      </div>

      <div className="form-section" id="pricing-quantity-section">
        <h3>Pricing & Quantity</h3>
        <div className="pricing-layout">
          <NumberInput
            label="List Price"
            prefix="$"
            suffix="USD"
            placeholder="Enter amount"
          />
          <RecommendedPriceBanner
            recommendedPrice={750}
            priceRange={{ min: 675, max: 825 }}
            salesLikelihood={54}
            onApply={() => {
              // Handle apply action
            }}
          />
        </div>
        <CollapsibleSection label="Other Pricing Options">
          <div className="pricing-options-content">
            {/* Add pricing options content here */}
            <p>Additional pricing options will be displayed here.</p>
          </div>
        </CollapsibleSection>
      </div>

      <div className="form-section" id="description-section">
        <h3 className="description-heading">Description</h3>
          <p className="description-recommendation">Recommended length: 120 words.</p>
        <div className="description-section">
          <Textarea
            placeholder={`What makes this piece unique or special?
Why is it worth the price?
How would you describe it (and its condition) to someone who hasn't seen it in person?
What is its background or history?
What details would be useful for a potential buyer to know?`}
            rows={12}
          />
          <div className="description-tips">
            <div className="tips-header">
              <span className="tips-icon">💡</span>
              <h4 className="tips-title">Tips for Writing a Description That Drives Traffic</h4>
            </div>
            <ul className="tips-list">
              <li>Adding your most important keywords at the beginning of the description is the most effective way to have your listing included in early search engine results.</li>
              <li>Do not include shipping or contact information in the description.</li>
            </ul>
            <a href="#" className="tips-link">Learn more</a>
          </div>
        </div>
      </div>

      <div className="form-section" id="images-section">
        <h3>Images</h3>

        <div className="image-layout">
          <div className="image-layout-info">
            <h5>Primary Image</h5>
            <p className="image-upload-description">
              This is used as the main listing image across the site. Once you upload an image it will be automatically edited with a white background. If there are issues with the automatic processing of your image, our team can manually edit it.
            </p>
          </div>
          <ImageUpload
            uploadText="Upload Primary Image or Drag Image Here"
            requirements="All images must be at least 768x768 px, less than 16MB, JPEGs only"
            processingNote="This image will be automatically processed"
          />
        </div>
        <div className="divider"></div>

        <div className="image-layout">
          <div className="image-layout-info">
            <h5>Additional Images</h5>
            <p className="image-upload-description">
              Images should communicate the attributes you would want buyer to experience in person. Add at least four detail shots, including material, hardware, construction, and creator marks. Drag images to change their order. Do not include additional information, such as text or logos, on any images.
            </p>
          </div>
          <div className="additional-images-upload-wrapper">
            <div className="alert-box">
              <span className="alert-icon">ℹ️</span>
              <span className="alert-text">Select primary image first</span>
            </div>
            <ImageUpload
              uploadText="Upload Additional Images or Drag Images Here"
              disabled={true}
            />
            <div className="image-slots-grid">
              <ImageSlot label="Details" icon="🔍" />
              <ImageSlot label="Various Angles" icon="🪑" />
              <ImageSlot label="In Situation" icon="💡" />
              <ImageSlot label="Creator" icon="✏️" />
              <ImageSlot />
              <ImageSlot />
              <ImageSlot />
              <ImageSlot label="Up to 20 Images" icon="📤" />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
