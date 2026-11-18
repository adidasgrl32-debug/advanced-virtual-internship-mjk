'use client'

import { createElement, useRef, useState, type FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function LoginModal() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(
        auth,
        String(data.get('email')),
        String(data.get('password'))
      )
      dialog.current?.close()
    } catch {
      setError('Unable to log in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return createElement(
    'div',
    null,
    createElement('button', { onClick: () => dialog.current?.showModal() }, 'Log in'),
    createElement(
      'dialog',
      { ref: dialog, 'aria-labelledby': 'login-title' },
      createElement('h2', { id: 'login-title' }, 'Log in'),
      createElement(
        'form',
        { onSubmit: handleLogin },
        createElement('label', { htmlFor: 'email' }, 'Email'),
        createElement('input', { id: 'email', name: 'email', type: 'email', required: true }),
        createElement('label', { htmlFor: 'password' }, 'Password'),
        createElement('input', { id: 'password', name: 'password', type: 'password', required: true }),
        error ? createElement('p', { role: 'alert' }, error) : null,
        createElement('button', { disabled: loading }, loading ? 'Logging in…' : 'Log in'),
        createElement(
          'button',
          { type: 'button', onClick: () => dialog.current?.close() },
          'Cancel'
        )
      )
    )
  )
}