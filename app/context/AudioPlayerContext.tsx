"use client";

import { useContext } from "react";
import { AudioPlayerContext } from "../components/AudioPlayerProvider";

export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayerContext must be used within an AudioPlayerProvider"
    );
  }
  return context;
};