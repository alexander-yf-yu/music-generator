import { useState } from 'react';
import { Song } from '../types/types';

interface SongsListProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  currentSongId?: string;
}

export default function SongsList({ songs, onSongSelect, currentSongId }: SongsListProps) {
  const [hoveredSongId, setHoveredSongId] = useState<string | null>(null);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (songs.length === 0) {
    return (
      <div className="songs-list empty-list">
        <div className="empty-state">
          <h2>No songs yet</h2>
          <p>Generate your first song using the prompt above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="songs-list">
      <h2>Your Generated Songs</h2>
      <div className="songs-grid">
        {songs.map((song) => (
          <div 
            key={song.id} 
            className={`song-card ${currentSongId === song.id ? 'active' : ''}`}
            onClick={() => onSongSelect(song)}
            onMouseEnter={() => setHoveredSongId(song.id)}
            onMouseLeave={() => setHoveredSongId(null)}
          >
            <div className="song-image-container">
              <img src={song.imageUrl} alt={song.title} className="song-image" />
              {(hoveredSongId === song.id || currentSongId === song.id) && (
                <div className="song-overlay">
                  <button className="play-button">
                    {currentSongId === song.id ? '❚❚' : '▶'}
                  </button>
                </div>
              )}
            </div>
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-description">{song.description || 'No description'}</p>
              <p className="song-duration">{formatDuration(song.duration)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
