"use client"

import React, { useState } from "react";
import Image from "next/image";
import { BsPerson } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  const [isResetyourpasswordModalOpen, setIsResetyourpasswordModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/for-you";
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Check your email and password.");
  }
};

if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="auth__wrapper">
          <div className="auth">
            {isResetyourpasswordModalOpen ? (
              <>
                <div className="auth__content">
                  <div className="auth__title">Reset your password</div>
                  <form className="auth__main--form">
                    <input
                      className="auth__main--input"
                      type="text"
                      placeholder="Email address"
                    />
                    <button className="btn" type="submit">
                      <span>Send reset password link</span>
                    </button>
                  </form>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResetyourpasswordModalOpen(false)}
                  className="auth__switch--btn"
                >
                  Go to login
                </button>
              </>
            ) : isSignupModalOpen ? (
              <>
                <div className="auth__content">
                  <div className="auth__title">Sign up to Summarist</div>
                  <button
                    type="button"
                    className="btn google__btn--wrapper"
                    onClick={() => (window.location.href = "/for-you")}
                  >
                    <figure className="google__icon--mask">
                      <Image
                        src="/google.png"
                        width={50}
                        height={50}
                        style={{ width: "50%", height: "auto" }}
                        alt="Google icon"
                      />
                    </figure>
                    <div>Sign up with Google</div>
                  </button>
                  <div className="auth__separator">
                    <span className="auth__separator--text">or</span>
                  </div>
                  <form className="auth__main--form">
                    <input
                      className="auth__main--input"
                      type="email"
                      placeholder="Email Address"
                      />
                  <input
                    className="auth__main--input"
                    type="password"
                    placeholder="Password"
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={() => (window.location.href = "/for-you")}
                    >
                      <span>Sign up</span>
                    </button>
                  </form>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSignupModalOpen(false)}
                  className="auth__switch--btn"
                >
                  Already have an account?
                </button>
              </>
            ) : (
              <>
                <div className="auth__content">
                  <div className="auth__title">Log in to Summarist</div>
                  <button
                    type="button"
                    className="btn guest__btn--wrapper"
                    onClick={() => (window.location.href = "/for-you")}
                  >
                    <figure className="google__icon--mask guest__icon--mask">
                      <BsPerson />
                    </figure>
                    <div>Login as a Guest</div>
                  </button>
                  <div className="auth__separator">
                    <span className="auth__separator--text">or</span>
                  </div>
                  <button
                    type="button"
                    className="btn google__btn--wrapper"
                    onClick={() => (window.location.href = "/for-you")}
                  >
                    <figure className="google__icon--mask">
                      <Image
                        src="/google.png"
                        width={50}
                        height={50}
                        style={{ width: "50%", height: "auto" }}
                        alt="Google icon"
                      />
                    </figure>
                    <div>Login with Google</div>
                  </button>
                  <div className="auth__separator">
                    <span className="auth__separator--text">or</span>
                  </div>
                  <form className="auth__main--form">
                  <input
                    className="auth__main--input"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="auth__main--input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="btn" onClick={handleLogin}>
                      <span>Login</span>
                    </button>
                  </form>
                </div>

                <div
                  className="auth__forgot--password"
                  style={{ textAlign: "center", width: "100%", display: "block" }}
                  onClick={() => setIsResetyourpasswordModalOpen(true)}
                >
                  Forgot your password?
                </div>

                <button
                  type="button"
                  onClick={() => setIsSignupModalOpen(true)}
                  className="auth__switch--btn"
                >
                  Don't have an account?
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                onClose();
                setIsResetyourpasswordModalOpen(false);
                setIsSignupModalOpen(false);
              }}
              className="auth__close--btn"
              aria-label="Close modal"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}