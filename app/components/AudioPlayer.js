'use client';

import { useRef, useState } from 'react';

export default function AudioPlayer({ src, title = 'Audio Track' }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="p-4 border rounded-lg max-w-md bg-neutral-900 text-white">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />

      <p className="font-medium mb-2 truncate">{title}</p>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="px-4 py-1.5 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <span className="text-xs tabular-nums">{formatTime(currentTime)}</span>

        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-white cursor-pointer"
        />

        <span className="text-xs tabular-nums">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
