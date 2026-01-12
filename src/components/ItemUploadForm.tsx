import type { Vertical } from '../types/vertical'
import type { AISuggestions } from '../types/aiSuggestions'
import ItemUploadFormFurniture from './ItemUploadFormFurniture'
import ItemUploadFormArt from './ItemUploadFormArt'
import ItemUploadFormFashion from './ItemUploadFormFashion'
import ItemUploadFormJewelry from './ItemUploadFormJewelry'

interface ItemUploadFormProps {
  aiAssistEnabled?: boolean
  aiSuggestions?: AISuggestions
  vertical?: Vertical
}

function ItemUploadForm({ aiAssistEnabled = false, aiSuggestions = {}, vertical = 'furniture' }: ItemUploadFormProps) {
  switch (vertical) {
    case 'art':
      return <ItemUploadFormArt aiAssistEnabled={aiAssistEnabled} aiSuggestions={aiSuggestions} />
    case 'fashion':
      return <ItemUploadFormFashion aiAssistEnabled={aiAssistEnabled} aiSuggestions={aiSuggestions} />
    case 'jewelry':
      return <ItemUploadFormJewelry aiAssistEnabled={aiAssistEnabled} aiSuggestions={aiSuggestions} />
    case 'furniture':
    default:
      return <ItemUploadFormFurniture aiAssistEnabled={aiAssistEnabled} aiSuggestions={aiSuggestions} />
  }
}

export default ItemUploadForm
