import { useState } from 'react';
import { GenerationOptions } from '../types/types';

interface MusicGeneratorProps {
  onGenerate: (prompt: string, options: GenerationOptions) => Promise<void>;
  isGenerating: boolean;
}

export default function MusicGenerator({ onGenerate, isGenerating }: MusicGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [options, setOptions] = useState<GenerationOptions>({
    genre: 'pop',
    mood: 'happy',
    tempo: 'medium',
    instrument: 'piano',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      await onGenerate(prompt, options);
      setPrompt('');
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOptions(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="music-generator">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your song (e.g., 'A upbeat pop song about summer adventures')"
            disabled={isGenerating}
            className="prompt-input"
          />
          <button 
            type="submit" 
            disabled={!prompt.trim() || isGenerating} 
            className="generate-button"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
        
        <div className="advanced-options">
          <button 
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="toggle-advanced"
          >
            {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
          </button>
          
          {showAdvanced && (
            <div className="options-grid">
              <div className="option">
                <label htmlFor="genre">Genre</label>
                <select 
                  id="genre"
                  name="genre"
                  value={options.genre}
                  onChange={handleOptionChange}
                >
                  <option value="pop">Pop</option>
                  <option value="rock">Rock</option>
                  <option value="hiphop">Hip Hop</option>
                  <option value="electronic">Electronic</option>
                  <option value="classical">Classical</option>
                  <option value="jazz">Jazz</option>
                </select>
              </div>
              
              <div className="option">
                <label htmlFor="mood">Mood</label>
                <select 
                  id="mood"
                  name="mood"
                  value={options.mood}
                  onChange={handleOptionChange}
                >
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="energetic">Energetic</option>
                  <option value="calm">Calm</option>
                  <option value="dramatic">Dramatic</option>
                </select>
              </div>
              
              <div className="option">
                <label htmlFor="tempo">Tempo</label>
                <select 
                  id="tempo"
                  name="tempo"
                  value={options.tempo}
                  onChange={handleOptionChange}
                >
                  <option value="slow">Slow</option>
                  <option value="medium">Medium</option>
                  <option value="fast">Fast</option>
                </select>
              </div>
              
              <div className="option">
                <label htmlFor="instrument">Main Instrument</label>
                <select 
                  id="instrument"
                  name="instrument"
                  value={options.instrument}
                  onChange={handleOptionChange}
                >
                  <option value="piano">Piano</option>
                  <option value="guitar">Guitar</option>
                  <option value="drums">Drums</option>
                  <option value="synthesizer">Synthesizer</option>
                  <option value="orchestra">Orchestra</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
