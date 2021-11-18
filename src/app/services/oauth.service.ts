import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { DISCORD_TOKEN_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private client_id: string;
  private client_secret: string;
  private redirect_uri: string;
  private token_url: string;

  constructor(private http: HttpClient, private _firebaseAuth: AngularFireAuth) {
    this.client_id = CLIENT_ID;
    this.client_secret = CLIENT_SECRET;
    this.redirect_uri = REDIRECT_URI;
    this.token_url = DISCORD_TOKEN_URL;
  }

  async logIn() {
    let userId: string = '';
    await this.getUser().toPromise().then(res => {
      userId = res.id;
    })
    return await this.http.post('http://localhost:3000/generate-token', {userId}).toPromise();
  }

  getToken(code: string): Observable<any> {
    const data = new HttpParams()
      .append('client_id', this.client_id)
      .append('client_secret', this.client_secret)
      .append('redirect_uri', this.redirect_uri)
      .append('grant_type', 'authorization_code')
      .append('code', code)
    
    return this.http.post(this.token_url, data);
  }

  getUser(): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get('https://discord.com/api/v8/users/@me', {headers});
  }

  getGuilds(): Observable<any> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get('https://discord.com/api/v8/users/@me/guilds', {headers});
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('premium');
    const data = new HttpParams()
      .append('client_id', this.client_id)
      .append('client_secret', this.client_secret)
      .append('grant_type', 'authorization_code')
      .append('refresh_token', localStorage.getItem('refresh_token') || '')
    this.http.post(this.token_url, data)
    this._firebaseAuth.signOut();
    window.location.href = '/';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

}
