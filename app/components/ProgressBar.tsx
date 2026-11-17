import { useRef } from "react";
import { useAudioPlayerContext } from "../context/AudioPlayerContext";

export const ProgressBar = () => {
  const { audioRef } = useAudioPlayerContext() as ReturnType<
    typeof useAudioPlayerContext
  > & { audioRef: { current: HTMLAudioElement | null } };
  const progressBarRef = useRef<HTMLInputElement>(null);
  const duration = audioRef.current?.duration;

  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current) {
      
  const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(newTime / duration) * 100}%`,
      );
    }
  };

  const formatTime = (time: number | undefined): string => {
    if (typeof time === "number" && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      const formatMinutes = minutes.toString().padStart(2, "0");
      const formatSeconds = seconds.toString().padStart(2, "0");
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="flex items-center justify-center gap-5 w-full">
      <span>{formatTime(audioRef.current?.currentTime)}</span>
      <input
        ref={progressBarRef}
        className="max-w-[80%] bg-gray-300"
        type="range"
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};
