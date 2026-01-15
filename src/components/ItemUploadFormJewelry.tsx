import '../App.css'
import RadioButtonGroup from './RadioButtonGroup'
import NumberInput from './NumberInput'
import TextInput from './TextInput'
import Textarea from './Textarea'
import ImageUpload from './ImageUpload'
import ImageSlot from './ImageSlot'
import UploadedImage from './UploadedImage'
import NavigationHeader from './NavigationHeader'
import RecommendedPriceBanner from './RecommendedPriceBanner'
import SearchableCategoryDropdown from './SearchableCategoryDropdown'
import CategorySelectionModal from './CategorySelectionModal'
import ConditionDropdown from './ConditionDropdown'
import SearchableDropdown from './SearchableDropdown'
import MultiSelectDropdown from './MultiSelectDropdown'
import AISuggestion from './AISuggestion'
import PackageDimensions from './PackageDimensions'
import ShippingQuotes from './ShippingQuotes'
import { useState, useEffect } from 'react'
import type { AISuggestions } from '../types/aiSuggestions'
import { jewelryCreatorOptions, stoneOptions, stoneCutOptions, jewelryStyleOptions } from '../data/jewelryOptions'
import { categoriesByVertical, conditions, periods, materialOptions, wearOptions, restorationOptions, weightOptions, attributionOptions, roleOptions, countryOptions } from '../data/formOptions'

interface ItemUploadFormJewelryProps {
  aiAssistEnabled?: boolean
  aiSuggestions?: AISuggestions
}

