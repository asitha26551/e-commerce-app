import { Plus, Search } from 'lucide-react'
import { Button } from '../ui/Button'

export function DashboardHeader({ activeTab, onAddProduct }) {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">ADMIN DASHBOARD</h1>
        <p className="text-text-secondary">Monitor and control your store in real time.</p>
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <input
            placeholder="Search..."
            className="pl-9 pr-4 py-2 w-full md:w-64 rounded-md border border-border bg-background text-text placeholder-text-secondary/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {activeTab === 'products' && (
          <Button onClick={onAddProduct} variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        )}
      </div>
    </div>
  )
}
