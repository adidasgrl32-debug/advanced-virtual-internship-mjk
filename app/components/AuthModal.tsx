"use client"

import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../lib/firebase";

const googleProvider = new GoogleAuthProvider();

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const modalStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: "400px",
  padding: "24px",
  borderRadius: "8px",
  backgroundColor: "white",
};

const closeBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: "12px",
  right: "12px",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

export default function AuthModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsModalOpen(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuestSignIn = async () => {
    setError("");
    try {
      await signInAnonymously(auth);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div>
      {user ? (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span>
            Signed in as:{" "}
            <strong>{user.isAnonymous ? "Guest" : user.email}</strong>
          </span>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => setIsModalOpen(true)}>Sign In</button>
      )}

      {isModalOpen && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={closeBtnStyle}
              aria-label="Close modal"
            >
              ✕
            </button>
            <h2>Sign In</h2>
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <form onSubmit={handleEmailSignIn} style={formStyle}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign In with Email</button>
            </form>
            <hr style={{ margin: "16px 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button type="button" onClick={handleGoogleSignIn}>
                Sign in with Google
              </button>
              <button type="button" onClick={handleGuestSignIn}>
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}