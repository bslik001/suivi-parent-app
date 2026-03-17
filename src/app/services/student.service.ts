import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/notes';

  constructor(private http: HttpClient) { }

  // Récupérer les notes pour l'affichage tableau
  getNotes(matricule: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/etudiant/${matricule}`);
  }

  // Télécharger le PDF JasperReports
  downloadBulletin(matricule: string) {
  this.http.get(`http://localhost:8080/api/report/notes/pdf/${matricule}`, {
    responseType: 'blob' // TRÈS IMPORTANT
  }).subscribe((blob: Blob) => {
    // Création d'un lien invisible pour déclencher le téléchargement
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bulletin_${matricule}.pdf`;
    link.click();
    
    // Nettoyage de la mémoire
    window.URL.revokeObjectURL(url);
  });
  }
}