import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http : HttpClient,
    private router : Router,
  ) {}

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error:', error);
    let message = 'خطایی رخ داده است.';
    if (error.status === 0) {
      message = ' دقایقی صبر کنید !! ارتباط با سرور برقرار نشد.';
    } else if (error.status === 401) {
      message = 'شما لاگین نشده اید';
      this.router.navigate(['/login']);
    } else if (error.status === 500) {
      message = 'خطای داخلی سرور.';
    }
    return throwError(() => new Error(message));
  }

  private creatHeaders(headers?: HttpHeaders): HttpHeaders {
    const token = localStorage.getItem('token');
    let result = headers ?? new HttpHeaders({'Content-Type': 'application/json'} );
    if (token) {
      result = result.set('Authorization', `Bearer ${token}`);
    }
    return result;
  }


  get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { headers :  this.creatHeaders(headers)}).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { headers :  this.creatHeaders(headers)}).pipe(catchError(this.handleError));
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers :  this.creatHeaders(headers)}).pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
  return this.http.put<T>(url, body, { headers: this.creatHeaders(headers) }).pipe(
    catchError(this.handleError)
  );
}



}
