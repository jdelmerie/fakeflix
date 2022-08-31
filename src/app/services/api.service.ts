import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

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

  public getMovieById(id: number) {
    return this.http.get<any>(environment.host + 'movie/' + id + '?api_key=' + environment.apiKey);
  }

  /**********************************************************************
   * 
   * AUTHENTIFICATION / LOGOUT
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
      body: { session_id }
    });
  }

  /**********************************************************************
   * 
   * ACCOUNT / FAV
   * 
   *********************************************************************/
  public getAccount() {
    return this.http.get<any>(environment.host + 'account?api_key=' + environment.apiKey + '&session_id=' + this.getSessionId());
  }

  public fav(media_id: number) {
    return this.http.post<any>(environment.host + 'account/' + this.getAccountId() + '/favorite?api_key=' + environment.apiKey + '&session_id=' + this.getSessionId(), {
      "media_type": "movie",
      "media_id": media_id,
      "favorite": true
    });
  }

  public getFavs() {
    return this.http.get<any>(environment.host + 'account/' + this.getAccountId() + '/favorite/movies?api_key=' + environment.apiKey + '&session_id=' + this.getSessionId());
  }

  /**********************************************************************
   * 
   * LOCAL STORAGE
   * 
   *********************************************************************/

  public saveSessionId(token: string): void {
    window.sessionStorage.removeItem('sessionID');
    window.sessionStorage.setItem('sessionID', token);
  }

  public getSessionId(): string | null {
    return window.sessionStorage.getItem('sessionID');
  }

  public saveAccountId(id: string): void {
    window.sessionStorage.removeItem('accountID');
    window.sessionStorage.setItem('accountID', id);
  }

  public getAccountId(): string | null {
    return window.sessionStorage.getItem('accountID');
  }

  clearSessionStorage(): void {
    window.sessionStorage.clear();
  }
}
