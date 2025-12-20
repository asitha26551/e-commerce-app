import { Plus, Search } from 'lucide-react'
import { Button } from '../ui/Button'

export function DashboardHeader({ activeTab, onAddProduct }) {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Manage your store efficiently</p>
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search..."
            className="pl-9 pr-4 py-2 border rounded-md w-full md:w-64"
          />
        </div>

        {activeTab === 'products' && (
          <Button onClick={onAddProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        )}
      </div>
    </div>
  )
}
