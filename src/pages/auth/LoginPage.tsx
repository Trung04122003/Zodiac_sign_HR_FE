import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Card } from '@/components/common/CardAndModal';

// Validation Schema
const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sagittarius flex items-center justify-center p-4">
      {/* Floating stars animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card padding="none" className="overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-sagittarius text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-5xl">♐</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Zodiac HR Management</h1>
            <p className="text-sagittarius-100 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Aim High, Lead with Optimism!
              <Sparkles className="w-4 h-4" />
            </p>
            <p className="text-sm text-sagittarius-100 mt-2">JCI Danang Junior Club</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  {...register('username')}
                  label="Username"
                  placeholder="Enter your username"
                  error={errors.username?.message}
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              <div>
                <Input
                  {...register('password')}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                leftIcon={!isLoading && <LogIn className="w-5 h-5" />}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-sagittarius-50 rounded-lg border border-sagittarius-200">
              <p className="text-sm font-medium text-sagittarius-800 mb-2">Demo Credentials:</p>
              <div className="text-xs text-sagittarius-600 space-y-1">
                <p>Username: <span className="font-mono font-semibold">admin</span></p>
                <p>Password: <span className="font-mono font-semibold">password123</span></p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              © 2024 JCI Danang Junior Club. All rights reserved.
            </p>
          </div>
        </Card>

        {/* Version badge */}
        <div className="text-center mt-4">
          <span className="text-white text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm">
            v1.0.0 - Sagittarius Edition ♐
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;