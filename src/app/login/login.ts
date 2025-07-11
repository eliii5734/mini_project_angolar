import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http-service';
import { Router } from '@angular/router';
import {DataService} from '../services/shered-data-http';


@Component({
  selector: 'login-modal',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(
    private httpService: HttpService ,
    private router: Router,
    private dataService : DataService) {}

  checkLoginUser(username: string, password: string) {
    if(username && password) {
      this.httpService.post('http://localhost:3000/users/login' ,
        { username, password }
      ).subscribe({
    next: (data) => {
      this.validationUser(data)
    },
    error: (err) => alert(err.message)
  });
    }
  }

  private validationUser(data: any) {
    if(data.hasError){
      alert(data.messages[0]);
    }else{
      localStorage.setItem('token', data.token);
      this.router.navigate(['/dashboard']);
    }
  }

}
