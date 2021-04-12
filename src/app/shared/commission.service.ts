import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  readonly rootURL ="https://certicore.azurewebsites.net/api/v1/espaceclient/users/me/";
  constructor(private http : HttpClient) { }
  getCommissions(){
 
    
   return this.http.get(this.rootURL + 'commissions',{headers: new HttpHeaders({'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjRhNjI5NTU0LTRkZDQtNDNjYy04YjBhLWRkNGRjM2RmZDFjNiIsIm5iZiI6MTYwMzE4NTE4NSwiZXhwIjoxNjAzNzg5OTg1LCJpYXQiOjE2MDMxODUxODV9.RVQtzMGoMjlnyEcc2gu2klac6YhNscU1y9jIQIkgsUI'})}).toPromise(); 
  
  }
}
