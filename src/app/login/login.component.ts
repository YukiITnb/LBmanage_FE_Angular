import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  Username: any
  Password: any
  isLogged: boolean = false

  constructor( private auth:AuthService, private router:Router){}

  ngOnInit(): void {
      
  }

  LoginHandle(){
    this.isLogged = false
    if (this.auth.login(this.Username, this.Password)) {
      this.isLogged = true
    }
    console.log(this.Username,this.Password,this.isLogged)
    if(this.isLogged == true)
      this.router.navigateByUrl('/');
  }
}
