import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Game } from '../entities/game';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ 
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient, private token: TokenStorageService) { } 
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
  }); 
  private baseUrlgame = 'http://localhost:8003/api/game';
  private game:Game;
  creategame(game:Game){ 
    return this.http.post<any>(this.baseUrlgame +'/create',game, {headers: this.header,responseType:'json'});
  }
  getGamesToJoin():Observable<any>{
    return this.http.get(this.baseUrlgame +'/list',{responseType:'json'});
  }
  join(id:number){
    return this.http.post<any>(`${this.baseUrlgame}/join/${id}`,{headers: this.header,responseType:'json'});
  }
  getPlayerGames():Observable<any>{
    return this.http.get(this.baseUrlgame +'/player/list',{responseType:'json'});
  }
  getInitialData(){
    return this.http.get<any>(`${this.baseUrlgame}/gamepropreties`,{headers: this.header,responseType:'json'});
  }
  getInitialData1(id:number){
    return this.http.get<any>(`${this.baseUrlgame}/gamepropreties/${id}`,{headers: this.header,responseType:'json'});
  }

}