function ItemUploadFormJewelry({ aiAssistEnabled = false, aiSuggestions = {} }: ItemUploadFormJewelryProps) {
  const [dateOfManufacture, setDateOfManufacture] = useState<string>('')
  const [period, setPeriod] = useState<string>('')
  const [materials, setMaterials] = useState<string[]>([])
  const [stone, setStone] = useState<string>('')
  const [stoneCut, setStoneCut] = useState<string>('')
  const [labReportAvailable, setLabReportAvailable] = useState<boolean>(false)
  const [condition, setCondition] = useState<string>('')
  const [restoration, setRestoration] = useState<string[]>([])
  const [conditionComments, setConditionComments] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [style, setStyle] = useState<string>('')
  const [placeOfOrigin, setPlaceOfOrigin] = useState<string>('')
  const [weightUnit, setWeightUnit] = useState<string>('')
  const [customWeightUnit, setCustomWeightUnit] = useState<string>('')
  const [unlimitedQuantity, setUnlimitedQuantity] = useState<boolean>(false)
  const [listPrice, setListPrice] = useState<number>(0)
  const [negotiable, setNegotiable] = useState<boolean>(false)
  const [netPriceDiscount, setNetPriceDiscount] = useState<number>(10)
  const [noNetDiscount, setNoNetDiscount] = useState<boolean>(false)
  const [autoOfferEnabled, setAutoOfferEnabled] = useState<boolean>(false)
  const [autoOfferDiscount, setAutoOfferDiscount] = useState<number>(15)
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [netPrice, setNetPrice] = useState<number>(0)
  const [autoOfferPrice, setAutoOfferPrice] = useState<number>(0)

  // Image state
  const [primaryImage, setPrimaryImage] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null)

  // Shipping & Handling state
  const [inventoryLocation, setInventoryLocation] = useState<string>('Seller Storefront (Default)')
  const [packages, setPackages] = useState<Array<{ weight: number; length: number; width: number; height: number }>>([
    { weight: 0, length: 0, width: 0, height: 0 }
  ])
  const [handlingTime, setHandlingTime] = useState<string>('3')
  const [returnPolicy, setReturnPolicy] = useState<string>('All Sales Final')
  const [shippingZones, setShippingZones] = useState([
    {
      region: 'Continental United States',
      priceRange: { min: 25, max: 36 },
      description: 'Shipping cost is calculated based on buyer\'s location and packing dimensions.',
      shippingPrice: 'calculated',
      shippingMethod: 'fedex-standard'
    },
    {
      region: 'Rest of World',
      priceRange: { min: 50, max: 75 },
      description: 'Shipping cost is calculated based on buyer\'s location and packing dimensions.',
      shippingPrice: 'calculated',
      shippingMethod: 'fedex-standard'
    }
  ])

  // Internal Notes state
  const [referenceNumber, setReferenceNumber] = useState<string>('')
  const [internalNotes, setInternalNotes] = useState<string>('')

  // Update prices when list price changes
  useEffect(() => {
    if (listPrice > 0) {
      // Update net price (10% default)
      if (!noNetDiscount) {
        setNetPrice(listPrice * (netPriceDiscount / 100))
      }
      // Update auto offer price (15% default for automated offers)
      if (autoOfferEnabled) {
        setAutoOfferPrice(listPrice * (autoOfferDiscount / 100))
      }
    }
  }, [listPrice, netPriceDiscount, noNetDiscount, autoOfferEnabled, autoOfferDiscount])

  // Handle list price change
  const handleListPriceChange = (value: number) => {
    setListPrice(value)
    // Auto-update net price
    if (value > 0 && !noNetDiscount) {
      setNetPrice(value * (netPriceDiscount / 100))
    }
    // Auto-update auto offer price
    if (value > 0 && autoOfferEnabled) {
      setAutoOfferPrice(value * (autoOfferDiscount / 100))
    }
  }

  // Handle net price manual change
  const handleNetPriceChange = (value: number) => {
    setNetPrice(value)
    // Calculate percentage from manual net price entry
    if (listPrice > 0 && value > 0) {
      const calculatedPercentage = Math.round((value / listPrice) * 100)
      setNetPriceDiscount(calculatedPercentage)
    }
  }

  // Handle net price discount change
  const handleNetPriceDiscountChange = (percentage: number) => {
    setNetPriceDiscount(percentage)
    if (listPrice > 0 && !noNetDiscount) {
      setNetPrice(listPrice * (percentage / 100))
    }
  }

  // Handle auto offer price manual change
  const handleAutoOfferPriceChange = (value: number) => {
    setAutoOfferPrice(value)
    // Calculate percentage from manual offer price entry
    if (listPrice > 0 && value > 0) {
      const calculatedPercentage = Math.round((value / listPrice) * 100)
      setAutoOfferDiscount(calculatedPercentage)
    }
  }

  // Handle auto offer discount change
  const handleAutoOfferDiscountChange = (percentage: number) => {
    setAutoOfferDiscount(percentage)
    if (listPrice > 0) {
      setAutoOfferPrice(listPrice * (percentage / 100))
    }
  }

  // Handle primary image upload
  const handlePrimaryImageUpload = (files: FileList) => {
    const file = files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPrimaryImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle additional images upload
  const handleAdditionalImagesUpload = (files: FileList) => {
    const fileArray = Array.from(files)

    Promise.all(
      fileArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result as string)
          }
          reader.readAsDataURL(file)
        })
      })
    ).then((newImages) => {
      setAdditionalImages((prev) => [...prev, ...newImages])
    })
  }

  // Handle primary image delete
  const handlePrimaryImageDelete = () => {
    setPrimaryImage(null)
  }

  // Handle additional image delete
  const handleAdditionalImageDelete = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle drag start for image reordering
  const handleImageDragStart = (index: number) => {
    setDraggedImageIndex(index)
  }

  // Handle drag over for image reordering
  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Handle drop for image reordering
  const handleImageDrop = (index: number) => {
    if (draggedImageIndex === null) return

    const newImages = [...additionalImages]
    const draggedImage = newImages[draggedImageIndex]
    newImages.splice(draggedImageIndex, 1)
    newImages.splice(index, 0, draggedImage)

    setAdditionalImages(newImages)
    setDraggedImageIndex(null)
  }

  // Handle package changes
  const handlePackageChange = (index: number, field: 'weight' | 'length' | 'width' | 'height', value: number) => {
    const newPackages = [...packages]
    newPackages[index][field] = value
    setPackages(newPackages)
  }

  const handleAddPackage = () => {
    setPackages([...packages, { weight: 0, length: 0, width: 0, height: 0 }])
  }

  const handleDeletePackage = (index: number) => {
    if (packages.length > 1) {
      const newPackages = packages.filter((_, i) => i !== index)
      setPackages(newPackages)
    }
  }

  // Handle shipping zone changes
  const handleShippingPriceChange = (region: string, value: string) => {
    setShippingZones(zones =>
      zones.map(zone => zone.region === region ? { ...zone, shippingPrice: value } : zone)
    )
  }

  const handleShippingMethodChange = (region: string, value: string) => {
    setShippingZones(zones =>
      zones.map(zone => zone.region === region ? { ...zone, shippingMethod: value } : zone)
    )
  }

  // Use Jewelry-specific categories (no filtering needed)
  const jewelryCategories = categoriesByVertical.Jewelry

  // Calculate period from year
  const calculatePeriod = (yearString: string) => {
    const year = parseInt(yearString)
    if (isNaN(year)) return

    // Handle 2020 and beyond
    if (year >= 2020) {
      setPeriod('2020-')
      return
    }

    // Calculate the decade
    const decade = Math.floor(year / 10) * 10
    const periodString = `${decade}-${decade + 9}`

    // Check if this period exists in our list
    if (periods.includes(periodString)) {
      setPeriod(periodString)
    }
  }

  const handleDateBlur = (value: string) => {
    calculatePeriod(value)
  }

  return (
    <>
      <NavigationHeader />
      <div className="app">
        <div className="form-section" id="basic-information-section">
          <h3>Basic Information</h3>
        <div className="category-field-wrapper">
          <SearchableCategoryDropdown
            label="Category *"
            placeholder="Select a category"
            categories={jewelryCategories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <button
            className="view-all-categories-button"
            onClick={() => setCategoryModalOpen(true)}
          >
            View All Categories
          </button>
        </div>
        <CategorySelectionModal
          isOpen={categoryModalOpen}
          onClose={() => setCategoryModalOpen(false)}
          onSelect={setSelectedCategory}
          categories={jewelryCategories}
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
              disabled={unlimitedQuantity}
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={unlimitedQuantity}
                onChange={(e) => setUnlimitedQuantity(e.target.checked)}
              />
              <span>Unlimited (Typically used for made to order or current production inventory)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="form-section" id="item-details-section">
        <h3>Item Details</h3>
        <div>
          <TextInput
            label="Title *"
            value={title}
            onChange={setTitle}
          />
          {aiAssistEnabled && aiSuggestions.title && !title && (
            <AISuggestion
              suggestion={aiSuggestions.title}
              onApply={() => setTitle(aiSuggestions.title!)}
            />
          )}
        </div>
        <div className="form-row">
          <TextInput
            label="Date of Manufacture *"
            value={dateOfManufacture}
            onChange={setDateOfManufacture}
            onBlur={handleDateBlur}
          />
          <div>
            <SearchableDropdown
              label="Period *"
              placeholder="Select a period"
              options={periods}
              value={period}
              onChange={setPeriod}
            />
            {aiAssistEnabled && aiSuggestions.period && !period && (
              <AISuggestion
                suggestion={aiSuggestions.period}
                onApply={() => setPeriod(aiSuggestions.period!)}
              />
            )}
          </div>
        </div>
        <div>
          <MultiSelectDropdown
            label="Materials *"
            placeholder="Select materials"
            options={materialOptions}
            value={materials}
            onChange={setMaterials}
          />
          {aiAssistEnabled && aiSuggestions.materials && materials.length === 0 && (
            <AISuggestion
              suggestion={aiSuggestions.materials.join(', ')}
              onApply={() => setMaterials(aiSuggestions.materials!)}
            />
          )}
        </div>
        <div className="form-row">
          <SearchableDropdown
            label="Stone"
            placeholder="Select stone type"
            options={stoneOptions}
            value={stone}
            onChange={setStone}
          />
          <SearchableDropdown
            label="Stone Cut"
            placeholder="Select stone cut"
            options={stoneCutOptions}
            value={stoneCut}
            onChange={setStoneCut}
          />
        </div>
        {stoneCut && (
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={labReportAvailable}
              onChange={(e) => setLabReportAvailable(e.target.checked)}
            />
            <span>Lab report available</span>
          </label>
        )}
        <div>
          <ConditionDropdown
            label="Item Condition *"
            placeholder="Select condition"
            conditions={conditions}
            value={condition}
            onChange={setCondition}
          />
          {aiAssistEnabled && aiSuggestions.condition && !condition && (
            <AISuggestion
              suggestion={aiSuggestions.condition}
              onApply={() => setCondition(aiSuggestions.condition!)}
            />
          )}
        </div>
        <SearchableDropdown
          label="Wear"
          placeholder="Select wear"
          options={wearOptions}
          disabled={condition === 'New'}
        />
        <MultiSelectDropdown
          label="Restoration Work & Modifications *"
          placeholder="Select restoration work"
          options={restorationOptions}
          value={restoration}
          onChange={setRestoration}
        />
        <Textarea
          label="Do you have additional comments about the condition of this item?"
          placeholder="Describe any signs of wear, scratches, cracks, or other types of damage. Additionally, if any restorations been made, please describe the work here."
          rows={4}
          value={conditionComments}
          onChange={(e) => setConditionComments(e.target.value)}
          disabled={condition === 'Excellent' || condition === 'New'}
        />
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
        <div className="form-row">
          <SearchableDropdown
            label="Weight"
            placeholder="Select weight"
            options={weightOptions}
          />
          {weightUnit === 'custom' ? (
            <TextInput
              label=""
              placeholder="Enter custom unit"
              value={customWeightUnit}
              onChange={setCustomWeightUnit}
            />
          ) : (
            <div className="dropdown-container" style={{ marginTop: '0' }}>
              <select
                className="discount-dropdown"
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                style={{ height: '40px' }}
              >
                <option value="">Enter custom unit</option>
                <option value="ct">Carat (ct)</option>
                <option value="g">Grams (g)</option>
                <option value="toz">Troy Ounces (t oz)</option>
                <option value="custom">Use Custom Field</option>
              </select>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <p className="optional-fields-label">Additional Fields</p>
        <p className="additional-fields-subtext">Adding more fields helps your item get discovered</p>
        <div className="creators-row">
          <SearchableDropdown
            label="Creators"
            placeholder="Select an attribution"
            options={attributionOptions}
          />
          <SearchableDropdown
            placeholder="Search for creator"
            options={jewelryCreatorOptions}
          />
          <SearchableDropdown
            placeholder="Select a role"
            options={roleOptions}
          />
        </div>
        <div className="form-row">
          <div>
            <SearchableDropdown
              label="Place of Origin"
              placeholder="Select place of origin"
              options={countryOptions}
              value={placeOfOrigin}
              onChange={setPlaceOfOrigin}
            />
            {aiAssistEnabled && aiSuggestions.placeOfOrigin && !placeOfOrigin && (
              <AISuggestion
                suggestion={countryOptions.find(c => c.value === aiSuggestions.placeOfOrigin)?.label || aiSuggestions.placeOfOrigin}
                onApply={() => setPlaceOfOrigin(aiSuggestions.placeOfOrigin!)}
              />
            )}
          </div>
          <div>
            <SearchableDropdown
              label="Style"
              placeholder="Select style"
              options={jewelryStyleOptions}
              value={style}
              onChange={setStyle}
            />
            {aiAssistEnabled && aiSuggestions.style && !style && (
              <AISuggestion
                suggestion={jewelryStyleOptions.find(s => s.value === aiSuggestions.style)?.label || aiSuggestions.style}
                onApply={() => setStyle(aiSuggestions.style!)}
              />
            )}
          </div>
        </div>
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
          {primaryImage ? (
            <UploadedImage
              src={primaryImage}
              alt="Primary image"
              onDelete={handlePrimaryImageDelete}
              isPrimary={true}
            />
          ) : (
            <ImageUpload
              uploadText="Upload Primary Image or Drag Image Here"
              requirements="All images must be at least 768x768 px, less than 16MB, JPEGs only"
              processingNote="This image will be automatically processed"
              onFilesSelected={handlePrimaryImageUpload}
            />
          )}
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
            {!primaryImage && (
              <div className="alert-box">
                <span className="alert-icon">ℹ️</span>
                <span className="alert-text">Select primary image first</span>
              </div>
            )}
            <ImageUpload
              uploadText="Upload Additional Images or Drag Images Here"
              disabled={!primaryImage}
              onFilesSelected={handleAdditionalImagesUpload}
              multiple={true}
            />
            <div className="image-slots-grid">
              {additionalImages.map((image, index) => (
                <UploadedImage
                  key={`uploaded-${index}`}
                  src={image}
                  alt={`Additional image ${index + 1}`}
                  onDelete={() => handleAdditionalImageDelete(index)}
                  draggable={true}
                  onDragStart={() => handleImageDragStart(index)}
                  onDragOver={handleImageDragOver}
                  onDrop={() => handleImageDrop(index)}
                />
              ))}
              {additionalImages.length < 20 && (
                <>
                  {additionalImages.length === 0 && <ImageSlot label="Details" icon="🔍" isEmpty={true} />}
                  {additionalImages.length <= 1 && <ImageSlot label="Various Angles" icon="🪑" isEmpty={true} />}
                  {additionalImages.length <= 2 && <ImageSlot label="In Situation" icon="💡" isEmpty={true} />}
                  {additionalImages.length <= 3 && <ImageSlot label="Signatures/Labels" icon="✏️" isEmpty={true} />}
                  {[...Array(Math.max(0, Math.min(3, 20 - additionalImages.length - 4)))].map((_, i) => (
                    <ImageSlot key={`empty-${i}`} isEmpty={true} />
                  ))}
                  <ImageSlot label="Up to 20 Images" icon="📤" isEmpty={true} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section" id="pricing-quantity-section">
        <h3>Pricing</h3>
        <div className="pricing-layout">
          <div className="pricing-column-left">
            <NumberInput
              label="List Price"
              prefix="$"
              suffix="USD"
              placeholder="Enter amount"
              value={listPrice}
              onChange={handleListPriceChange}
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
              />
              <div className="checkbox-text-wrapper">
                <span className="checkbox-text-main">This Item is Negotiable</span>
                <span className="checkbox-text-subtext">Allow buyers to send you offers for this item</span>
              </div>
            </label>
          </div>
          <RecommendedPriceBanner
            recommendedPrice={750}
            priceRange={{ min: 675, max: 825 }}
            salesLikelihood={54}
            onApply={() => {
              // Handle apply action
            }}
          />
        </div>

        <div className="pricing-options-content">
          <div className="net-price-section">
            <div className="net-price-row">
              <NumberInput
                label="Net Price"
                prefix="$"
                suffix="USD"
                value={noNetDiscount ? 0 : netPrice}
                onChange={handleNetPriceChange}
                disabled={noNetDiscount}
              />
              <div className="dropdown-container">
                <label className="dropdown-label">Discount (Off List Price)</label>
                <select
                  className="discount-dropdown"
                  value={netPriceDiscount}
                  onChange={(e) => handleNetPriceDiscountChange(Number(e.target.value))}
                  disabled={noNetDiscount}
                >
                  {[10, 15, 20, 25, 30, 35, 40, 45, 50].map(percent => (
                    <option key={percent} value={percent}>{percent}%</option>
                  ))}
                </select>
              </div>
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={noNetDiscount}
                onChange={(e) => setNoNetDiscount(e.target.checked)}
              />
              <div className="checkbox-text-wrapper">
                <span className="checkbox-text-main">I do not offer a net price discount on this piece</span>
                <span className="checkbox-text-subtext">By selecting this option you confirm that your List Price is the best price you can offer, and you understand this listing may not be promoted to the trade.</span>
              </div>
            </label>
          </div>
          <div className="auto-offers-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={autoOfferEnabled}
                onChange={(e) => setAutoOfferEnabled(e.target.checked)}
              />
              <div className="checkbox-text-wrapper">
                <span className="checkbox-text-main">Automatically Send Offers to Interested Customers</span>
                <span className="checkbox-text-subtext">Opt in to proactively send offers to interested customers. Choose the offer amount and 1stDibs will handle the rest. Automated private offers will expire after 7 days.</span>
              </div>
            </label>
            {autoOfferEnabled && (
              <div className="auto-offer-fields">
                <div className="net-price-row">
                  <NumberInput
                    label="Offer Price"
                    prefix="$"
                    suffix="USD"
                    value={autoOfferPrice}
                    onChange={handleAutoOfferPriceChange}
                  />
                  <div className="dropdown-container">
                    <label className="dropdown-label">Discount (Off List Price)</label>
                    <select
                      className="discount-dropdown"
                      value={autoOfferDiscount}
                      onChange={(e) => handleAutoOfferDiscountChange(Number(e.target.value))}
                    >
                      {[10, 15, 20, 25, 30, 35, 40, 45, 50].map(percent => (
                        <option key={percent} value={percent}>{percent}%</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-section" id="shipping-section">
        <h3>Shipping & Handling</h3>

        <ConditionDropdown
          label="Inventory Location"
          value={inventoryLocation}
          conditions={[
            {
              name: 'Seller Storefront (Default)',
              description: '383 North Indian Canyon Drive Palm Springs CA 92262'
            },
            {
              name: 'Warehouse - East Coast',
              description: '1247 Commerce Street Brooklyn NY 11222'
            },
            {
              name: 'Warehouse - West Coast',
              description: '5890 Industrial Blvd Los Angeles CA 90058'
            }
          ]}
          onChange={setInventoryLocation}
          placeholder="Select inventory location"
          showSublineInField={true}
        />

        <PackageDimensions
          packages={packages}
          onPackageChange={handlePackageChange}
          onAddPackage={handleAddPackage}
          onDeletePackage={handleDeletePackage}
        />

        <ShippingQuotes
          zones={shippingZones}
          onShippingPriceChange={handleShippingPriceChange}
          onShippingMethodChange={handleShippingMethodChange}
        />

        <SearchableDropdown
          label="Handling Time"
          value={handlingTime}
          onChange={setHandlingTime}
          options={Array.from({ length: 10 }, (_, i) => i + 1).map(days => ({
            value: days.toString(),
            label: `${days} Business ${days === 1 ? 'Day' : 'Days'}`
          }))}
          placeholder="Select handling time"
        />

        <ConditionDropdown
          label="Return Policy"
          value={returnPolicy}
          conditions={[
            {
              name: 'All Sales Final',
              description: '25% Restocking Fee | Buyer pays return shipping | All sales are final for new, customized or made to order items.'
            },
            {
              name: '14-Day Returns',
              description: 'Free returns within 14 days | Buyer pays return shipping | Item must be in original condition with tags attached.'
            },
            {
              name: '30-Day Returns',
              description: 'Free returns within 30 days | Seller covers return shipping | Full refund if item is not as described.'
            }
          ]}
          onChange={setReturnPolicy}
          placeholder="Select return policy"
          showSublineInField={true}
        />
      </div>

      <div className="form-section" id="internal-notes-section">
        <h3>Internal Notes & Documents</h3>

        <TextInput
          label="Soho Antiques's Reference"
          value={referenceNumber}
          onChange={setReferenceNumber}
          placeholder="Enter reference number"
        />

        <Textarea
          label="Soho Antiques's Internal Notes"
          value={internalNotes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInternalNotes(e.target.value)}
          placeholder="Enter internal notes"
          rows={6}
        />
      </div>
      </div>
    </>
  )
}

export default ItemUploadFormJewelry
