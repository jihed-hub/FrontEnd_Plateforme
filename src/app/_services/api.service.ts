import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const ADMIN_API = 'http://localhost:8003/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  delFile(id: string){
    return this.http.delete<any>(ADMIN_API +'delFile'+"?id=" + id);
  }
}
