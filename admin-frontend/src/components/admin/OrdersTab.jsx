import { motion } from 'framer-motion'
import { MoreVertical } from 'lucide-react'
import { mockOrders as orders } from '../../utils/mockData'

export function OrdersTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Order ID', 'Date', 'Total', 'Status', 'Actions'].map(h => (
              <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {orders.map(order => (
            <tr key={order.id}>
              <td className="px-6 py-4 text-blue-600">{order.id}</td>
              <td className="px-6 py-4">{new Date(order.date).toLocaleString()}</td>
              <td className="px-6 py-4">${order.total.toFixed(2)}</td>
              <td className="px-6 py-4">{order.status}</td>
              <td className="px-6 py-4">
                <MoreVertical className="h-4 w-4" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
