import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LogIn, Sparkles, Flame, Target } from 'lucide-react';
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
      navigate('/dashboard', { replace: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient-shift" />
      
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Shooting Stars */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            animation: `shootingStar ${3 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute text-white animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 8 + 4}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Galloping Horses Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`horse-${i}`}
            className="absolute bottom-8 text-6xl opacity-70"
            style={{
              animation: `gallop ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 3}s`,
            }}
          >
            🐴
          </div>
        ))}
      </div>

      {/* Fire Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`fire-${i}`}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-20px',
            animation: `fireRise ${4 + Math.random() * 3}s ease-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {['🔥', '✨', '💫', '⭐'][Math.floor(Math.random() * 4)]}
        </div>
      ))}

      {/* Sagittarius Archer Silhouette (Left) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
        <div className="text-9xl animate-float">🏹</div>
      </div>

      {/* Zodiac Wheel (Right) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
        <div className="text-9xl animate-spin-slow">☸</div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10 animate-scale-in">
        <Card padding="none" className="overflow-hidden shadow-2xl border-2 border-sagittarius-400 backdrop-blur-sm bg-white bg-opacity-95">
          {/* Header with Animated Gradient */}
          <div className="relative bg-gradient-to-r from-sagittarius-600 via-purple-600 to-pink-600 text-white p-8 text-center overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
            </div>

            {/* Floating Sagittarius Symbol */}
            <div className="relative flex justify-center mb-4">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-30 animate-float shadow-2xl">
                <span className="text-6xl animate-pulse">♐</span>
              </div>
            </div>

            {/* Title with glow effect */}
            <h1 className="text-4xl font-bold mb-3 drop-shadow-lg tracking-wider">
              Zodiac HR
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 animate-pulse" />
              <p className="text-lg font-semibold">
                Aim High, Lead with Optimism!
              </p>
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            
            <p className="text-sm text-white text-opacity-90 flex items-center justify-center gap-2">
              <Target className="w-4 h-4" />
              JCI Danang Junior Club
            </p>

            {/* Decorative elements */}
            <div className="absolute top-2 left-2 text-4xl opacity-50 animate-spin-slow">⭐</div>
            <div className="absolute top-4 right-4 text-3xl opacity-50 animate-pulse">✨</div>
            <div className="absolute bottom-2 left-4 text-2xl opacity-50 animate-bounce">🔥</div>
            <div className="absolute bottom-4 right-2 text-3xl opacity-50 animate-spin-slow">💫</div>
          </div>

          {/* Form Section */}
          <div className="p-8 relative">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-sagittarius-200 opacity-50" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-sagittarius-200 opacity-50" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div>
                <Input
                  {...register('username')}
                  label="Username"
                  placeholder="Enter your username"
                  error={errors.username?.message}
                  disabled={isLoading}
                  autoComplete="username"
                  className="transition-all duration-300 focus:scale-[1.02]"
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
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                leftIcon={!isLoading && <LogIn className="w-5 h-5" />}
                className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials with better styling */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sagittarius-100 via-purple-100 to-pink-100 rounded-lg blur opacity-70" />
              <div className="relative p-4 bg-white bg-opacity-90 rounded-lg border-2 border-sagittarius-200 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-sagittarius-600" />
                  <p className="text-sm font-bold text-sagittarius-800">Demo Credentials</p>
                </div>
                <div className="text-xs text-gray-700 space-y-1 font-mono">
                  <p>
                    <span className="text-gray-500">Username:</span>{' '}
                    <span className="font-bold text-sagittarius-700">admin</span>
                  </p>
                  <p>
                    <span className="text-gray-500">Password:</span>{' '}
                    <span className="font-bold text-sagittarius-700">password123</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with animated border */}
          <div className="relative px-8 py-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t-2 border-sagittarius-200 text-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sagittarius-400 via-purple-400 to-pink-400 animate-pulse" />
            <p className="text-xs text-gray-600">
              © 2024 JCI Danang Junior Club. All rights reserved.
            </p>
          </div>
        </Card>

        {/* Version Badge with glow */}
        <div className="text-center mt-6">
          <span className="inline-block text-white text-sm bg-gradient-to-r from-sagittarius-500 to-purple-500 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg border-2 border-white border-opacity-30 animate-pulse">
            <span className="flex items-center gap-2">
              <span>v1.0.0 - Sagittarius Edition</span>
              <span className="text-xl animate-bounce">♐</span>
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
            </span>
          </span>
        </div>

        {/* Floating action message */}
        <div className="text-center mt-4 text-white text-sm animate-bounce">
          <p className="flex items-center justify-center gap-2 drop-shadow-lg">
            <span>🏹</span>
            <span>Aim for the stars, Archer!</span>
            <span>🎯</span>
          </p>
        </div>
      </div>

      {/* Custom Animations - Add to global CSS */}
      <style>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes gallop {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(calc(100vw + 100px));
            opacity: 0;
          }
        }

        @keyframes fireRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-400px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;