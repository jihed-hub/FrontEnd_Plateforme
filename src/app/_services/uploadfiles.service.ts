import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {
  private baseUrl = 'http://localhost:8003/api/admin';
  private baseUrl1 = 'http://localhost:8003/api/v1';
  private baseUrl2 = 'http://localhost:8003';
  private baseUrluser = 'http://localhost:8003/api/user';
  private url = 'http://localhost:8003/api';

  constructor(private http: HttpClient) { }

  upload(file: File,thematicid: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST',`${this.baseUrl}/uploadFile/${thematicid}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  getFilesUser(): Observable<any> {
    return this.http.get(`${this.baseUrluser}/files`);
  }
  
  getFileswithlimitof4rows(): Observable<any> {
    return this.http.get(`${this.baseUrluser}/files`);
  }
  getThematics():Observable<any>{
    return this.http.get(`${this.baseUrl1}/thematics`,{responseType: 'json'});
  }
  getThematicsUser():Observable<any>{
    return this.http.get(`${this.baseUrluser}/thematics`,{responseType: 'json'});
  }
  getSubthematics(thematicid: number):Observable<any>{
    return this.http.get(`${this.baseUrl2}/getsubthematics/${thematicid}`,{responseType: 'json'});
  }
  getFilesBySubThematicId(subthematicid: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/files/${subthematicid}`);
  }
  downloadFile(fileid: string): any {
		return this.http.get(`${this.baseUrluser}/downloadFile/${fileid}`, {responseType: 'blob'});
  }
  download(file: string | undefined): Observable<Blob> {
    return this.http.get(`${this.baseUrluser}/files/${file}`, {
      responseType: 'blob'
    });
  }
}
