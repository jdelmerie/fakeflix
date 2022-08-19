import { Genre } from "./genre";

export interface Movie {
  adult: boolean;
  genres: Array<Genre>;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
}
