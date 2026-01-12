import type { Vertical } from '../types/vertical'
import ItemUploadFormFurniture from './ItemUploadFormFurniture'
import ItemUploadFormArt from './ItemUploadFormArt'
import ItemUploadFormFashion from './ItemUploadFormFashion'
import ItemUploadFormJewelry from './ItemUploadFormJewelry'

interface ItemUploadFormProps {
  aiAssistEnabled?: boolean
  vertical?: Vertical
}

function ItemUploadForm({ aiAssistEnabled = false, vertical = 'furniture' }: ItemUploadFormProps) {
  switch (vertical) {
    case 'art':
      return <ItemUploadFormArt aiAssistEnabled={aiAssistEnabled} />
    case 'fashion':
      return <ItemUploadFormFashion aiAssistEnabled={aiAssistEnabled} />
    case 'jewelry':
      return <ItemUploadFormJewelry aiAssistEnabled={aiAssistEnabled} />
    case 'furniture':
    default:
      return <ItemUploadFormFurniture aiAssistEnabled={aiAssistEnabled} />
  }
}

export default ItemUploadForm
