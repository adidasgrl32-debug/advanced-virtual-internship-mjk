'use client';

import { useState } from 'react';
import LoginModal from './LoginModal';

export default function LoginTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn home__cta-btn"
      >
      </button>

      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
