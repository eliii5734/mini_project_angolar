import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../services/http-service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/shered-data-http';



@Component({
  selector: 'add-user',
  imports: [CommonModule, ReactiveFormsModule, NgPersianDatepickerModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css'
})
export class AddUser implements AfterViewInit {
  clicked: boolean = false;
  newUser: object = {};
  isloading: boolean = false;
  constructor(
    private cd: ChangeDetectorRef,
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService

  ) { }

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^(?=.*[A-Z])[a-zA-Z](?=.*[\\d\\W])[a-zA-Z\\d\\W]{3,15}$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    f_name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[\u0600-\u06FF]{3,}$')
    ]),
    l_name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[\u0600-\u06FF]{3,}$')
    ]),
    gender: new FormControl('', [
      Validators.required,
      Validators.pattern('^(male|female)$')
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('^(0|(\\+98))9\\d{9}$')
    ]),
    national_code: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{11}$')
    ]),
    birth_date: new FormControl(null, Validators.required),
  });
  myUsers: any;
  editingUser: boolean = false

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data) {
        this.editingUser = true;
        this.myUsers = data;
        console.log(data, this.myUsers);
        this.registerForm.patchValue(this.myUsers);
      } else {
        this.editingUser = false;
      }
    })
  }

  onSubmit() {
    this.clicked = true;
    this.cd.detectChanges();
    if (this.registerForm.valid) {
      this.newUser = {
        ...this.registerForm.value
      }
      console.log(this.newUser);
      this.addNewUser(this.myUsers.id);
    } else {
      console.log(' فرم معتبر نیست !! لطفا تمامی اطلاعات را به درستی وارد کنید.', this.registerForm);
    }
  }

  ngAfterViewInit(): void {
    this.registerForm.get('birth_date')?.setValue(null);
  }

  shouldShowError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && !(control.touched || control.dirty));
  }

  addNewUser(id : number) {
    this.isloading = true;
    this.cd.detectChanges();
    let token = localStorage.getItem('token') || "";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (this.editingUser) {
      this.httpService.put(`http://localhost:3000/users/${id}`,
        this.newUser, headers
      ).subscribe({
        error: (err) => alert(err.message)
      });
    } else {
      this.httpService.post('http://localhost:3000/users',
        this.newUser, headers
      ).subscribe({
        error: (err) => alert(err.message)
      });
    }
    this.goDashboard()
  }

  private goDashboard() {
    this.isloading = false;
    this.cd.detectChanges();
    this.router.navigate(['/dashboard']);
  }
}
