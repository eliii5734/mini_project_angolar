import { Component } from '@angular/core';
import { UserCard } from "./user-card/user-card";
import { HttpService } from '../services/http-service';

@Component({
  selector: 'users-conyainar',
  imports: [UserCard],
  templateUrl: './users-conyainar.html',
  styleUrl: './users-conyainar.css'
})
export class UsersConyainar {
    constructor(private httpService: HttpService) {}

ngOnInit() {
  this.httpService.get('http://localhost:3000/users').subscribe({
    next: (data) => console.log('Users:', data),
    error: (err) => alert(err.message)
  });
}
}
