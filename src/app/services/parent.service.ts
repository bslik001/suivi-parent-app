import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = 'http://localhost:8080/api/parent';

  constructor(private http: HttpClient) { }

  getMesEnfants(): Observable<Etudiant[]> {
    const phone = localStorage.getItem('parent_phone');
    return this.http.get<Etudiant[]>(`${this.apiUrl}/tous-mes-enfants/${phone}`);
  }

  downloadPlanning(classeId: number) {
    window.open(`http://localhost:8080/api/planning/download/${classeId}`, '_blank');
  }
}