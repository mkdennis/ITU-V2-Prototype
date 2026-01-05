import './RecommendedPriceBanner.css'

interface RecommendedPriceBannerProps {
  recommendedPrice: number
  priceRange: { min: number; max: number }
  salesLikelihood: number
  onApply?: () => void
}

function RecommendedPriceBanner({ 
  recommendedPrice, 
  priceRange, 
  salesLikelihood,
  onApply 
}: RecommendedPriceBannerProps) {
  return (
    <div className="recommended-price-banner">
      <div className="recommended-price-row">
        <div className="recommended-price-section">
          <label className="recommended-price-label">Recommended</label>
          <div className="recommended-price-value-row">
            <span className="recommended-price-value">${recommendedPrice.toLocaleString()}</span>
            {onApply && (
              <button className="link-button" onClick={onApply}>
                Apply
              </button>
            )}
          </div>
        </div>
        <div className="recommended-price-range-section">
          <label className="recommended-price-label">Recommended Price Range</label>
          <span className="recommended-price-range-value">
            ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}
          </span>
        </div>
      </div>
      <p className="recommended-price-info">
        Items priced within or below the recommended range are {salesLikelihood}% more likely to sell.
      </p>
    </div>
  )
}

export default RecommendedPriceBanner

