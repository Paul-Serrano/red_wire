import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-history.component.html',
  styleUrl: './weather-history.component.css'
})
export class WeatherHistoryComponent implements OnInit {
  user!: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = history.state.passed_user;
    console.log(this.user);
  }
}
