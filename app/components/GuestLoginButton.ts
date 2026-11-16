"use client"

import { loginAsGuest } from '../actions';
import { createElement } from 'react';

export function GuestLoginButton() {
  return createElement(
    'form',
    { action: loginAsGuest },
    createElement('button', { type: 'submit' }, 'Login as Guest'),
  );
} 
