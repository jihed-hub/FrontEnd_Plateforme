import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
});

private baseUrluser = 'http://localhost:8003/api/admin';

getClientt(): Observable<any> {
  return this.http.get(this.baseUrluser + '/getclientsinactifs', {
    headers: this.header});
}
activateuserclient(idclient : number): Observable<any>{
  const searchModelUrl = `${this.baseUrluser}/adduserclient/${idclient}`;
  return this.http.post(searchModelUrl, {
    headers: this.header});
}
removeuserclient(idclient : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deleteuserclient/${idclient}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});
}
getnbrdemandesinscriptionsnotifs(): Observable<any> {
  return this.http.get(this.baseUrluser + '/getnbrdemandesinscriptionsnotifications', {
    headers: this.header});
}

setdemandesinsriptsnotifications(): Observable<any> {
  return this.http.put(this.baseUrluser + '/setdemandesnotifications', {
    headers: this.header});
}
getadmin(): Observable<any> {
  return this.http.get(this.baseUrluser + '/Findadmin'  , {
    headers: this.header});
}
getAllClient(): Observable<any> {
  return this.http.get(this.baseUrluser + '/getAllClient', {
    headers: this.header});
}
removeclient(idclient : number) : Observable<any> {
  const searchModelUrl = `${this.baseUrluser}/deleteclient/${idclient}`;
  return this.http.delete(searchModelUrl, {
    headers: this.header, responseType: 'text'});


}



}
