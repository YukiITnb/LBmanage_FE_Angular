import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  ListBook:any = []
  Book:any = []

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

  
  LoadBook(i:any = null, j:any = null){
    this.ListBook = this.Book.slice(i, j)
  }

  LoadListBook(){
    this.service.loadBook().subscribe(data =>{
      this.Book = null
      this.Book = data
      console.log(this.ListBook)
      this.Book.forEach((b:any) => {
        this.service.loadAuthorName(b.AuthorID).subscribe(data =>{
          b.AuthorName = data[0].AuthorName
          // console.log(data[0].AuthorName)
        })
      });
      this.LoadBook(0, 5)
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
    this.LoadBook((this.curPage) * 5, (this.curPage) * 5 + 5)
    const pag = this.elementRef.nativeElement.querySelector('.Active');
    pag.classList.toggle("Active")
    const target = event.target as HTMLElement;
    const parent = target.closest('li');
    parent!.classList.toggle("Active")
  }

  prevpage(){
    if(this.curPage < 1) return
    else{
      this.LoadBook((this.curPage - 1) * 5, (this.curPage - 1) * 5 + 5)
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
      this.LoadBook((this.curPage + 1) * 5, (this.curPage + 1) * 5 + 5)
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
    this.LoadBook(0, 5)
  }

  onInputChangebid(event: any){
    const inputValue = event.target.value
    let Book_change : any  = []
    switch(inputValue){
      case '1 to n':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
          const booka = Ra.BookID
          const bookb = Rb.BookID
          if (booka < bookb) {
            return -1;
          }
          if (booka > bookb) {
            return 1;
          }
          return 0;
        })
        this.ListBook = Book_change.slice(0, 5)
        break
      case 'n to 1':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
          const booka = Ra.BookID
          const bookb = Rb.BookID
          if (booka < bookb) {
            return 1;
          }
          if (booka > bookb) {
            return -1;
          }
          return 0;
        })
        this.ListBook = Book_change.slice(0, 5)
        break
      case '':
        this.ListBook = this.Book.slice(0, 5)
        this.totalpage = Math.ceil(this.Book.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Book.length; i++){
          if(this.Book[i].BookID == inputValue){
            Book_change.push(this.Book[i])
          }
        }
        this.ListBook = Book_change.slice(0, 5)
        this.totalpage = Math.ceil(Book_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
  }

  onInputChangebtl(event: any) {
    const inputValue = event.target.value;
    console.log(inputValue);
    let Book_change : any = []
    switch(inputValue){
      case 'In alphabetical order':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
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
        this.ListBook = Book_change.slice(0, 5)
        break
      case 'In reverse alphabetical order':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
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
        this.ListBook = Book_change.slice(0, 5)
        break
      case '':
        this.ListBook = this.Book.slice(0, 5)
        this.totalpage = Math.ceil(this.Book.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Book.length; i++){
          if(this.Book[i].BookTitle.toLowerCase().includes(inputValue.toLowerCase())){
            Book_change.push(this.Book[i])
          }
        }
        console.log(Book_change)
        this.ListBook = Book_change.slice(0, 5)
        this.totalpage = Math.ceil(Book_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
    
  }

  onInputChangeaid(event : any){
    const inputValue = event.target.value;
    console.log(inputValue);
    let Book_change : any = []
    switch(inputValue){
      case 'In alphabetical order':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
          const booka = Ra.AuthorName.toLowerCase()
          const bookb = Rb.AuthorName.toLowerCase()
          if (booka < bookb) {
            return -1;
          }
          if (booka > bookb) {
            return 1;
          }
          return 0;
        })
        this.ListBook = Book_change.slice(0, 5)
        break
      case 'In reverse alphabetical order':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
          const booka = Ra.AuthorName.toLowerCase()
          const bookb = Rb.AuthorName.toLowerCase()
          if (booka < bookb) {
            return 1;
          }
          if (booka > bookb) {
            return -1;
          }
          return 0;
        })
        this.ListBook = Book_change.slice(0, 5)
        break
      case '':
        this.ListBook = this.Book.slice(0, 5)
        this.totalpage = Math.ceil(this.Book.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Book.length; i++){
          if(this.Book[i].AuthorName.toLowerCase().includes(inputValue.toLowerCase())){
            Book_change.push(this.Book[i])
          }
        }
        console.log(Book_change)
        this.ListBook = Book_change.slice(0, 5)
        this.totalpage = Math.ceil(Book_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
  }

  onInputChangeps(event : any){
    const inputValue = event.target.value;
    console.log(inputValue);
    let Book_change : any = []
    switch(inputValue){
      case 'In alphabetical order':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
          const booka = Ra.Publisher.toLowerCase()
          const bookb = Rb.Publisher.toLowerCase()
          if (booka < bookb) {
            return -1;
          }
          if (booka > bookb) {
            return 1;
          }
          return 0;
        })
        this.ListBook = Book_change.slice(0, 5)
        break
      case 'In reverse alphabetical order':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
          const booka = Ra.Publisher.toLowerCase()
          const bookb = Rb.Publisher.toLowerCase()
          if (booka < bookb) {
            return 1;
          }
          if (booka > bookb) {
            return -1;
          }
          return 0;
        })
        this.ListBook = Book_change.slice(0, 5)
        break
      case '':
        this.ListBook = this.Book.slice(0, 5)
        this.totalpage = Math.ceil(this.Book.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Book.length; i++){
          if(this.Book[i].Publisher.toLowerCase().includes(inputValue.toLowerCase())){
            Book_change.push(this.Book[i])
          }
        }
        console.log(Book_change)
        this.ListBook = Book_change.slice(0, 5)
        this.totalpage = Math.ceil(Book_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
  }

  onInputChangepdate(event : any){
    const inputValue = event.target.value;
    console.log(inputValue);
    let Book_change : any = []
    for(let i = 0; i < this.Book.length; i++){
      if(this.Book[i].PublicationDate.split('T')[0] == inputValue){
        Book_change.push(this.Book[i])
      }
    }
    console.log(Book_change)
    this.ListBook = Book_change.slice(0, 5)
    this.totalpage = Math.ceil(Book_change.length / 5)
    this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
  }

  onInputChangeqt(event : any){
    const inputValue = event.target.value;
    console.log(inputValue);
    let Book_change : any = []
    switch(inputValue){
      case '1 to n':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
          const booka = Ra.Quantity
          const bookb = Rb.Quantity
          if (booka < bookb) {
            return -1;
          }
          if (booka > bookb) {
            return 1;
          }
          return 0;
        })
        this.ListBook = Book_change.slice(0, 5)
        break
      case 'n to 1':
        Book_change = this.Book
        Book_change.sort((Ra:any,Rb:any) =>{
          const booka = Ra.Quantity
          const bookb = Rb.Quantity
          if (booka < bookb) {
            return 1;
          }
          if (booka > bookb) {
            return -1;
          }
          return 0;
        })
        this.ListBook = Book_change.slice(0, 5)
        break
      case '':
        this.ListBook = this.Book.slice(0, 5)
        this.totalpage = Math.ceil(this.Book.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Book.length; i++){
          if(this.Book[i].Quantity == inputValue){
            Book_change.push(this.Book[i])
          }
        }
        console.log(Book_change)
        this.ListBook = Book_change.slice(0, 5)
        this.totalpage = Math.ceil(Book_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
  }
  
}
