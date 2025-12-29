import React, { useState, useEffect } from 'react'
import { User, Lock, LogOut } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import api from '../services/api'

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState('')
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' })
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [profileSuccess, setProfileSuccess] = useState('')
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
  ]

  useEffect(() => {
    // Fetch current user profile on mount
    const fetchProfile = async () => {
      setProfileLoading(true)
      setProfileError('')
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/user/me', { headers: { token } })
        if (res.data?.success && res.data.user) {
          const { name, email, phone } = res.data.user
          setProfile({ name: name || '', email: email || '', phone: phone || '' })
        } else {
          setProfileError(res.data?.msg || 'Failed to load profile')
        }
      } catch (err) {
        setProfileError(err?.response?.data?.message || 'Failed to load profile')
      }
      setProfileLoading(false)
    }

    fetchProfile()
  }, [])

  const handleProfileChange = (field) => (e) => {
    setProfile({ ...profile, [field]: e.target.value })
  }

  const handlePasswordChange = (field) => (e) => {
    setPasswords({ ...passwords, [field]: e.target.value })
  }

  const handleProfileSave = async () => {
    setProfileLoading(true)
    setProfileError('')
    setProfileSuccess('')
    try {
      const token = localStorage.getItem('token')
      const res = await api.put(
        '/user/me',
        {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
        },
        { headers: { token } }
      )
      if (res.data?.success) {
        const { name, email, phone } = res.data.user || {}
        setProfile({ name: name || '', email: email || '', phone: phone || '' })
        setProfileSuccess(res.data.msg || 'Profile updated successfully')
      } else {
        setProfileError(res.data?.message || res.data?.msg || 'Failed to update profile')
      }
    } catch (err) {
      setProfileError(err?.response?.data?.message || 'Failed to update profile')
    }
    setProfileLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center mb-8">
          <User className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-display font-bold text-white">
            MY <span className="text-primary">ACCOUNT</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1 bg-surface p-4 rounded-lg border border-border shadow-neon-purple/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors border ${
                    activeTab === tab.id
                      ? 'bg-primary/10 border-primary text-primary shadow-neon-purple'
                      : 'border-transparent text-gray-300 hover:bg-background/60 hover:text-white'
                  }`}
                >
                  <tab.icon className="mr-3 h-5 w-5" />
                  {tab.label}
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-error hover:bg-error/10 hover:border-error/40 rounded-md transition-colors border border-transparent">
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 bg-surface rounded-lg border border-border shadow-neon-purple/20 p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-white mb-6 border-b border-border pb-4">
                  PROFILE INFORMATION
                </h2>
                {profileError && (
                  <p className="text-sm text-error">{profileError}</p>
                )}
                {profileSuccess && (
                  <p className="text-sm text-success">{profileSuccess}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    value={profile.name}
                    onChange={handleProfileChange('name')}
                    className="md:col-span-2"
                  />
                  <Input
                    label="Email"
                    value={profile.email}
                    onChange={handleProfileChange('email')}
                    className="md:col-span-2"
                  />
                  <Input
                    label="Phone"
                    value={profile.phone}
                    onChange={handleProfileChange('phone')}
                  />
                </div>
                <Button onClick={handleProfileSave} disabled={profileLoading}>
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-white mb-6 border-b border-border pb-4">
                  CHANGE PASSWORD
                </h2>
                <div className="max-w-md space-y-4">
                  {passwordError && (
                    <p className="text-sm text-error">{passwordError}</p>
                  )}
                  {passwordSuccess && (
                    <p className="text-sm text-success">{passwordSuccess}</p>
                  )}
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwords.current}
                    onChange={handlePasswordChange('current')}
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={passwords.next}
                    onChange={handlePasswordChange('next')}
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwords.confirm}
                    onChange={handlePasswordChange('confirm')}
                  />
                  <Button
                    onClick={async () => {
                      setPasswordError('')
                      setPasswordSuccess('')

                      if (!passwords.current || !passwords.next || !passwords.confirm) {
                        setPasswordError('Please fill in all password fields')
                        return
                      }

                      if (passwords.next.length < 8) {
                        setPasswordError('New password must be at least 8 characters')
                        return
                      }

                      if (passwords.next !== passwords.confirm) {
                        setPasswordError('New password and confirmation do not match')
                        return
                      }

                      try {
                        setPasswordLoading(true)
                        const token = localStorage.getItem('token')
                        const res = await api.put(
                          '/user/password',
                          {
                            currentPassword: passwords.current,
                            newPassword: passwords.next,
                          },
                          { headers: { token } }
                        )

                        if (res.data?.success) {
                          setPasswordSuccess(res.data.msg || 'Password updated successfully')
                          setPasswords({ current: '', next: '', confirm: '' })
                        } else {
                          setPasswordError(res.data?.msg || res.data?.message || 'Failed to update password')
                        }
                      } catch (err) {
                        setPasswordError(
                          err?.response?.data?.msg ||
                            err?.response?.data?.message ||
                            'Failed to update password'
                        )
                      } finally {
                        setPasswordLoading(false)
                      }
                    }}
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
