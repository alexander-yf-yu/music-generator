import React, { useState } from 'react';
import { Song, Comment } from '../types/types';

interface SongDetailsProps {
  song: Song;
  onClose: () => void;
  onLike: (songId: string) => void;
  onAddComment: (songId: string, text: string) => void;
}

export default function SongDetails({ song, onClose, onLike, onAddComment }: SongDetailsProps) {
  const [commentText, setCommentText] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(song.id, commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className="song-details-overlay" onClick={onClose}>
      <div 
        className="song-details-popup"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="song-details-header">
          <div className="song-details-image">
            <img src={song.imageUrl} alt={song.title} />
          </div>
          <div className="song-details-info">
            <h2>{song.title}</h2>
            <p className="song-description">{song.description}</p>
            <p className="song-created-date">Created on {formatDate(song.createdAt)}</p>
            
            <div className="song-social">
              <button 
                className="like-button" 
                onClick={() => onLike(song.id)}
              >
                ❤️ <span>{song.likes}</span>
              </button>
              <div className="comments-count">
                💬 <span>{song.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="song-comments">
          <h3>Comments</h3>
          
          <div className="comments-list">
            {song.comments.length > 0 ? (
              song.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-username">@{comment.username}</span>
                    <span className="comment-time">{formatDate(comment.timestamp)} at {formatTime(comment.timestamp)}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
          </div>
          
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <textarea 
              placeholder="Add a comment..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
            />
            <button type="submit" disabled={!commentText.trim()}>Post Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}
