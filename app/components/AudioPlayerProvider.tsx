"use client";

import {
  createContext,
  useCallback,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { tracks as defaultTracks } from "../data/tracks";

export const AudioPlayerContext = createContext<any>(null);

export const AudioPlayerProvider = <Track,>({
  children,
  tracks = defaultTracks as unknown as Track[],
}: {
  children: ReactNode;
  tracks?: Track[];
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      setCurrentTrack(tracks[trackIndex] ?? tracks[0]);
    }
  }, [tracks, trackIndex]);

  const handleNext = useCallback(() => {
    if (!tracks || tracks.length === 0) return;
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prev >= tracks.length - 1
        ? 0
        : prev + 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  }, [isShuffle, tracks]);

  const handlePrevious = useCallback(() => {
    if (!tracks || tracks.length === 0) return;
    setTrackIndex((prev) => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : prev === 0
        ? tracks.length - 1
        : prev - 1;
      setCurrentTrack(tracks[newIndex]);
      return newIndex;
    });
  }, [isShuffle, tracks]);

  const skipForward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration || 0,
        audioRef.current.currentTime + 15
      );
      setTimeProgress(audioRef.current.currentTime);
    }
  }, []);

  const skipBackward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 15
      );
      setTimeProgress(audioRef.current.currentTime);
    }
  }, []);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;

    currentAudio.onended = () => {
      if (isRepeat) {
        currentAudio.currentTime = 0;
        currentAudio.play();
      } else {
        handleNext();
      }
    };

    return () => {
      currentAudio.onended = null;
    };
  }, [isRepeat, handleNext]);

  const contextValue = {
    audioRef,
    progressBarRef,
    tracks,
    trackIndex,
    setTrackIndex,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    handleNext,
    handlePrevious,
    skipForward,
    skipBackward,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};