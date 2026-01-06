import './PackageDimensions.css'
import NumberInput from './NumberInput'

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
}

function PackageDimensions({ packages, onPackageChange, onAddPackage }: PackageDimensionsProps) {
  return (
    <div className="package-dimensions-container">
      {packages.map((pkg, index) => (
        <div key={index} className="package-box">
          <h4 className="package-title">Package {index + 1}</h4>

          <NumberInput
            label="Total Package Weight"
            suffix="lbs"
            placeholder="Enter weight"
            value={pkg.weight}
            onChange={(value) => onPackageChange(index, 'weight', value)}
          />

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

          <a href="#" className="dimensions-link">I don't know my packed dimensions</a>
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
