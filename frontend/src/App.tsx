import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MusicGenerator from './components/MusicGenerator';
import SongsList from './components/SongsList';
import Player from './components/Player';
import { Song, GenerationOptions } from './types/types';

// Mock data for development (will be replaced with API calls)
const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Electric Dreams',
    description: 'Synth Wave with retro vibes',
    imageUrl: 'https://picsum.photos/seed/electric1/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    createdAt: '2025-03-15T10:30:00Z',
    duration: 187,
    likes: 42,
    comments: [
      {
        id: 'c1',
        userId: 'u123',
        username: 'synthwave_lover',
        text: 'This track really captures that nostalgic 80s feel!',
        timestamp: '2025-03-16T14:22:00Z'
      },
      {
        id: 'c2',
        userId: 'u456',
        username: 'melody_master',
        text: 'The chord progression in this is so good, very atmospheric.',
        timestamp: '2025-03-18T09:11:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Ocean Whispers',
    description: 'Ambient sounds with peaceful melodies',
    imageUrl: 'https://picsum.photos/seed/ocean2/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    createdAt: '2025-03-20T14:45:00Z',
    duration: 213,
    likes: 37,
    comments: [
      {
        id: 'c3',
        userId: 'u789',
        username: 'chillout_fan',
        text: 'Perfect for my meditation sessions. So calming!',
        timestamp: '2025-03-21T18:33:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Urban Jungle',
    description: 'Hip-hop beats with jazzy elements',
    imageUrl: 'https://picsum.photos/seed/urban3/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    createdAt: '2025-03-25T09:15:00Z',
    duration: 162,
    likes: 28,
    comments: [
      {
        id: 'c4',
        userId: 'u101',
        username: 'beatmaker99',
        text: 'Those drums are fire! Would love to hear a remix.',
        timestamp: '2025-03-26T10:45:00Z'
      },
      {
        id: 'c5',
        userId: 'u202',
        username: 'jazz_enthusiast',
        text: 'Great blend of modern beats with classic jazz samples!',
        timestamp: '2025-03-27T15:20:00Z'
      }
    ]
  },
  {
    id: '4',
    title: 'Midnight Serenade',
    description: 'Smooth jazz with piano solos',
    imageUrl: 'https://picsum.photos/seed/midnight4/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    createdAt: '2025-03-28T22:00:00Z',
    duration: 234,
    likes: 19,
    comments: [
      {
        id: 'c6',
        userId: 'u303',
        username: 'night_owl',
        text: 'This has become my go-to late night study music.',
        timestamp: '2025-03-29T01:12:00Z'
      }
    ]
  },
  {
    id: '5',
    title: 'Cosmic Voyage',
    description: 'Space-themed electronic music',
    imageUrl: 'https://picsum.photos/seed/cosmic5/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    createdAt: '2025-03-29T16:20:00Z',
    duration: 197,
    likes: 24,
    comments: [
      {
        id: 'c7',
        userId: 'u404',
        username: 'space_traveler',
        text: 'Feels like I\'m floating through the galaxy. Amazing soundscape!',
        timestamp: '2025-03-30T08:05:00Z'
      },
      {
        id: 'c8',
        userId: 'u505',
        username: 'electronic_dreams',
        text: 'The synth work on this is incredible. What VSTs did you use?',
        timestamp: '2025-03-30T11:30:00Z'
      }
    ]
  }
];

function App() {
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle song generation
  const handleGenerate = async (prompt: string, options: GenerationOptions) => {
    try {
      setIsGenerating(true);
      
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a delay and create a mock song
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newSong: Song = {
        id: Date.now().toString(),
        title: prompt,
        description: `Generated with options: ${options.genre}, ${options.mood}`,
        imageUrl: 'https://picsum.photos/300/300?random=' + Date.now(), // Placeholder image
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
        createdAt: new Date().toISOString(),
        duration: 180, // 3 minutes
        likes: 0,
        comments: []
      };
      
      const updatedSongs = [newSong, ...songs];
      setSongs(updatedSongs);
      setCurrentSong(newSong);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error generating song:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Player controls
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentSong || songs.length <= 1) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentSong || songs.length <= 1) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  // Handle song selection from the list
  const handleSongSelect = (song: Song) => {
    if (currentSong && currentSong.id === song.id) {
      // Toggle play/pause if selecting the current song
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  // Handle liking a song
  const handleLikeSong = (songId: string) => {
    setSongs(prevSongs => {
      return prevSongs.map(song => {
        if (song.id === songId) {
          return { ...song, likes: song.likes + 1 };
        }
        return song;
      });
    });
  };

  // Handle adding a comment to a song
  const handleAddComment = (songId: string, text: string) => {
    setSongs(prevSongs => {
      return prevSongs.map(song => {
        if (song.id === songId) {
          const newComment = {
            id: `c${Date.now()}`,
            userId: 'current-user', // In a real app, this would be the actual user ID
            username: 'you', // In a real app, this would be the actual username
            text,
            timestamp: new Date().toISOString()
          };
          return { 
            ...song, 
            comments: [newComment, ...song.comments]
          };
        }
        return song;
      });
    });
  };

  // Load songs from backend when component mounts
  useEffect(() => {
    // In a real implementation, this would fetch songs from your backend
    // For now, we'll just use the mock data
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <section className="generation-section">
          <div className="music-generator">
            <MusicGenerator 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating} 
            />
          </div>
        </section>
        
        <section className="songs-section">
          <div className="songs-list">
            <SongsList 
              songs={songs} 
              onSongSelect={handleSongSelect}
              currentSongId={currentSong?.id}
              onLikeSong={handleLikeSong}
              onAddComment={handleAddComment}
            />
          </div>
        </section>
      </main>
      
      <footer className="player-container">
        <Player 
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </footer>
    </div>
  );
}

export default App;
