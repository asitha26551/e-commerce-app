import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

import { DashboardHeader } from '../components/admin/DashboardHeader'
import { DashboardTabs } from '../components/admin/DashboardTabs'
import { ProductsTab } from '../components/admin/ProductsTab'
import { OrdersTab } from '../components/admin/OrdersTab'
import { CategoriesTab } from '../components/admin/CategoriesTab'
import { UsersTab } from '../components/admin/UsersTab'

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('products')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <DashboardHeader
          activeTab={activeTab}
          onAddProduct={() => navigate('/products/new')}
        />

        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="bg-surface rounded-xl border border-border min-h-[400px] overflow-hidden shadow-neon-purple/20">
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'categories' && <CategoriesTab />}
          {activeTab === 'users' && <UsersTab />}
        </div>
      </main>

      <Footer />
    </div>
  )
}
