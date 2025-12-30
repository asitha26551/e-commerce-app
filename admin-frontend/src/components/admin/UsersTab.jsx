import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';

export function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/user/all`, {
          headers: { token }
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          setError('Failed to fetch users');
        }
      } catch {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto"
    >
      {loading ? (
        <div className="p-8 text-text-secondary">Loading users...</div>
      ) : error ? (
        <div className="p-8 text-error">{error}</div>
      ) : (
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
                  key={user._id}
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
                          ID: {user._id}
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
                        user.role === 'admin'
                          ? 'bg-primary/20 text-primary border border-primary/40'
                          : 'bg-background text-text-secondary border border-border'
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-success/20 text-success border border-success/50'
                          : user.status === 'inactive'
                          ? 'bg-yellow-500/20 text-yellow-700 border border-yellow-500/50'
                          : 'bg-border/40 text-text-secondary border border-border'
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-center h-full min-h-[48px]">
                      <button
                        className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/80 mx-auto"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '32px' }}
                        onClick={async () => {
                          const token = localStorage.getItem('admin_token');
                          const newStatus = user.status === 'active' ? 'inactive' : 'active';
                          try {
                            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/user/status`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                                token
                              },
                              body: JSON.stringify({ userId: user._id, status: newStatus })
                            });
                            const data = await res.json();
                            if (data.success) {
                              setUsers(users => users.map(u => u._id === user._id ? { ...u, status: newStatus } : u));
                            }
                          } catch {}
                        }}
                      >
                        Update
                      </button>
                    </div>
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
      )}
    </motion.div>
  )
}
