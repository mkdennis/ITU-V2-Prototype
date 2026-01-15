import '../App.css'
import { categoriesByVertical } from '../data/formOptions'
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
import AISuggestion from './AISuggestion'
import AISuggestionsBanner from './AISuggestionsBanner'
import PackageDimensions from './PackageDimensions'
import ShippingQuotes from './ShippingQuotes'
import { useState, useEffect } from 'react'
import type { AISuggestions } from '../types/aiSuggestions'

interface ItemUploadFormArtProps {
  aiAssistEnabled?: boolean
  aiSuggestions?: AISuggestions
}

function ItemUploadFormArt({ aiAssistEnabled = false, aiSuggestions = {} }: ItemUploadFormArtProps) {
  const [creationYear, setCreationYear] = useState<string>('')
  const [period, setPeriod] = useState<string>('')
  const [medium, setMedium] = useState<string>('')
  const [condition, setCondition] = useState<string>('')
  const [conditionComments, setConditionComments] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [attribution, setAttribution] = useState<string>('')
  const [artist, setArtist] = useState<string>('')
  const [artistUnknown, setArtistUnknown] = useState<boolean>(false)
  const [frameIncluded, setFrameIncluded] = useState<boolean>(false)
  const [framingOptionsAvailable, setFramingOptionsAvailable] = useState<boolean>(false)
  const [style, setStyle] = useState<string>('')
  const [unlimitedQuantity, setUnlimitedQuantity] = useState<boolean>(false)
  const [showSizesAndEditions, setShowSizesAndEditions] = useState<boolean>(false)
  const [sizesAndEditions, setSizesAndEditions] = useState<Array<{ size: string; price: number }>>([
    { size: '', price: 0 }
  ])
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

  // Handle sizes and editions changes
  const handleSizeEditionChange = (index: number, field: 'size' | 'price', value: string | number) => {
    const newSizesAndEditions = [...sizesAndEditions]
    newSizesAndEditions[index][field] = value as never
    setSizesAndEditions(newSizesAndEditions)
  }

  const handleAddSizeEdition = () => {
    setSizesAndEditions([...sizesAndEditions, { size: '', price: 0 }])
  }

  const handleDeleteSizeEdition = (index: number) => {
    if (sizesAndEditions.length > 1) {
      const newSizesAndEditions = sizesAndEditions.filter((_, i) => i !== index)
      setSizesAndEditions(newSizesAndEditions)
    }
  }

  const mediumOptions = [
    { value: 'acrylic', label: 'Acrylic' },
    { value: 'bronze', label: 'Bronze' },
    { value: 'ceramic', label: 'Ceramic' },
    { value: 'charcoal', label: 'Charcoal' },
    { value: 'collage', label: 'Collage' },
    { value: 'digital', label: 'Digital' },
    { value: 'encaustic', label: 'Encaustic' },
    { value: 'etching', label: 'Etching' },
    { value: 'glass', label: 'Glass' },
    { value: 'gouache', label: 'Gouache' },
    { value: 'graphite', label: 'Graphite' },
    { value: 'ink', label: 'Ink' },
    { value: 'lithograph', label: 'Lithograph' },
    { value: 'marble', label: 'Marble' },
    { value: 'mixed-media', label: 'Mixed Media' },
    { value: 'oil', label: 'Oil' },
    { value: 'offset-print', label: 'Offset Print' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'photography', label: 'Photography' },
    { value: 'porcelain', label: 'Porcelain' },
    { value: 'print', label: 'Print' },
    { value: 'screenprint', label: 'Screenprint' },
    { value: 'sculpture', label: 'Sculpture' },
    { value: 'stone', label: 'Stone' },
    { value: 'tempera', label: 'Tempera' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'wood', label: 'Wood' }
  ]

  const weightOptions = [
    { value: 'less-40', label: 'Less than 40 lbs (<18 kilos)' },
    { value: '40-70', label: 'Between 40-70 lbs (18-31 kilos)' },
    { value: '70-200', label: 'Between 70-200 lbs (31-90 kilos)' },
    { value: 'more-200', label: 'More than 200 lbs (90+ kilos)' }
  ]

  const attributionOptions = [
    { value: 'attributed-to', label: 'Attributed To' },
    { value: 'by', label: 'By' },
    { value: 'after', label: 'After' },
    { value: 'circle-of', label: 'Circle of' },
    { value: 'school-of', label: 'School of' },
    { value: 'style-of', label: 'In the Style of' },
    { value: 'manner-of', label: 'In the Manner of' },
    { value: 'follower-of', label: 'Follower of' }
  ]

  const artistOptions = [
    { value: 'pablo-picasso', label: 'Pablo Picasso' },
    { value: 'andy-warhol', label: 'Andy Warhol' },
    { value: 'jean-michel-basquiat', label: 'Jean-Michel Basquiat' },
    { value: 'keith-haring', label: 'Keith Haring' },
    { value: 'banksy', label: 'Banksy' },
    { value: 'salvador-dali', label: 'Salvador Dalí' },
    { value: 'roy-lichtenstein', label: 'Roy Lichtenstein' },
    { value: 'david-hockney', label: 'David Hockney' },
    { value: 'gerhard-richter', label: 'Gerhard Richter' },
    { value: 'yayoi-kusama', label: 'Yayoi Kusama' },
    { value: 'damien-hirst', label: 'Damien Hirst' },
    { value: 'takashi-murakami', label: 'Takashi Murakami' },
    { value: 'kaws', label: 'KAWS' },
    { value: 'joan-miro', label: 'Joan Miró' },
    { value: 'mark-rothko', label: 'Mark Rothko' },
    { value: 'jasper-johns', label: 'Jasper Johns' },
    { value: 'robert-rauschenberg', label: 'Robert Rauschenberg' },
    { value: 'francis-bacon', label: 'Francis Bacon' },
    { value: 'lucian-freud', label: 'Lucian Freud' },
    { value: 'jackson-pollock', label: 'Jackson Pollock' },
    { value: 'walasse-ting', label: 'Walasse Ting' }
  ]

  const styleOptions = [
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
    { value: 'victorian', label: 'Victorian' }
  ]

  // Use Art-specific categories from centralized data
  const artCategories = categoriesByVertical.Art

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

  const periods = [
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
    '16th Century'
  ]

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

  const handleCreationYearBlur = (value: string) => {
    calculatePeriod(value)
  }

  const applyAllSuggestions = () => {
    // Apply title
    if (aiSuggestions.title && !title) {
      setTitle(aiSuggestions.title)
    }

    // Apply period
    if (aiSuggestions.period && !period) {
      setPeriod(aiSuggestions.period)
    }

    // Apply condition
    if (aiSuggestions.condition && !condition) {
      setCondition(aiSuggestions.condition)
    }
  }

  return (
    <>
      <NavigationHeader />
      <div className="app">
        {aiAssistEnabled && (
          <AISuggestionsBanner onApplyAll={applyAllSuggestions} />
        )}
        <div className="form-section" id="basic-information-section">
          <h3>Basic Information</h3>
        <div className="category-field-wrapper">
          <SearchableCategoryDropdown
            label="Category *"
            placeholder="Select a category"
            categories={artCategories}
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
          categories={artCategories}
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
        <div className="form-row" style={{ alignItems: 'flex-end' }}>
          <div style={{ flex: '0 0 35%' }}>
            <SearchableDropdown
              label="Artist"
              placeholder="Select an attribution"
              options={attributionOptions}
              value={attribution}
              onChange={setAttribution}
              disabled={artistUnknown}
            />
          </div>
          <div style={{ flex: '1' }}>
            <SearchableDropdown
              placeholder="Search for artist"
              options={artistOptions}
              value={artist}
              onChange={setArtist}
              disabled={artistUnknown}
            />
          </div>
        </div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={artistUnknown}
            onChange={(e) => {
              setArtistUnknown(e.target.checked)
              if (e.target.checked) {
                setAttribution('')
                setArtist('')
              }
            }}
          />
          <span>The artist for this item is unknown</span>
        </label>
        <div className="form-row">
          <TextInput
            label="Creation Year *"
            value={creationYear}
            onChange={setCreationYear}
            onBlur={handleCreationYearBlur}
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
        <SearchableDropdown
          label="Medium *"
          placeholder="Select medium"
          options={mediumOptions}
          value={medium}
          onChange={setMedium}
        />
        <div>
          <p className="optional-fields-label" style={{ marginTop: '16px', marginBottom: '8px' }}>Framing</p>
          <label className="checkbox-label" style={{ marginBottom: '12px' }}>
            <input
              type="checkbox"
              className="checkbox-input"
              checked={frameIncluded}
              onChange={(e) => setFrameIncluded(e.target.checked)}
            />
            <span>Frame Included</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={framingOptionsAvailable}
              onChange={(e) => setFramingOptionsAvailable(e.target.checked)}
            />
            <span>Framing Options Available</span>
          </label>
        </div>
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
        <SearchableDropdown
          label="Weight"
          placeholder="Select weight"
          options={weightOptions}
        />
        <div className="divider"></div>
        <p className="optional-fields-label">Additional Fields</p>
        <p className="additional-fields-subtext">Adding more fields helps your item get discovered</p>
        <SearchableDropdown
          label="Style"
          placeholder="Select style"
          options={styleOptions}
          value={style}
          onChange={setStyle}
        />
        <label className="checkbox-label" style={{ marginTop: '16px' }}>
          <input
            type="checkbox"
            className="checkbox-input"
            checked={showSizesAndEditions}
            onChange={(e) => setShowSizesAndEditions(e.target.checked)}
          />
          <span>Add More Sizes and Editions</span>
        </label>
        {showSizesAndEditions && (
          <div style={{ marginTop: '4px' }}>
            {sizesAndEditions.map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ flex: '1' }}>
                  <TextInput
                    label="Size and Edition"
                    placeholder="e.g. 16 x 20, Edition of 50"
                    value={item.size}
                    onChange={(value) => handleSizeEditionChange(index, 'size', value)}
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <NumberInput
                    label="Price"
                    placeholder="Enter amount"
                    prefix="$"
                    suffix="USD"
                    value={item.price}
                    onChange={(value) => handleSizeEditionChange(index, 'price', value)}
                  />
                </div>
                {sizesAndEditions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteSizeEdition(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '20px',
                      padding: '8px'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="link-button"
              onClick={handleAddSizeEdition}
            >
              Add Size and Edition
            </button>
          </div>
        )}
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
          <div className="divider"></div>
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

export default ItemUploadFormArt
