'use client';

import * as React from 'react';
import { useState } from 'react';
import LoginModal from './LoginModal';

export default function LoginTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('button', {
      onClick: () => setIsModalOpen(true),
      className: 'btn home__cta-btn',
    }),
    React.createElement(LoginModal, {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
    })
  );
}
