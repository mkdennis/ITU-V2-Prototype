import '../App.css'
import RadioButtonGroup from './RadioButtonGroup'
import NumberInput from './NumberInput'
import TextInput from './TextInput'
import Textarea from './Textarea'
import ImageUpload from './ImageUpload'
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

interface ItemUploadFormProps {
  aiAssistEnabled?: boolean
}

interface AISuggestions {
  title?: string
  materials?: string[]
  condition?: string
  period?: string
  style?: string
  placeOfOrigin?: string
}

function ItemUploadForm({ aiAssistEnabled = false }: ItemUploadFormProps) {
  const [dateOfManufacture, setDateOfManufacture] = useState<string>('')
  const [period, setPeriod] = useState<string>('')
  const [materials, setMaterials] = useState<string[]>([])
  const [condition, setCondition] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [style, setStyle] = useState<string>('')
  const [placeOfOrigin, setPlaceOfOrigin] = useState<string>('')
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
  const [inventoryLocation, setInventoryLocation] = useState<string>('')
  const [packages, setPackages] = useState<Array<{ weight: number; length: number; width: number; height: number }>>([
    { weight: 0, length: 0, width: 0, height: 0 }
  ])
  const [handlingTime, setHandlingTime] = useState<string>('')
  const [returnPolicy, setReturnPolicy] = useState<string>('')
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
    const newImages: string[] = []

    fileArray.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newImages.push(reader.result as string)
        if (newImages.length === fileArray.length) {
          setAdditionalImages((prev) => [...prev, ...newImages])
        }
      }
      reader.readAsDataURL(file)
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

  // Dummy AI suggestions
  const aiSuggestions: AISuggestions = aiAssistEnabled ? {
    title: 'Mid-Century Modern Walnut Coffee Table',
    materials: ['Walnut', 'Brass'],
    condition: 'Good',
    period: '1960-1969',
    style: 'mid-century-modern',
    placeOfOrigin: 'US'
  } : {}

  const materialOptions = [
    'Brass',
    'Bronze',
    'Cherry',
    'Fabric',
    'Glass',
    'Leather',
    'Mahogany',
    'Maple',
    'Marble',
    'Metal',
    'Oak',
    'Pine',
    'Rattan',
    'Solid Wood',
    'Steel',
    'Teak',
    'Velvet',
    'Veneer',
    'Walnut',
    'Wicker'
  ]

  const wearOptions = [
    { value: 'consistent', label: 'Wear consistent with age and use' },
    { value: 'minor-losses', label: 'Minor Losses' },
    { value: 'minor-structural', label: 'Minor Structural Damages' },
    { value: 'minor-fading', label: 'Minor Fading' }
  ]

  const restorationOptions = [
    { value: 'no', label: 'No restorations or modifications have been made' },
    { value: 'yes', label: 'Yes, restorations or modifications have been made' }
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
    { value: 'by-documented', label: 'By and Documented' },
    { value: 'style-of', label: 'In the Style of' },
    { value: 'unattributed', label: 'Unattributed' }
  ]

  const creatorOptions = [
    { value: 'charles-eames', label: 'Charles Eames' },
    { value: 'ray-eames', label: 'Ray Eames' },
    { value: 'hans-wegner', label: 'Hans Wegner' },
    { value: 'arne-jacobsen', label: 'Arne Jacobsen' },
    { value: 'george-nakashima', label: 'George Nakashima' },
    { value: 'mies-van-der-rohe', label: 'Mies van der Rohe' },
    { value: 'le-corbusier', label: 'Le Corbusier' },
    { value: 'isamu-noguchi', label: 'Isamu Noguchi' },
    { value: 'finn-juhl', label: 'Finn Juhl' },
    { value: 'eero-saarinen', label: 'Eero Saarinen' },
    { value: 'florence-knoll', label: 'Florence Knoll' },
    { value: 'marcel-breuer', label: 'Marcel Breuer' },
    { value: 'alvar-aalto', label: 'Alvar Aalto' },
    { value: 'wendell-castle', label: 'Wendell Castle' },
    { value: 'vladimir-kagan', label: 'Vladimir Kagan' },
    { value: 'paul-evans', label: 'Paul Evans' },
    { value: 'philippe-starck', label: 'Philippe Starck' },
    { value: 'ettore-sottsass', label: 'Ettore Sottsass' },
    { value: 'jean-prouve', label: 'Jean Prouvé' },
    { value: 'charlotte-perriand', label: 'Charlotte Perriand' }
  ]

  const roleOptions = [
    { value: 'artist', label: 'Artist' },
    { value: 'author', label: 'Author' },
    { value: 'designer', label: 'Designer' },
    { value: 'maker', label: 'Maker' }
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

  const countryOptions = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Algeria' },
    { value: 'AR', label: 'Argentina' },
    { value: 'AM', label: 'Armenia' },
    { value: 'AU', label: 'Australia' },
    { value: 'AT', label: 'Austria' },
    { value: 'AZ', label: 'Azerbaijan' },
    { value: 'BD', label: 'Bangladesh' },
    { value: 'BY', label: 'Belarus' },
    { value: 'BE', label: 'Belgium' },
    { value: 'BR', label: 'Brazil' },
    { value: 'BG', label: 'Bulgaria' },
    { value: 'KH', label: 'Cambodia' },
    { value: 'CA', label: 'Canada' },
    { value: 'CL', label: 'Chile' },
    { value: 'CN', label: 'China' },
    { value: 'CO', label: 'Colombia' },
    { value: 'HR', label: 'Croatia' },
    { value: 'CU', label: 'Cuba' },
    { value: 'CZ', label: 'Czech Republic' },
    { value: 'DK', label: 'Denmark' },
    { value: 'EG', label: 'Egypt' },
    { value: 'EE', label: 'Estonia' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'France' },
    { value: 'GE', label: 'Georgia' },
    { value: 'DE', label: 'Germany' },
    { value: 'GR', label: 'Greece' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'HU', label: 'Hungary' },
    { value: 'IS', label: 'Iceland' },
    { value: 'IN', label: 'India' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'IR', label: 'Iran' },
    { value: 'IQ', label: 'Iraq' },
    { value: 'IE', label: 'Ireland' },
    { value: 'IL', label: 'Israel' },
    { value: 'IT', label: 'Italy' },
    { value: 'JP', label: 'Japan' },
    { value: 'KZ', label: 'Kazakhstan' },
    { value: 'KE', label: 'Kenya' },
    { value: 'KR', label: 'South Korea' },
    { value: 'LV', label: 'Latvia' },
    { value: 'LT', label: 'Lithuania' },
    { value: 'LU', label: 'Luxembourg' },
    { value: 'MY', label: 'Malaysia' },
    { value: 'MX', label: 'Mexico' },
    { value: 'MA', label: 'Morocco' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'NO', label: 'Norway' },
    { value: 'PK', label: 'Pakistan' },
    { value: 'PE', label: 'Peru' },
    { value: 'PH', label: 'Philippines' },
    { value: 'PL', label: 'Poland' },
    { value: 'PT', label: 'Portugal' },
    { value: 'RO', label: 'Romania' },
    { value: 'RU', label: 'Russia' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'RS', label: 'Serbia' },
    { value: 'SG', label: 'Singapore' },
    { value: 'SK', label: 'Slovakia' },
    { value: 'SI', label: 'Slovenia' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'ES', label: 'Spain' },
    { value: 'SE', label: 'Sweden' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'TW', label: 'Taiwan' },
    { value: 'TH', label: 'Thailand' },
    { value: 'TR', label: 'Turkey' },
    { value: 'UA', label: 'Ukraine' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'VN', label: 'Vietnam' }
  ]

  const categories = [
    { l1: 'Decorative Objects', l2: 'Bowls and Baskets', l3: ['Bowls', 'Baskets', 'Trays'] },
    { l1: 'Decorative Objects', l2: 'Boxes', l3: ['Jewelry Boxes', 'Decorative Boxes', 'Storage Boxes'] },
    { l1: 'Decorative Objects', l2: 'Candle Holders', l3: ['Candelabras', 'Candle Lamps', 'Candle Sconces'] },
    { l1: 'Decorative Objects', l2: 'Clocks', l3: ['Wall Clocks', 'Mantle Clocks', 'Grandfather Clocks'] },
    { l1: 'Decorative Objects', l2: 'Desk Accessories', l3: ['Paperweights', 'Letter Holders', 'Pen Stands'] },
    { l1: 'Decorative Objects', l2: 'Picture Frames', l3: ['Table Frames', 'Wall Frames', 'Standing Frames'] },
    { l1: 'Decorative Objects', l2: 'Sculptures', l3: ['Abstract', 'Figurative', 'Busts'] },
    { l1: 'Decorative Objects', l2: 'Vases and Vessels', l3: ['Floor Vases', 'Table Vases', 'Urns'] },
    { l1: 'Lighting', l2: 'Chandeliers and Pendants', l3: ['Crystal Chandeliers', 'Modern Pendants', 'Vintage Chandeliers'] },
    { l1: 'Lighting', l2: 'Floor Lamps', l3: ['Arc Lamps', 'Torchiere', 'Reading Lamps'] },
    { l1: 'Lighting', l2: 'Flush Mount', l3: ['Ceiling Lights', 'Semi-Flush Mount', 'Recessed Lighting'] },
    { l1: 'Lighting', l2: 'Lanterns', l3: ['Outdoor Lanterns', 'Indoor Lanterns', 'Hanging Lanterns'] },
    { l1: 'Lighting', l2: 'Table Lamps', l3: ['Desk Lamps', 'Bedside Lamps', 'Accent Lamps'] },
    { l1: 'Lighting', l2: 'Wall Lights and Sconces', l3: ['Swing Arm Sconces', 'Candle Sconces', 'Picture Lights'] },
    { l1: 'Seating', l2: 'Dining Chairs', l3: ['Side Chairs', 'Arm Chairs', 'Bar Stools'] },
    { l1: 'Seating', l2: 'Stools', l3: ['Counter Stools', 'Footstools', 'Ottomans'] },
    { l1: 'Tables', l2: 'Vanities', l3: ['Makeup Vanities', 'Dressing Tables', 'Bathroom Vanities'] },
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
            categories={categories}
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
        <div className="form-row">
          <SearchableDropdown
            label="Wear"
            placeholder="Select wear"
            options={wearOptions}
            disabled={condition === 'New'}
          />
          <SearchableDropdown
            label="Restoration Work & Modifications *"
            placeholder="Select restoration work"
            options={restorationOptions}
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
        <SearchableDropdown
          label="Weight"
          placeholder="Select weight"
          options={weightOptions}
        />
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
            options={creatorOptions}
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
              options={styleOptions}
              value={style}
              onChange={setStyle}
            />
            {aiAssistEnabled && aiSuggestions.style && !style && (
              <AISuggestion
                suggestion={styleOptions.find(s => s.value === aiSuggestions.style)?.label || aiSuggestions.style}
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
            {additionalImages.length > 0 && (
              <div className="image-slots-grid">
                {additionalImages.map((image, index) => (
                  <UploadedImage
                    key={index}
                    src={image}
                    alt={`Additional image ${index + 1}`}
                    onDelete={() => handleAdditionalImageDelete(index)}
                    draggable={true}
                    onDragStart={() => handleImageDragStart(index)}
                    onDragOver={handleImageDragOver}
                    onDrop={() => handleImageDrop(index)}
                  />
                ))}
              </div>
            )}
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
              <NumberInput
                label="Net Price"
                prefix="$"
                suffix="USD"
                value={noNetDiscount ? 0 : netPrice}
                onChange={handleNetPriceChange}
                disabled={noNetDiscount}
              />
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
                  <NumberInput
                    label="Offer Price"
                    prefix="$"
                    suffix="USD"
                    value={autoOfferPrice}
                    onChange={handleAutoOfferPriceChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-section" id="shipping-section">
        <h3>Shipping & Handling</h3>

        <SearchableDropdown
          label="Inventory Location"
          value={inventoryLocation}
          options={[
            {
              value: 'storefront',
              label: 'Seller Storefront (Default)'
            }
          ]}
          onChange={setInventoryLocation}
          placeholder="Select inventory location"
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

        <SearchableDropdown
          label="Return Policy"
          value={returnPolicy}
          options={[
            {
              value: 'final',
              label: 'All Sales Final'
            }
          ]}
          onChange={setReturnPolicy}
          placeholder="Select return policy"
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

export default ItemUploadForm
