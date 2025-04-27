export interface Genre {
  id: number;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  views: number;
  likes: number;
  chapters: number;
  genres: Genre[];
  image: string;
  description?: string;
}
