import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-notes-view',
  standalone: true,
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class NotesViewComponent implements OnInit {
  matricule: string = '';
  notes: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.matricule = this.route.snapshot.paramMap.get('matricule') || '';
    if (this.matricule) {
      this.loadNotes();
    }
  }

  loadNotes() {
    this.studentService.getNotes(this.matricule).subscribe({
      next: (data) => {
        this.notes = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  exportPdf() {
    this.studentService.downloadBulletin(this.matricule);
  }
}