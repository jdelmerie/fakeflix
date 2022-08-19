import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getUpComings() {
    return this.http.get<any>(environment.host + 'movie/upcoming?' + 'api_key=' + environment.apiKey);
  }

  public getMoviesBySearch(search: string) {
    return this.http.get<any>(environment.host + 'search/movie?api_key=' + environment.apiKey + '&query=' + search);
  }

  public getMovieById(id: string) {
    return this.http.get<any>(environment.host + 'movie/' + id + '?api_key=' + environment.apiKey);
  }
}
