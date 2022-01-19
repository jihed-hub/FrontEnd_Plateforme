import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Client } from '../entities/client';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }
  header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Authorization': 'Bearer ' + this.token.getToken()
  });
  private baseUrluser = 'http://localhost:8003/api/user';
  private baseUrluser1 = 'http://localhost:8003/api/test';

  client: Client ;

  getUser(): Observable<any> {
    return this.http.get(this.baseUrluser + '/FinduserById', {
      headers: this.header});
  }
  getclient(): Observable<any> {
    return this.http.get(this.baseUrluser + '/FindclientById'  , {
      headers: this.header});
  }
  submiteditprofil_completeprofil(client: Client,currentfile: File): Observable<Client> {
    const formData: FormData = new FormData();
    formData.append('file', currentfile);
      return this.http.post<Client>(this.baseUrluser + '/ajoutclt_sansverif/'
    + `${client.firstNameclt}`  + "/" + `${client.lastNameclt}` + "/" + `${client.emailclt}`
    + "/" + `${client.adresseclt}` + "/" + `${client.telclt}`, formData , {headers: this.header}); 
  }
  getUserr(id : number): Observable<any> {
      return this.http.get(this.baseUrluser1 + '/Finduserr/'+`${id}`, {headers: this.header});
  }
 /* edit_client(client): Observable<any> {
    return this.http.put(this.baseUrluser + '/edit_client', {
      firstNameclt: client.firstNameclt,
      emailclt: client.emailclt,
      lastNameclt: client.lastNameclt,
      telclt: client.telclt,
      adresseclt: client.adresseclt,
    }, httpOptions);
  } */
  submiteditprofilwithoutphoto(client: Client): Observable<Client> {
  return this.http.post<Client>(this.baseUrluser + '/edit_client12/' 
  + `${client.firstNameclt}`  + "/" + `${client.lastNameclt}` + "/" + `${client.emailclt}`
  + "/" + `${client.adresseclt}` + "/" + `${client.telclt}` ,  {headers: this.header,responseType:'json'} );

}
submiteditprofilwithoutphoto_completeprofil(client: Client): Observable<Client> {
   

  // tslint:disable-next-line: align
 
  // tslint:disable-next-line: align
return this.http.post<Client>(this.baseUrluser + '/ajoutclt_sansverif2/'  + `${client.firstNameclt}`  + "/" + `${client.lastNameclt}` + "/" + `${client.emailclt}`

+ "/" + `${client.adresseclt}` + "/" + `${client.telclt}` 

  ,  {headers: this.header} );

}

  
}
