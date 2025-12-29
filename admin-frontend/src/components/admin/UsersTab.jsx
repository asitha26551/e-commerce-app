import React from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'

export function UsersTab({ users = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto"
    >
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface">
          <tr>
            {['User', 'Email', 'Role', 'Status', 'Actions'].map((col) => (
              <th
                key={col}
                className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-surface divide-y divide-border">
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-background/60 transition-colors"
              >
                {/* User */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-sm shadow-neon-purple">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text">
                        {user.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        ID: {user.id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {user.email}
                </td>

                {/* Role */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'Admin'
                        ? 'bg-primary/20 text-primary border border-primary/40'
                        : 'bg-background text-text-secondary border border-border'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full ${
                      user.status === 'Active'
                        ? 'bg-success/20 text-success border border-success/50'
                        : 'bg-border/40 text-text-secondary border border-border'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-text-secondary hover:text-accent mr-3">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-text-secondary hover:text-error">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-8 text-text-secondary">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
