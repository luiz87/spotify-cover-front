import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  constructor(private http: HttpClient) { }

  find(url: string): Observable<any> {
    return this.http.get<any[]>(url)
  }

  findAll(url: string): Observable<any> {
    return this.http.get<any[]>(url)
  }

  create(url: string, obj: any): Observable<any> {
    return this.http.post<any>(url, obj)
  }

  update(obj: any): Observable<any> {
    return this.http.put<any>(obj.link, obj)
  }

  delete(obj: any): Observable<any> {
    return this.http.delete<any>(obj.link)
  }

}
