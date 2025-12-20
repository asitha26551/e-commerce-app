import { Edit, Plus } from 'lucide-react'
import { categories } from '../../utils/mockData'

export function CategoriesTab() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(cat => (
        <div key={cat.id} className="border rounded-xl p-4 flex gap-4">
          <img src={cat.image} className="h-16 w-16 rounded" />
          <div className="flex-1">
            <h3 className="font-bold">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.itemCount} items</p>
          </div>
          <Edit className="h-4 w-4" />
        </div>
      ))}

      <button className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center">
        <Plus />
        Add Category
      </button>
    </div>
  )
}
