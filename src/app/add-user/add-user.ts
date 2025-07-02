import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../services/http-service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'add-user',
  imports: [CommonModule, ReactiveFormsModule, NgPersianDatepickerModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css'
})
export class AddUser implements AfterViewInit {
  clicked: boolean = false;
  newUser:object={};
  isloading: boolean = false;
  constructor(
    private cd: ChangeDetectorRef,
    private httpService: HttpService,
    private router: Router

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
    date_employed: new FormControl(null, Validators.required)
  });

  onSubmit() {
    this.clicked = true;
    this.cd.detectChanges();
    if (this.registerForm.valid) {
      this.newUser={
        ...this.registerForm.value,
        internal_number: '3101010',
        internal_number_type: 1,
        webrtc_username: '',
        webrtc_password: '',
        role_name: 'user',
        enable: true
      }
      console.log(this.newUser);
      this.addNewUser();
    } else {
      alert(' فرم معتبر نیست !! لطفا تمامی اطلاعات را به درستی وارد کنید.');
    }
  }

  ngAfterViewInit(): void {
    this.registerForm.get('birth_date')?.setValue(null);
    this.registerForm.get('date_employed')?.setValue(null);
  }

  shouldShowError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && !(control.touched || control.dirty));
  }

   addNewUser() {
    this.isloading = true;
    this.cd.detectChanges();
    let token = localStorage.getItem('token') || "";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.httpService.post('http://192.168.180.181:9000/users/create-user' ,
        this.newUser , headers
      ).subscribe({
    next: (data) => this.checkUserAdded(data),
    error: (err) => alert(err.message)
  });
  }

  private checkUserAdded(data: any) {
  this.isloading = false;
  this.cd.detectChanges();
    console.log(data.result.data.items)
  }
}
