"use client"

import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GuestLoginButton } from './GuestLoginButton';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    setIsOpen(false);
  } catch (error) {
    alert(error instanceof Error ? error.message : 'Signup failed');
  }
};

  return React.createElement(
    'div',
    null,
    React.createElement('button', { onClick: () => setIsOpen(true) }, 'Login'),
    isOpen &&
      React.createElement(
        'div',
        { className: 'modal-overlay', onClick: () => setIsOpen(false) },
        React.createElement(
          'div',
          {
            className: 'modal-content',
            onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
          },
          React.createElement(
            'button',
            {
              className: 'close-btn',
              onClick: () => setIsOpen(false),
              'aria-label': 'Close modal',
            },
            '×'
          ),
          React.createElement(GuestLoginButton),
          React.createElement('h2', null, 'Sign up to Summarist'),
          React.createElement(
            'form',
            { onSubmit: handleSubmit },
            React.createElement(
              'div',
              { className: 'form-group' },
              React.createElement('label', { htmlFor: 'email' }, 'Email'),
              React.createElement('input', {
                id: 'email',
                type: 'email',
                value: email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
                required: true,
              })
            ),
            React.createElement(
              'div',
              { className: 'form-group' },
              React.createElement('label', { htmlFor: 'password' }, 'Password'),
              React.createElement('input', {
                id: 'password',
                type: 'password',
                value: password,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
                required: true,
              })
            ),
            React.createElement('button', { type: 'submit', className: 'submit-btn' }, 'Sign up')
          )
        )
      )
  );
}
