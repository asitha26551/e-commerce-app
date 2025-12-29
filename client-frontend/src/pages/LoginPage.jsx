import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Gamepad2 } from 'lucide-react'
import { loginUser } from '../services/api'

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        setError(res.data.msg || 'Login failed.');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 scan-lines pointer-events-none"></div>

        <div className="max-w-md w-full space-y-8 bg-surface/90 backdrop-blur-md p-8 rounded-lg shadow-neon-purple border border-border relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-background p-3 rounded-full border border-primary shadow-neon-purple">
                <Gamepad2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-display font-bold text-white">
              PLAYER LOGIN
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-accent hover:text-white transition-colors"
              >
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="EMAIL ADDRESS"
                type="email"
                autoComplete="email"
                required
                placeholder="player@gamezone.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="PASSWORD"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded bg-background"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-text-secondary"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-accent hover:text-white transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {error && (
              <div className="text-error text-sm text-center">{error}</div>
            )}

            <Button type="submit" fullWidth size="lg" variant="cta" disabled={loading}>
              {loading ? 'Signing in...' : 'START GAME'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-text-secondary">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" type="button" className="w-full">
                Google
              </Button>
              <Button variant="secondary" type="button" className="w-full">
                Steam
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
