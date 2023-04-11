import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  
  ListRent:any = []
  Rent:any = []
  librarianID:any
  readerID:any
  dueDate:any
  Rentstatus:any
  totalpage:any
  totalarr:any = []
  primaryColor = '#695CFE'
  curPage:any = 0
  CurDate = new Date()
  currentDateTimeString = this.CurDate.toISOString();

  constructor(private service:SharedService,private elementRef: ElementRef){}

  ngOnInit(): void {
    this.LoadListRent()
    this.LoadTotalPage()
    console.log(this.currentDateTimeString)
  }

  
  LoadRent(i:any = null, j:any = null){
    this.ListRent = this.Rent.slice(i, j)
  }

  LoadListRent(){
    this.service.loadRent().subscribe(data =>{
      this.Rent = null
      this.Rent = data
      console.log(this.ListRent)
      this.LoadRent(0, 5)
    })
  }
  

  LoadTotalPage(){
    this.service.loadRent().subscribe(data =>{
      this.totalpage = Math.ceil(data.length / 5)
      this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
      console.log(this.totalarr)
    })
  }

  changepage(item:any,event:MouseEvent){
    this.curPage = item
    this.change(event)
  }

  change(event:MouseEvent){
    this.LoadRent((this.curPage) * 5, (this.curPage) * 5 + 5)
    const pag = this.elementRef.nativeElement.querySelector('.Active');
    pag.classList.toggle("Active")
    const target = event.target as HTMLElement;
    const parent = target.closest('li');
    parent!.classList.toggle("Active")
  }

  prevpage(){
    if(this.curPage < 1) return
    else{
      this.LoadRent((this.curPage - 1) * 5, (this.curPage - 1) * 5 + 5)
      this.curPage = this.curPage - 1
      const pag = this.elementRef.nativeElement.querySelector('.Active');
      pag.classList.toggle("Active")
      const prevpag = pag.previousElementSibling ;
      prevpag.classList.toggle("Active")
    }
  }

  nextpage(){
    if(this.curPage >= this.totalpage - 1) return
    else{
      this.LoadRent((this.curPage + 1) * 5, (this.curPage + 1) * 5 + 5)
      this.curPage = this.curPage + 1
      const pag = this.elementRef.nativeElement.querySelector('.Active');
      pag.classList.toggle("Active")
      const nextpag = pag.nextElementSibling;
      nextpag.classList.toggle("Active")
    }
  }

  openmodal(){
    const loginmodal = this.elementRef.nativeElement.querySelector('.loginmodal') as HTMLElement;
    loginmodal.style.display = 'flex'
  }

  closemodal(){
    const loginmodal = this.elementRef.nativeElement.querySelector('.loginmodal') as HTMLElement;
    loginmodal.style.display = 'none'
  }

  submitAdd(){
    var rent = {
      LibrarianID:this.librarianID,
      ReaderID:this.readerID,
      DueDate:this.dueDate
    }
    this.service.addRent(rent).subscribe(res =>{
      alert(res.toString())
    })
    this.closemodal()
    this.LoadRent(0, 5)
  }

}
