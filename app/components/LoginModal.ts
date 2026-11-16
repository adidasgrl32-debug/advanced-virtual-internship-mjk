"use client";

import { createElement, useState, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const googleProvider = new GoogleAuthProvider();

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    }
  };

  return createElement(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs",
      onClick: onClose,
    },
    createElement(
      "div",
      {
        className: "relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900",
        onClick: (e) => e.stopPropagation(),
      } as any,
      createElement("button", {
        onClick: onClose,
        "aria-label": "Close modal",
        className: "absolute right-4 top-4 text-zinc-400 hover:text-zinc-600",
        children: "✕",
      }),
      createElement("h2", {
        className: "mb-4 text-2xl font-semibold",
        children: isSignUp ? "Create an Account" : "Welcome Back",
      }),
      error &&
        createElement("p", {
          className: "mb-3 rounded bg-red-100 p-2 text-sm text-red-700",
          children: error,
        }),
      createElement(
        "form",
        { onSubmit: handleEmailAuth, className: "space-y-4" },
        createElement("input", {
          type: "email",
          placeholder: "Email",
          required: true,
          value: email,
          onChange: (e) => setEmail(e.target.value),
          className: "w-full rounded-lg border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800",
        }),
        createElement("input", {
          type: "password",
          placeholder: "Password",
          required: true,
          value: password,
          onChange: (e) => setPassword(e.target.value),
          className: "w-full rounded-lg border px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800",
        }),
        createElement("button", {
          type: "submit",
          disabled: submitting,
          className: "w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50",
          children: submitting ? "Processing..." : isSignUp ? "Sign Up" : "Log In",
        }),
      ),
      createElement(
        "div",
        { className: "my-4 flex items-center gap-2 text-xs text-zinc-400" },
        createElement("div", { className: "h-px flex-1 bg-zinc-200 dark:bg-zinc-700" }),
        "OR",
        createElement("div", { className: "h-px flex-1 bg-zinc-200 dark:bg-zinc-700" }),
      ),
      createElement("button", {
        type: "button",
        onClick: handleGoogleSignIn,
        className: "w-full rounded-lg border border-zinc-300 py-2 font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800",
        children: "Continue with Google",
      }),
      createElement(
        "p",
        { className: "mt-4 text-center text-sm text-zinc-500" },
        isSignUp ? "Already have an account? " : "Don't have an account? ",
        createElement("button", {
          type: "button",
          onClick: () => setIsSignUp(!isSignUp),
          className: "font-medium text-blue-600 hover:underline",
          children: isSignUp ? "Log In" : "Sign Up",
        }),
      ),
    ),
  );
}
