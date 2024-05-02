import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-band',
  standalone: true,
  imports: [],
  templateUrl: './band.component.html',
  styleUrl: './band.component.css'
})
export class BandComponent implements OnInit {

  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    
  }

  signOut(): void {
    this.auth.signOut();
  }
}
