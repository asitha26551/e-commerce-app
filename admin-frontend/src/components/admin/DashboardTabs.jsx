import { motion } from 'framer-motion'
import { Package, ShoppingBag, Tag, Users } from 'lucide-react'

const tabs = [
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'categories', label: 'Categories', icon: Tag },
  { id: 'users', label: 'Users', icon: Users },
]

export function DashboardTabs({ activeTab, setActiveTab }) {
  return (
    <div className="bg-surface border border-border rounded-xl mb-8 overflow-hidden shadow-neon-purple/10">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-4 flex items-center text-sm font-medium
              ${activeTab === tab.id ? 'text-primary' : 'text-text-secondary hover:text-text'}
            `}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.label}

            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-neon-purple"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
