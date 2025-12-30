import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { registerUser } from '../services/api'

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser(name, email, undefined, password, undefined);
      if (res.data.success) {
        setSuccess('Registration successful! You can now log in.');
        setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
      } else {
        setError(res.data.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-accent dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">Sign in</Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input label="Full Name" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
              <Input label="Email address" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
              <Input label="Password" type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
              <Input label="Confirm Password" type="password" required placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
            <div className="flex items-center">
              <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800" required />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                I agree to the{' '}
                <a href="#" className="text-accent dark:text-blue-400 hover:underline">Terms and Conditions</a>
              </label>
            </div>
            {error && <div className="text-error dark:text-red-400 text-sm text-center">{error}</div>}
            {success && <div className="text-success dark:text-green-400 text-sm text-center">{success}</div>}
            <Button type="submit" fullWidth size="lg" disabled={loading} className="bg-primary dark:bg-blue-600 hover:bg-primary/90 dark:hover:bg-blue-700 text-white">{loading ? 'Creating...' : 'Create Account'}</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
