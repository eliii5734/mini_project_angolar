import { Component } from '@angular/core';
import { DataService } from '../services/shered-data-http';
import { HttpService } from '../services/http-service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(
    private dataService: DataService,
    private httpService: HttpService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) { }

  isloading: boolean = true;
  myUsers$!: Observable<User[]>


  ngOnInit() {
    let token = localStorage.getItem('token') || "";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    this.getData(headers)

  }


  private sendDataToDOM(data: any) {
    this.myUsers$ = of(data);
    this.cd.detectChanges();
  }
  private getData(headers: any) {
    this.httpService.get<User>("http://localhost:3000/users", headers).pipe(
      map(data => {
        return data;
      }),
      catchError(err => {
        this.isloading = false;
        this.cd.detectChanges();

        console.error('خطا در دریافت اطلاعات:', err);
        return throwError(() => err);

      })
    ).subscribe(result => {
      this.isloading = false;
      this.cd.detectChanges();
      this.sendDataToDOM(result);

    });
  }
  goToAddUserPage() {
    this.router.navigate(['/addUser']);
  }

  deleteUser(id: number) {
    this.httpService.delete(`http://localhost:3000/users/${id}`)
      .subscribe({
        error: (error) => {
          alert(`خطا در حذف:${error}` );
        },
        complete: () => {
          alert('عملیات حذف کامل شد.');
          this.ngOnInit()
        }
      });

  }

  editUser(id : number){
    this.myUsers$.subscribe(data =>{
      const userToEdit = data.find(user => user.id === id);
      this.dataService.sendData(userToEdit)
    })
    this.goToAddUserPage()
  }

}
