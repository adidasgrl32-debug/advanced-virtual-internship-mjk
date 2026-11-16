'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactReader = dynamic(
  () =>
    import('react-reader').then(
      (mod) =>
        mod.ReactReader as unknown as React.ComponentType<{
          url: string;
          location: string | number;
          locationChanged: (epubcfi: string) => void;
        }>
    ),
  { ssr: false }
) as React.ComponentType<{
  url: string;
  location: string | number;
  locationChanged: (epubcfi: string) => void;
}>;

export default function EbookReader({ epubUrl }: { epubUrl: string }) {
  const [location, setLocation] = useState<string | number>(0);

  return React.createElement(
    'div',
    { style: { height: '100vh', position: 'relative' } },
    React.createElement(ReactReader, {
      url: epubUrl,
      location,
      locationChanged: (epubcfi: string) => setLocation(epubcfi),
    })
  );
}
