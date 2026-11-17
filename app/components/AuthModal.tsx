"use client"

import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log(`Submitting ${mode}:`, { email, password });
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return React.createElement(
    'div',
    { className: 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4' },
    React.createElement(
      'div',
      { className: 'relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900' },
      React.createElement('button', {
        onClick: onClose,
        'aria-label': 'Close modal',
        className: 'absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200',
      }, '✕'),
      React.createElement('h2', {
        className: 'text-2xl font-bold text-zinc-900 dark:text-white',
      }, mode === 'login' ? 'Welcome back' : 'Create an account'),
      React.createElement('p', {
        className: 'mt-1 text-sm text-zinc-500 dark:text-zinc-400',
      }, mode === 'login'
        ? 'Enter your credentials to access your account.'
        : 'Sign up to get started.'),
      error && React.createElement('div', {
        className: 'mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400',
      }, error),
      React.createElement(
        'form',
        { onSubmit: handleSubmit, className: 'mt-6 space-y-4' },
        React.createElement(
          'div',
          null,
          React.createElement('label', {
            className: 'block text-sm font-medium text-zinc-700 dark:text-zinc-300',
          }, 'Email'),
          React.createElement('input', {
            type: 'email',
            required: true,
            value: email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
            placeholder: 'you@example.com',
            className: 'mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white',
          }),
        ),
        React.createElement(
          'div',
          null,
          React.createElement('label', {
            className: 'block text-sm font-medium text-zinc-700 dark:text-zinc-300',
          }, 'Password'),
          React.createElement('input', {
            type: 'password',
            required: true,
            value: password,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
            placeholder: '••••••••',
            className: 'mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white',
          }),
        ),
        React.createElement('button', {
          type: 'submit',
          disabled: isLoading,
          className: 'w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50',
        }, isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up'),
      ),
      React.createElement(
        'div',
        { className: 'mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400' },
        mode === 'login'
          ? ["Don't have an account? ", React.createElement('button', {
              key: 'signup',
              type: 'button',
              onClick: () => setMode('signup'),
              className: 'font-medium text-blue-600 hover:underline dark:text-blue-400',
            }, 'Sign up')]
          : ['Already have an account? ', React.createElement('button', {
              key: 'login',
              type: 'button',
              onClick: () => setMode('login'),
              className: 'font-medium text-blue-600 hover:underline dark:text-blue-400',
            }, 'Sign in')],
      ),
    ),
  );
};

