import { useState } from 'react';
import { Song } from '../types/types';
import SongDetails from './SongDetails';

// SVG icon components for player controls
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

// Heart icon for likes
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// Comment icon
const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

interface SongsListProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  currentSongId?: string;
  onLikeSong: (songId: string) => void;
  onAddComment: (songId: string, text: string) => void;
}

export default function SongsList({ 
  songs, 
  onSongSelect, 
  currentSongId,
  onLikeSong,
  onAddComment
}: SongsListProps) {
  const [hoveredSongId, setHoveredSongId] = useState<string | null>(null);
  const [selectedDetailsSong, setSelectedDetailsSong] = useState<Song | null>(null);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Now this will open the details popup instead of playing the song
  const handleCardClick = (song: Song, e: React.MouseEvent) => {
    setSelectedDetailsSong(song);
  };
  
  // Handle play button click (stop event propagation to not trigger card click)
  const handlePlayButtonClick = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation();
    onSongSelect(song);
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
            onClick={(e) => handleCardClick(song, e)}
            onMouseEnter={() => setHoveredSongId(song.id)}
            onMouseLeave={() => setHoveredSongId(null)}
          >
            <div className="song-image-container">
              <img src={song.imageUrl} alt={song.title} className="song-image" />
              {(hoveredSongId === song.id || currentSongId === song.id) && (
                <div className="song-overlay">
                  <button 
                    className="play-button"
                    onClick={(e) => handlePlayButtonClick(song, e)}
                  >
                    {currentSongId === song.id ? <PauseIcon /> : <PlayIcon />}
                  </button>
                </div>
              )}
            </div>
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-description">{song.description || 'No description'}</p>
              <div className="song-footer">
                <p className="song-duration">{formatDuration(song.duration)}</p>
                
                <div className="song-social-stats">
                  <div className="song-stat">
                    <HeartIcon />
                    <span>{song.likes}</span>
                  </div>
                  <div className="song-stat">
                    <CommentIcon />
                    <span>{song.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDetailsSong && (
        <SongDetails
          song={selectedDetailsSong}
          onClose={() => setSelectedDetailsSong(null)}
          onLike={onLikeSong}
          onAddComment={onAddComment}
        />
      )}
    </div>
  );
}
