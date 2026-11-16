import React, { useState } from "react";

export default function AuthModal({
  isOpen,
  onClose,
  defaultMode = "login",
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: string;
}) {
  const [mode, setMode] = useState<string>(defaultMode);

  if (!isOpen) return null;

  return React.createElement(
    "div",
    {
      className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center",
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      },
    },
    React.createElement(
      "div",
      { className: "bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative" },
      React.createElement(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "absolute top-4 right-4 text-gray-500 hover:text-gray-700",
        },
        "Close"
      ),
      React.createElement(
        "h2",
        { className: "text-2xl font-bold mb-6" },
        mode === "login" ? "Login Window" : "Create Account"
      ),
      React.createElement(
        "div",
        { className: "mt-4 text-center" },
        React.createElement(
          "button",
          {
            type: "button",
            onClick: () => setMode(mode === "login" ? "register" : "login"),
            className: "text-sm text-blue-600 hover:underline",
          },
          mode === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"
        )
      )
    )
  );
}
