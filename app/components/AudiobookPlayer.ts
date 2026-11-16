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
      coverUrl
        ? React.createElement('img', {
            src: coverUrl,
            alt: title,
            className: 'w-full h-full object-cover',
          })
        : React.createElement(
            'span',
            { className: 'text-gray-400 text-sm' },
            'No Cover',
          ),
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
    React.createElement(
      'div',
      { className: 'flex items-center justify-between gap-4 mb-6' },
      React.createElement(
        'button',
        {
          onClick: () => setPlaying(!playing),
          className: 'px-4 py-2 bg-blue-600 text-white rounded-lg font-medium',
        },
        playing ? 'Pause' : 'Play',
      ),
      React.createElement(
        'select',
        {
          value: playbackRate,
          onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
            setPlaybackRate(parseFloat(event.target.value)),
          className: 'border rounded-lg px-2 py-1 text-sm',
        },
        React.createElement('option', { value: 1 }, '1.0x'),
        React.createElement('option', { value: 1.25 }, '1.25x'),
        React.createElement('option', { value: 1.5 }, '1.5x'),
        React.createElement('option', { value: 2 }, '2.0x'),
      ),
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
