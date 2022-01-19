import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../entities/address';
const USER_API = 'http://localhost:8003/api/user/';
@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  constructor(private http: HttpClient) { }

  addAddress(adr:Address){
    return this.http.post<any>(USER_API + 'addAddress' , adr);
  }
  getAddress(){
    return this.http.get<any>(USER_API + 'getAddress');
  }
}
