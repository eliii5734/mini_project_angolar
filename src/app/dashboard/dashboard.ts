import { Component } from '@angular/core';
import {DataService} from '../services/shered-data-http';
import { HttpService } from '../services/http-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(
    private dataService: DataService,
    private httpService: HttpService,
    private httpHeaders: HttpHeaders
  ) {}
  ngOnInit() {
  this.getDatafromServer();
  }

  myUsers: any[] = [];

  private getDatafromServer() {
    let token= localStorage.getItem('token') || "";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.httpService.get("http://192.168.180.181:9000/users" , {headers}).subscribe({
      next: (data) => {
        this.validationUser(data);
      },
      error: (err) => {
        alert(`Error: ${err.message}`);
      }
    });
  }

  private validationUser(data: any) {
    this.myUsers = data.result.data.items;
    console.log(this.myUsers);
  }
}
