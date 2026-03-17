import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentService } from '../../services/parent.service';
import { Etudiant } from '../../models/etudiant.model';
import { Router } from '@angular/router';

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

  constructor(private parentService: ParentService, private router: Router) {}

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
}