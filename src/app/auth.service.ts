import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(Username:string = '', Password:string = ''){
    if (Username == 'huan' && Password == '1234') {
      localStorage.setItem('Username', 'huan');
      localStorage.setItem('Password', '1234');
      return true
    }
    return false
  }

  public Logged(){
    const Username = localStorage.getItem('Username');
    const Password = localStorage.getItem('Password');
    if (Username == 'huan' && Password == '1234') {
      return true
    }
    return false
  }

  public Logout(){
    localStorage.removeItem('Username');
    localStorage.removeItem('Password');
  }
}
