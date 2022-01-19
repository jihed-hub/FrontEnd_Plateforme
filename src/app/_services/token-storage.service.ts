import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const TOKEN1_KEY = 'token';
const GAME_KEY= 'game_id';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut(): void {
    window.localStorage.clear();
    window.sessionStorage.clear
  }
  public saveToken1(token1: string){
    window.sessionStorage.setItem(TOKEN1_KEY,token1);
  }
  public saveToken(token: string): void {
    //window.sessionStorage.removeItem(TOKEN_KEY);
   // window.sessionStorage.setItem(TOKEN_KEY, token);
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public saveGame(game): void {
    window.sessionStorage.removeItem(GAME_KEY);
    window.sessionStorage.setItem(GAME_KEY, JSON.stringify(game));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
  public getGame(): any {
    return JSON.parse(sessionStorage.getItem(GAME_KEY));
  }
}
