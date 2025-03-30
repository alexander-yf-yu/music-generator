export interface Song {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  audioUrl: string;
  createdAt: string;
  duration: number;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface GenerationOptions {
  genre?: string;
  mood?: string;
  tempo?: string;
  instrument?: string;
}
