export interface Song {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  audioUrl: string;
  createdAt: string;
  duration: number;
}

export interface GenerationOptions {
  genre?: string;
  mood?: string;
  tempo?: string;
  instrument?: string;
}
