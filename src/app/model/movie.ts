export interface Movie {
  adult: string;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  overview: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
