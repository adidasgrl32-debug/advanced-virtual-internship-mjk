import { createContext, useCallback, useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export const AudioPlayerContext = createContext<any>(null);

export const AudioPlayerProvider = <Track,>({
  children,
  tracks,
}: {
  children: ReactNode;
  tracks: Track[];
}) =>{
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex,setTrackIndex] = useState<number>(0);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [currentTrack,setCurrentTrack] = useState<Track>(
    tracks[trackIndex]
  );
  // ...
  const contextValue= {
    // ...
    setTrackIndex,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
  };

const handleNext = useCallback(() => {
​​  setTrackIndex((prev) => {
​​    const newIndex = isShuffle
​​      ? Math.floor(Math.random() * tracks.length)
​​      : prev >= tracks.length - 1
​​      ? 0
​​      : prev + 1;
​​    setCurrentTrack(tracks[newIndex]);
​​    return newIndex;
​​  });
​​}, [isShuffle, setCurrentTrack, setTrackIndex]);

​​const handlePrevious = useCallback(() => {
​​  setTrackIndex((prev) => {
​​    const newIndex = isShuffle
​​      ? Math.floor(Math.random() * tracks.length)
​​      : prev === 0
​​      ? tracks.length - 1
​​      : prev - 1;
​​    setCurrentTrack(tracks[newIndex]);
​​    return newIndex;
​​  });
​​}, [isShuffle, setCurrentTrack, setTrackIndex]);

const skipForward = () => {
  if (audioRef.current) {
    audioRef.current.currentTime += 15;
  }
};
const skipBackward = () => {
  if (audioRef.current) {
    audioRef.current.currentTime -= 15;
  }
};

useEffect(() => {
    const currentAudioRef= audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        if (isRepeat) {
          currentAudioRef.play();
        } else {
          handleNext();
        }
      };
    }
    return () =>{
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [isRepeat, handleNext,audioRef]);

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};