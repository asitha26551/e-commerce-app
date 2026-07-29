import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { registerUser } from '../services/api'
import { UserPlus } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 scan-lines pointer-events-none"></div>

        <div className="max-w-md w-full space-y-8 bg-surface/90 backdrop-blur-md p-8 rounded-lg shadow-neon-purple border border-border relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-background p-3 rounded-full border border-primary shadow-neon-purple">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-display font-bold text-white">CREATE ACCOUNT</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-accent hover:text-white transition-colors">
                sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input label="FULL NAME" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
              <Input label="EMAIL ADDRESS" type="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              <Input label="PASSWORD" type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              <Input label="CONFIRM PASSWORD" type="password" required placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <div className="flex items-center">
              <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-border rounded bg-background" required />
              <label htmlFor="terms" className="ml-2 block text-sm text-text-secondary">
                I agree to the{' '}
                <a href="#" className="text-accent hover:text-white transition-colors">Terms and Conditions</a>
              </label>
            </div>

            {error && <div className="text-error text-sm text-center">{error}</div>}
            {success && <div className="text-success text-sm text-center">{success}</div>}

            <Button type="submit" fullWidth size="lg" variant="cta" disabled={loading}>
              {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
