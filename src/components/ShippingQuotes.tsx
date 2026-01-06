import './ShippingQuotes.css'
import StandardDropdown from './StandardDropdown'

interface ShippingZone {
  region: string
  priceRange: { min: number; max: number }
  description: string
  shippingPrice: string
  shippingMethod: string
}

interface ShippingQuotesProps {
  zones: ShippingZone[]
  onShippingPriceChange: (region: string, value: string) => void
  onShippingMethodChange: (region: string, value: string) => void
}

const shippingPriceOptions = [
  { value: 'calculated', label: 'Buyer Will Pay - Calculated Shipping' },
  { value: 'free', label: 'Free Shipping' },
  { value: 'flat', label: 'Flat Rate Shipping' }
]

const shippingMethodOptions = [
  { value: 'fedex-standard', label: 'Fedex Standard Parcel (3-7 Days)' },
  { value: 'fedex-express', label: 'Fedex Express (2-3 Days)' },
  { value: 'fedex-overnight', label: 'Fedex Overnight' },
  { value: 'ups-ground', label: 'UPS Ground' },
  { value: 'ups-express', label: 'UPS Express' }
]

function ShippingQuotes({ zones, onShippingPriceChange, onShippingMethodChange }: ShippingQuotesProps) {
  return (
    <div className="shipping-quotes-container">
      {zones.map((zone) => (
        <div key={zone.region} className="shipping-quote-card">
          <div className="shipping-quote-header">
            <svg className="globe-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#222222" strokeWidth="2"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#222222" strokeWidth="2"/>
            </svg>
            <h4 className="shipping-quote-region">{zone.region}</h4>
          </div>

          <div className="buyer-will-pay-section">
            <p className="buyer-will-pay-label">Buyer Will Pay</p>
            <p className="price-range">${zone.priceRange.min.toFixed(2)}-${zone.priceRange.max.toFixed(2)}</p>
            <p className="shipping-description">{zone.description}</p>
          </div>

          <div className="shipping-dropdown-group">
            <StandardDropdown
              label="Shipping Price"
              placeholder="Select shipping price"
              value={zone.shippingPrice}
              onChange={(value) => onShippingPriceChange(zone.region, value)}
              options={shippingPriceOptions}
            />

            <StandardDropdown
              label="Shipping Method"
              placeholder="Select shipping method"
              value={zone.shippingMethod}
              onChange={(value) => onShippingMethodChange(zone.region, value)}
              options={shippingMethodOptions}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShippingQuotes
