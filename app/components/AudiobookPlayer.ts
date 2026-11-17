'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

interface Chapter {
  title: string;
  startTime: number;
}

interface AudiobookPlayerProps {
  audioUrl: string;
  title: string;
  coverUrl?: string;
  chapters?: Chapter[];
}

export default function AudiobookPlayer({
  audioUrl,
  title,
  coverUrl,
  chapters = [],
}: AudiobookPlayerProps) {
  
  const [hasWindow, setHasWindow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<React.ComponentRef<typeof ReactPlayer>>(null);

  useEffect(() => {
    setHasWindow(true);
  }, []);

  const handleSeekToChapter = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = seconds;
    }
    setPlaying(true);
  };

  if (!hasWindow) {
    return React.createElement('div', { className: 'p-4' }, 'Loading player...');
  }

  return React.createElement(
    'div',
    { className: 'max-w-md mx-auto p-6 border rounded-xl shadow-sm bg-white' },
    React.createElement(
      'div',
      {
        className:
          'w-40 aspect-[2/3] mx-auto mb-4 bg-gray-100 rounded overflow-hidden flex items-center justify-center',
      },
    ),
    React.createElement(
      'h2',
      { className: 'text-lg font-bold text-center mb-4' },
      title,
    ),
    React.createElement(
      'div',
      { className: 'hidden' },
      React.createElement(ReactPlayer, {
        ref: playerRef,
        src: audioUrl,
        playing,
        playbackRate,
        onProgress: (event: React.SyntheticEvent<HTMLVideoElement>) => {
          const { currentTime, duration } = event.currentTarget;
          setProgress(duration > 0 ? (currentTime / duration) * 100 : 0);
        },
        width: '0',
        height: '0',
      }),
    ),
    React.createElement(
      'div',
      { className: 'w-full bg-gray-200 h-2 rounded-full mb-4 overflow-hidden' },
      React.createElement('div', {
        className: 'bg-blue-600 h-full transition-all',
        style: { width: `${progress}%` },
      }),
    ),
    chapters.length > 0
      ? React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            { className: 'text-xs font-semibold uppercase text-gray-500 mb-2' },
            'Chapters',
          ),
          React.createElement(
            'ul',
            { className: 'space-y-1' },
            ...chapters.map((chap, idx) =>
              React.createElement(
                'li',
                { key: idx },
                React.createElement(
                  'button',
                  {
                    onClick: () => handleSeekToChapter(chap.startTime),
                    className:
                      'text-sm text-left w-full hover:bg-gray-100 p-1.5 rounded',
                  },
                  chap.title,
                ),
              ),
            ),
          ),
        )
      : null,
  );
}
