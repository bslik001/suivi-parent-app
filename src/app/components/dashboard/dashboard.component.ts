import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentService } from '../../services/parent.service';
import { Etudiant } from '../../models/etudiant.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  enfants: Etudiant[] = [];
  loading: boolean = true;

  constructor(private parentService: ParentService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.parentService.getMesEnfants().subscribe({
      next: (data) => {
        this.enfants = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  voirNotes(matricule: string) {
    this.router.navigate(['/notes', matricule]);
  }

  telechargerPlanning(classeId: number) {
    this.parentService.downloadPlanning(classeId);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}