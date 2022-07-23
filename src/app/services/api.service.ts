import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_KEY: string = 'fdb36a4067b4461f148a90a2f5a77179';
  URL: string = 'https://api.themoviedb.org/3/';
  link: string = '';

  constructor(private http: HttpClient) {}

  public getUpComings() {
    this.link = this.URL + 'movie/upcoming?' + 'api_key=' + this.API_KEY;
    return this.http.get<any>(this.link);
  }

  public getMoviesBySearch(search: string) {
    this.link =
      this.URL + 'search/movie?api_key=' + this.API_KEY + '&query=' + search;
    return this.http.get<any>(this.link);
  }

  public getMovieById(id: string) {
    this.link = this.URL + 'movie/' + id + '?api_key=' + this.API_KEY;
    return this.http.get<any>(this.link);
  }
}
