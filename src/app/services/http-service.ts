import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error:', error);
    let message = 'خطایی رخ داده است.';
    if (error.status === 0) {
      message = 'ارتباط با سرور برقرار نشد.';
    } else if (error.status === 404) {
      message = 'یافت نشد.';
    } else if (error.status === 500) {
      message = 'خطای داخلی سرور.';
    }
    return throwError(() => new Error(message));
  }

    get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { headers }).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { headers }).pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers }).pipe(catchError(this.handleError));
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers }).pipe(catchError(this.handleError));
  }
}
