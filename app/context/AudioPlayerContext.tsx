"use client"

import {
  createElement,
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import type { StaticImageData } from 'next/image';
import { tracks } from '../data/tracks';

export interface Track {
  title: string;
  src: string;
  author: string;
  thumbnail?: string | StaticImageData;
}
interface AudioPlayerContextType {
  currentTrack: Track;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
}
const AudioPlayerContext = createContext<
  AudioPlayerContextType | undefined
>(undefined);
export const AudioPlayerProvider = ({
  children,
}: {
  children: ReactNode;
}) =>{
  const [currentTrack,setCurrentTrack] = useState<Track>(tracks[0]);
  const contextValue= {
    currentTrack,
    setCurrentTrack,
  };
  return createElement(
    AudioPlayerContext.Provider,
    { value: contextValue },
    children
  );
};
export const useAudioPlayerContext = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      'useAudioPlayerContext must be used within an AudioPlayerProvider'
    );
  }
  return context;
};