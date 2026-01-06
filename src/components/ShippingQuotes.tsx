import './ShippingQuotes.css'

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
            <div className="shipping-dropdown-field">
              <label className="shipping-dropdown-label">Shipping Price</label>
              <select
                className="shipping-dropdown"
                value={zone.shippingPrice}
                onChange={(e) => onShippingPriceChange(zone.region, e.target.value)}
              >
                <option value="calculated">Buyer Will Pay - Calculated Shipping</option>
                <option value="free">Free Shipping</option>
                <option value="flat">Flat Rate Shipping</option>
              </select>
            </div>

            <div className="shipping-dropdown-field">
              <label className="shipping-dropdown-label">Shipping Method</label>
              <select
                className="shipping-dropdown"
                value={zone.shippingMethod}
                onChange={(e) => onShippingMethodChange(zone.region, e.target.value)}
              >
                <option value="fedex-standard">Fedex Standard Parcel (3-7 Days)</option>
                <option value="fedex-express">Fedex Express (2-3 Days)</option>
                <option value="fedex-overnight">Fedex Overnight</option>
                <option value="ups-ground">UPS Ground</option>
                <option value="ups-express">UPS Express</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShippingQuotes
