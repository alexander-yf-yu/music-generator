import { useState, useRef, useEffect } from 'react';
import { Song } from '../types/types';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Player({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }: PlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => onNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNext]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentSong) {
    return <div className="player player-inactive">No song selected</div>;
  }

  return (
    <div className="player">
      <audio 
        ref={audioRef} 
        src={currentSong.audioUrl} 
        preload="metadata"
      />
      
      <div className="player-content">
        <div className="player-left">
          <div className="player-album-art">
            <img src={currentSong.imageUrl} alt="Album Art" />
          </div>
          
          <div className="song-info">
            <h3 className="song-title">{currentSong.title}</h3>
            <p className="song-description">{currentSong.description || 'No description'}</p>
          </div>
        </div>
        
        <div className="player-center">
          <div className="player-controls">
            <button className="control-btn" onClick={onPrevious}>
              ⏮️
            </button>
            <button className="control-btn play-pause" onClick={onPlayPause}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button className="control-btn" onClick={onNext}>
              ⏭️
            </button>
          </div>
        </div>
        
        <div className="player-right">
          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="progress-bar"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
