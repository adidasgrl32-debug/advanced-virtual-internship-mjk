"use client";

import { useAudioPlayerContext } from "../context/AudioPlayerContext";

export const ProgressBar = () => {
  const {
    audioRef,
    progressBarRef,
    timeProgress,
    duration,
    setTimeProgress,
  } = useAudioPlayerContext();

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      setTimeProgress(newTime);
      if (duration) {
        progressBarRef.current.style.setProperty(
          "--range-progress",
          `${(newTime / duration) * 100}%`
        );
      }
    }
  };

  const formatTime = (time: number | undefined): string => {
    if (typeof time === "number" && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return "00:00";
  };

  return (
    <div className="flex items-center justify-center gap-5 w-full">
      <span>{formatTime(timeProgress)}</span>
      <input
        ref={progressBarRef}
        className="max-w-[80%] bg-gray-300"
        type="range"
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};