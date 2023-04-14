import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LBManageFE';
  login:boolean = false

  constructor(@Inject(DOCUMENT) private document: Document, private auth: AuthService) {}

  ngOnInit(): void {
    
    if(this.Logged()){
      const body = this.document.querySelector("body")
      const sidebar = this.document.querySelector(".sidebar")
      const toggle = this.document.querySelector(".toggle")
      const searchBtn = this.document.querySelector(".item-search")
      const modeSwitch = this.document.querySelector(".toggle-switch")
      const modeText = this.document.querySelector(".mode-text")

      toggle!.addEventListener('click', (event:Event) =>{
        sidebar!.classList.toggle("close")
      })

      modeSwitch?.addEventListener('click', (event:Event) =>{
        body!.classList.toggle("dark")

        if(body!.classList.contains("dark")){
          modeText!.innerHTML = 'Light Mode'
        }else{
          modeText!.innerHTML = 'Dark Mode'
        }
      });
    }
  }

  Logged(){
    return this.auth.Logged()
  }

  Logout(){
    this.auth.Logout()
  }

}
