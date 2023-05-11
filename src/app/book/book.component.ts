import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  ListBook:any = []
  Rent:any = []

  BookTitle:any
  AuthorID:any
  Publisher:any
  Quantity:any
  
  totalpage:any
  totalarr:any = []
  primaryColor = '#695CFE'
  curPage:any = 0

  selectedValue:any

  constructor(private service:SharedService,private elementRef: ElementRef){}

  ngOnInit(): void {
    this.LoadListBook()
    this.LoadTotalPage()
  }

  
  LoadRent(i:any = null, j:any = null){
    this.ListBook = this.Rent.slice(i, j)
  }

  LoadListBook(){
    this.service.loadBook().subscribe(data =>{
      this.Rent = null
      this.Rent = data
      console.log(this.ListBook)
      this.LoadRent(0, 5)
    })
  }
  

  LoadTotalPage(){
    this.service.loadBook().subscribe(data =>{
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
      BookTitle:this.BookTitle,
      AuthorID:this.AuthorID,
      Publisher:this.Publisher,
      Quantity:this.Quantity
    }
    this.service.addBook(rent).subscribe(res =>{
      alert(res.toString())
    })
    this.closemodal()
    this.LoadRent(0, 5)
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    console.log(inputValue);
    let Rent_change : any = []
    if(inputValue == 'In alphabetical order'){
      Rent_change = this.Rent
      Rent_change.sort((Ra:any,Rb:any) =>{
        const booka = Ra.BookTitle.toLowerCase()
        const bookb = Rb.BookTitle.toLowerCase()
        if (booka < bookb) {
          return -1;
        }
        if (booka > bookb) {
          return 1;
        }
        return 0;
      })
      this.ListBook = Rent_change.slice(0, 5)
    }
    else if(inputValue == 'In reverse alphabetical order'){
      Rent_change = this.Rent
      Rent_change.sort((Ra:any,Rb:any) =>{
        const booka = Ra.BookTitle.toLowerCase()
        const bookb = Rb.BookTitle.toLowerCase()
        if (booka < bookb) {
          return 1;
        }
        if (booka > bookb) {
          return -1;
        }
        return 0;
      })
      this.ListBook = Rent_change.slice(0, 5)
    }
    else if(inputValue == 'Back'){
      Rent_change = this.Rent
      this.ListBook = Rent_change.slice(0, 5)
    }
    else{
      for(let i = 0; i < this.Rent.length; i++){
        if(this.Rent[i].BookTitle.toLowerCase().includes(inputValue.toLowerCase())){
          Rent_change.push(this.Rent[i])
        }
      }
      console.log(Rent_change)
      this.ListBook = Rent_change.slice(0, 5)
      this.totalpage = Math.ceil(Rent_change.length / 5)
      this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
    }
    
  }
  
}
