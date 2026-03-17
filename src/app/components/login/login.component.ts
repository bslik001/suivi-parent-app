import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnDestroy {
  phone: string = '';
  otp: string = '';
  step: number = 1; // 1: Saisie phone, 2: Saisie OTP
  
  timeLeft: number = 900; // 15 minutes en secondes
  interval: any;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.errorMessage = "Le code a expiré. Veuillez en redemander un.";
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  onSendOtp() {
    this.authService.sendOtp(this.phone).subscribe({
      next: () => {
        this.step = 2;
        this.startTimer();
      },
      error: (err) => this.errorMessage = "Numéro non reconnu."
    });
  }

  onVerifyOtp() {
    this.authService.verifyOtp(this.phone, this.otp).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.errorMessage = "Code incorrect ou expiré."
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  stopTimer() {
    if (this.interval) clearInterval(this.interval);
  }
}