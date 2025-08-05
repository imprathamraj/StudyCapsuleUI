import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capsule } from '../model/capsule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Capsules {
  private baseUrl = "http://localhost:8080/capsules"
  constructor(private http:HttpClient){

  }
  getAllCapsules(): Observable<Capsule[]> {
    return this.http.get<Capsule[]>(this.baseUrl);
  }

  getCapsuleById(id: number): Observable<Capsule> {
    return this.http.get<Capsule>(`${this.baseUrl}/${id}`);
  }

  addCapsule(capsule: Capsule): Observable<Capsule> {
    return this.http.post<Capsule>(this.baseUrl, capsule);
  }

  updateCapsule(id: number, capsule: Capsule): Observable<Capsule> {
    return this.http.put<Capsule>(`${this.baseUrl}/${id}`, capsule);
  }

  deleteCapsule(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
