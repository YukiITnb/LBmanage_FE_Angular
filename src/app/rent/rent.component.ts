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
    this.LoadRent(0, 5)
    this.LoadTotalPage()
    this.setCurPage()
    console.log(this.currentDateTimeString)
  }

  LoadRent(i:any = null, j:any = null){
    this.service.loadRent().subscribe(data =>{
      this.ListRent = null
      this.ListRent = data.slice(i,j)
    })
  }

  LoadTotalPage(){
    this.service.loadRent().subscribe(data =>{
      this.totalpage = Math.ceil(data.length / 5)
      this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
      console.log(this.totalarr)
    })
  }

  setCurPage(){
    setTimeout(() => {
      const pag = this.elementRef.nativeElement.querySelector('.Pag');
      pag.setAttribute('id','Active')
    }, 200);
  }

  changepage(item:any){
    this.LoadRent(item * 5, item * 5 + 5)
    this.curPage = item
  }

  prevpage(){
    if(this.curPage < 1) return
    else{
      this.LoadRent((this.curPage - 1) * 5, (this.curPage - 1) * 5 + 5)
      this.curPage = this.curPage - 1
    }
      
  }

  nextpage(){
    if(this.curPage > this.totalpage - 1) return
    else{
      this.LoadRent((this.curPage + 1) * 5, (this.curPage + 1) * 5 + 5)
      this.curPage = this.curPage + 1
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
    console.log(rent)
    this.closemodal()
    this.LoadRent(0, 5)
  }

}
