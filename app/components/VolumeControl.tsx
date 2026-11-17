import { ChangeEvent, useEffect, useState } from 'react';
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';

export const VolumeControl= () =>{
  const [volume, setVolume] = useState<number>(60);
  const [muteVolume,setMuteVolume] = useState(false);
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setVolume(Number(e.target.value));
  };

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (audio) {
      audio.volume = volume / 100;
      audio.muted = muteVolume;
    }
  }, [volume, muteVolume]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume< 5 ? (
            <IoMdVolumeOff size={25} />
          ) : volume< 40 ? (
            <IoMdVolumeLow size={25} />
          ) : (
            <IoMdVolumeHigh size={25} />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          className="volumn"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};