import { Link } from 'react-router-dom'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { backendUrl } from '../App';
import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAdminAuth } from '../context/AdminAuthContext';

export function LoginPage() {
  const { dispatch } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + 'api/user/admin', { email, password });
      if(response.data.success){
        dispatch({ type: 'LOGIN', token: response.data.token });
      } else {
        toast.error('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.log('Axios error:', error);
      toast.error('An error occurred during login. Please try again.');
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <main className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-accent hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <div className="space-y-4">
            <Input onChange={(e) => setEmail(e.target.value)} value={email}
              label="Email address"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
            <Input onChange={(e) => setPassword(e.target.value)} value={password}
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-accent hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full">
            Sign in
          </Button>
        </form>
      </main>
    </div>
  )
}
