"use client";

import React, { useEffect, useCallback, useRef } from "react";
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";
import { useAudioPlayerContext } from "../context/AudioPlayerContext";

export const Controls = () => {
  const {
    currentTrack,
    audioRef,
    progressBarRef,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    setTimeProgress,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    handleNext,
    handlePrevious,
    skipForward,
    skipBackward,
  } = useAudioPlayerContext();

  const playAnimationRef = useRef<number | null>(null);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration;
    if (seconds !== undefined && !isNaN(seconds)) {
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  };

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, audioRef, progressBarRef, setTimeProgress]);

  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
      startAnimation();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress();
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, currentTrack, startAnimation, updateProgress, audioRef, setIsPlaying]);

  return (
    <div className="flex gap-4 items-center">
      {currentTrack?.src && (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onLoadedMetadata={onLoadedMetadata}
        />
      )}
      <button type="button" onClick={() => setIsShuffle((prev: boolean) => !prev)}>
        <BsShuffle size={20} className={isShuffle ? "text-[#f50]" : ""} />
      </button>
      <button type="button" onClick={handlePrevious}>
        <BsSkipStartFill size={20} />
      </button>
      <button type="button" onClick={skipBackward}>
        <BsFillRewindFill size={20} />
      </button>
      <button type="button" onClick={() => setIsPlaying((prev: boolean) => !prev)}>
        {isPlaying ? (
          <BsFillPauseFill size={30} />
        ) : (
          <BsFillPlayFill size={30} />
        )}
      </button>
      <button type="button" onClick={skipForward}>
        <BsFillFastForwardFill size={20} />
      </button>
      <button type="button" onClick={handleNext}>
        <BsSkipEndFill size={20} />
      </button>
      <button type="button" onClick={() => setIsRepeat((prev: boolean) => !prev)}>
        <BsRepeat size={20} className={isRepeat ? "text-[#f50]" : ""} />
      </button>
    </div>
  );
};