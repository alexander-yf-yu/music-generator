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
    duration: 187
  },
  {
    id: '2',
    title: 'Ocean Whispers',
    description: 'Ambient sounds with peaceful melodies',
    imageUrl: 'https://picsum.photos/seed/ocean2/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    createdAt: '2025-03-20T14:45:00Z',
    duration: 213
  },
  {
    id: '3',
    title: 'Urban Jungle',
    description: 'Hip-hop beats with jazzy elements',
    imageUrl: 'https://picsum.photos/seed/urban3/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    createdAt: '2025-03-25T09:15:00Z',
    duration: 162
  },
  {
    id: '4',
    title: 'Midnight Serenade',
    description: 'Smooth jazz with piano solos',
    imageUrl: 'https://picsum.photos/seed/midnight4/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    createdAt: '2025-03-28T22:00:00Z',
    duration: 234
  },
  {
    id: '5',
    title: 'Cosmic Voyage',
    description: 'Space-themed electronic music',
    imageUrl: 'https://picsum.photos/seed/cosmic5/300/300',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    createdAt: '2025-03-29T16:20:00Z',
    duration: 197
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
