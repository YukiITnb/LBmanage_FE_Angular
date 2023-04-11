import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  APIUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  loadRent():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + 'Rent')
  }

  addRent(val:any){
    return this.http.post(this.APIUrl + 'Rent', val)
  }
}