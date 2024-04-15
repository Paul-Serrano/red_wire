import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rgpd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rgpd.component.html',
  styleUrl: './rgpd.component.css',
})
export class RgpdComponent {
  private router = inject(Router);
  accept() {
    this.router.navigate(['login']);
  }
}
