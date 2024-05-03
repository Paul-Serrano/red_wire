import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-band',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './band.component.html',
  styleUrl: './band.component.css'
})
export class BandComponent implements OnInit {
  logged:boolean = false;

  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if(loggedInUser) this.logged = true;
  }

  signOut(): void {
    this.auth.signOut();
  }
}
