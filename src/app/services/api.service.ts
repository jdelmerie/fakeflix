import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private SESSION_ID = 'sessionID'

  constructor(private http: HttpClient) { }

  /**********************************************************************
   * 
   * DB MOVIES REQUEST
   * 
   *********************************************************************/
  public getUpComings() {
    return this.http.get<any>(environment.host + 'movie/upcoming?' + 'api_key=' + environment.apiKey);
  }

  public getMoviesBySearch(search: string) {
    return this.http.get<any>(environment.host + 'search/movie?api_key=' + environment.apiKey + '&query=' + search);
  }

  public getMovieById(id: string) {
    return this.http.get<any>(environment.host + 'movie/' + id + '?api_key=' + environment.apiKey);
  }

  /**********************************************************************
   * 
   * AUTHENTIFICATION
   * 
   *********************************************************************/
  public authenticationStep1() {
    return this.http.get<any>(environment.host + 'authentication/token/new?api_key=' + environment.apiKey);
  }

  public authenticationStep2(username: string, password: string, request_token: string) {
    return this.http.post<any>(environment.host + 'authentication/token/validate_with_login?api_key=' + environment.apiKey, {
      username, password, request_token
    });
  }

  public authenticationStep3(request_token: string) {
    return this.http.post<any>(environment.host + 'authentication/session/new?api_key=' + environment.apiKey, {
      request_token
    });
  }

  public logout(session_id: string) {
    return this.http.delete<any>(environment.host + 'authentication/session?api_key=' + environment.apiKey, {
      body: {session_id}
    });
  }

  /**********************************************************************
   * 
   * LOCAL STORAGE
   * 
   *********************************************************************/
  public saveSessionId(token: string): void {
    window.sessionStorage.removeItem(this.SESSION_ID);
    window.sessionStorage.setItem(this.SESSION_ID, token);
  }

  public getSessionId(): string | null {
    return window.sessionStorage.getItem(this.SESSION_ID);
  }

  clearSessionStorage(): void {
    window.sessionStorage.clear();
  }
}
