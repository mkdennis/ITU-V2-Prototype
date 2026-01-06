import './PackageDimensions.css'
import NumberInput from './NumberInput'
import { useState } from 'react'

interface Package {
  weight: number
  length: number
  width: number
  height: number
}

interface PackageDimensionsProps {
  packages: Package[]
  onPackageChange: (index: number, field: keyof Package, value: number) => void
  onAddPackage: () => void
  onDeletePackage: (index: number) => void
}

function PackageDimensions({ packages, onPackageChange, onAddPackage, onDeletePackage }: PackageDimensionsProps) {
  const [showEstimatedBanner, setShowEstimatedBanner] = useState<number[]>([])

  const handleDontKnowDimensions = (index: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Auto-fill with default values
    onPackageChange(index, 'weight', 3)
    onPackageChange(index, 'length', 7)
    onPackageChange(index, 'width', 7)
    onPackageChange(index, 'height', 7)
    // Show banner for this package
    if (!showEstimatedBanner.includes(index)) {
      setShowEstimatedBanner([...showEstimatedBanner, index])
    }
  }

  const handleDeleteClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onDeletePackage(index)
    // Remove banner state for deleted package
    setShowEstimatedBanner(showEstimatedBanner.filter(i => i !== index))
  }

  return (
    <div className="package-dimensions-container">
      {packages.map((pkg, index) => (
        <div key={index} className="package-box">
          <div className="package-header">
            <h4 className="package-title">Package {index + 1}</h4>
            {packages.length > 1 && (
              <button
                className="delete-package-button"
                onClick={(e) => handleDeleteClick(index, e)}
                aria-label="Delete package"
              >
                ✕
              </button>
            )}
          </div>

          <div className="weight-row">
            <NumberInput
              label="Total Package Weight"
              suffix="lbs"
              placeholder="Enter weight"
              value={pkg.weight}
              onChange={(value) => onPackageChange(index, 'weight', value)}
            />
          </div>

          <div className="dimensions-row">
            <NumberInput
              label="Package Length"
              suffix="in"
              placeholder=""
              value={pkg.length}
              onChange={(value) => onPackageChange(index, 'length', value)}
            />
            <NumberInput
              label="Package Width"
              suffix="in"
              placeholder=""
              value={pkg.width}
              onChange={(value) => onPackageChange(index, 'width', value)}
            />
            <NumberInput
              label="Package Height"
              suffix="in"
              placeholder=""
              value={pkg.height}
              onChange={(value) => onPackageChange(index, 'height', value)}
            />
          </div>

          {showEstimatedBanner.includes(index) && (
            <div className="estimated-dimensions-banner">
              Estimated dimensions may result in inaccurate shipping prices
            </div>
          )}

          <a
            href="#"
            className="dimensions-link"
            onClick={(e) => handleDontKnowDimensions(index, e)}
          >
            I don't know my packed dimensions
          </a>
        </div>
      ))}

      <div className="add-package-section">
        <p className="add-package-text">Shipping in Multiple Packages?</p>
        <button type="button" className="add-package-button" onClick={onAddPackage}>
          + Add Additional Package
        </button>
      </div>
    </div>
  )
}

export default PackageDimensions
