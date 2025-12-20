import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'

import { DashboardHeader } from '../components/admin/DashboardHeader'
import { DashboardTabs } from '../components/admin/DashboardTabs'
import { ProductsTab } from '../components/admin/ProductsTab'
import { OrdersTab } from '../components/admin/OrdersTab'
import { CategoriesTab } from '../components/admin/CategoriesTab'
import { UsersTab } from '../components/admin/UsersTab'
import { AddProductModal } from '../components/admin/AddProductModal'

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('products')
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <DashboardHeader
          activeTab={activeTab}
          onAddProduct={() => setIsAddProductOpen(true)}
        />

        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="bg-white rounded-xl border min-h-[400px] overflow-hidden">
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'categories' && <CategoriesTab />}
          {activeTab === 'users' && <UsersTab />}
        </div>
      </main>

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />

      <Footer />
    </div>
  )
}
