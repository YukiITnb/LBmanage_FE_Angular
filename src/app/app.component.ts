import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LBManageFE';
  login:boolean = false
  Readers: any = 0
  Books: any = 0
  Rents: any = 0

  Load(){
    this.service.loadReader().subscribe(data =>{
      data.forEach((r:any) =>{
        this.Readers++
      })
    })
    this.service.loadBook().subscribe(data =>{
      data.forEach((r:any) =>{
        this.Books++
      })
    })
    this.service.loadRent().subscribe(data =>{
      data.forEach((r:any) =>{
        this.Rents++
      })
    })
  }


  constructor(@Inject(DOCUMENT) private document: Document, private auth: AuthService,private service:SharedService) {}

  ngOnInit(): void {
    this.Load()
  }

  closeSidebar(){
    const sidebar = this.document.querySelector(".sidebar")
    sidebar!.classList.toggle("close")
  }

  DarkMode(){
    const body = this.document.querySelector("body")
    const modeText = this.document.querySelector(".mode-text")
    body!.classList.toggle("dark")

    if(body!.classList.contains("dark")){
      modeText!.innerHTML = 'Light Mode'
      const sun = this.document.querySelector(".sun") as HTMLElement
      sun.style.opacity = '1'
    }else{
      modeText!.innerHTML = 'Dark Mode'
      const sun = this.document.querySelector(".sun") as HTMLElement
      sun.style.opacity = '0'
    }
  }

  Logged(){
    return this.auth.Logged()
  }

  Logout(){
    this.auth.Logout()
  }

}
