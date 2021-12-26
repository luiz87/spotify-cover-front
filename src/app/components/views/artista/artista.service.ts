import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  baseUrl: String = environment.baseUrl
  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    const url = `${this.baseUrl}`
    return this.http.get<any[]>(url)
  }

  create(obj: any): Observable<any> {
    const url = `${this.baseUrl}`
    return this.http.post<any>(url, obj)
  }

  update(obj: any): Observable<any> {
    return this.http.put<any>(obj.link, obj)
  }

  delete(obj: any): Observable<any> {
    return this.http.delete<any>(obj.link)
  }

}
