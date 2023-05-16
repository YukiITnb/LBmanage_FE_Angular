import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit{
  ListReader:any = []
  Reader:any = []

  ReaderName:any
  ReaderEmail:any
  ReaderPhone:any
  
  totalpage:any
  totalarr:any = []
  primaryColor = '#695CFE'
  curPage:any = 0

  selectedValue:any

  constructor(private service:SharedService,private elementRef: ElementRef){}

  ngOnInit(): void {
    this.LoadListReader()
    this.LoadTotalPage()
  }

  
  LoadReader(i:any = null, j:any = null){
    this.ListReader = this.Reader.slice(i, j)
  }

  LoadListReader(){
    this.service.loadReader().subscribe(data =>{
      this.Reader = null
      this.Reader = data
      console.log(this.ListReader)
      this.LoadReader(0, 5)
    })
  }
  

  LoadTotalPage(){
    this.service.loadReader().subscribe(data =>{
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
    this.LoadReader((this.curPage) * 5, (this.curPage) * 5 + 5)
    const pag = this.elementRef.nativeElement.querySelector('.Active');
    pag.classList.toggle("Active")
    const target = event.target as HTMLElement;
    const parent = target.closest('li');
    parent!.classList.toggle("Active")
  }

  prevpage(){
    if(this.curPage < 1) return
    else{
      this.LoadReader((this.curPage - 1) * 5, (this.curPage - 1) * 5 + 5)
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
      this.LoadReader((this.curPage + 1) * 5, (this.curPage + 1) * 5 + 5)
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
      ReaderName:this.ReaderName,
      ReaderEmail:this.ReaderEmail,
      ReaderPhone:this.ReaderPhone
    }
    this.service.addReader(rent).subscribe(res =>{
      alert(res.toString())
    })
    this.closemodal()
    this.LoadReader(0, 5)
  }

  onInputChangerid(event: any){
    const inputValue = event.target.value
    let Reader_change : any  = []
    switch(inputValue){
      case '1 to n':
        Reader_change = this.Reader
        Reader_change.sort((Ra:any,Rb:any) =>{
          const readera = Ra.ReaderID
          const readerb = Rb.ReaderID
          if (readera < readerb) {
            return -1;
          }
          if (readera > readerb) {
            return 1;
          }
          return 0;
        })
        this.ListReader = Reader_change.slice(0, 5)
        break
      case 'n to 1':
        Reader_change = this.Reader
        Reader_change.sort((Ra:any,Rb:any) =>{
          const readera = Ra.ReaderID
          const readerb = Rb.ReaderID
          if (readera < readerb) {
            return 1;
          }
          if (readera > readerb) {
            return -1;
          }
          return 0;
        })
        this.ListReader = Reader_change.slice(0, 5)
        break
      case '':
        this.ListReader = this.Reader.slice(0, 5)
        this.totalpage = Math.ceil(this.Reader.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Reader.length; i++){
          if(this.Reader[i].ReaderID == inputValue){
            Reader_change.push(this.Reader[i])
          }
        }
        this.ListReader = Reader_change.slice(0, 5)
        this.totalpage = Math.ceil(Reader_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
  }

  onInputChangern(event: any) {
    const inputValue = event.target.value;
    console.log(inputValue);
    let Reader_change : any = []
    switch(inputValue){
      case 'In alphabetical order':
        Reader_change = this.Reader
        Reader_change.sort((Ra:any,Rb:any) =>{
          const readera = Ra.ReaderName.toLowerCase()
          const readerb = Rb.ReaderName.toLowerCase()
          if (readera < readerb) {
            return -1;
          }
          if (readera > readerb) {
            return 1;
          }
          return 0;
        })
        this.ListReader = Reader_change.slice(0, 5)
        break
      case 'In reverse alphabetical order':
        Reader_change = this.Reader
        Reader_change.sort((Ra:any,Rb:any) =>{
          const readera = Ra.ReaderName.toLowerCase()
          const readerb = Rb.ReaderName.toLowerCase()
          if (readera < readerb) {
            return 1;
          }
          if (readera > readerb) {
            return -1;
          }
          return 0;
        })
        this.ListReader = Reader_change.slice(0, 5)
        break
      case '':
        this.ListReader = this.Reader.slice(0, 5)
        this.totalpage = Math.ceil(this.Reader.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Reader.length; i++){
          if(this.Reader[i].ReaderName.toLowerCase().includes(inputValue.toLowerCase())){
            Reader_change.push(this.Reader[i])
          }
        }
        console.log(Reader_change)
        this.ListReader = Reader_change.slice(0, 5)
        this.totalpage = Math.ceil(Reader_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
    
  }

  onInputChangerp(event : any){
    const inputValue = event.target.value;
    console.log(inputValue);
    let Reader_change : any = []
    switch(inputValue){
      case '1 to n':
        Reader_change = this.Reader
        Reader_change.sort((Ra:any,Rb:any) =>{
          const readera = Ra.ReaderPhone
          const readerb = Rb.ReaderPhone
          if (readera < readerb) {
            return -1;
          }
          if (readera > readerb) {
            return 1;
          }
          return 0;
        })
        this.ListReader = Reader_change.slice(0, 5)
        break
      case 'n to 1':
        Reader_change = this.Reader
        Reader_change.sort((Ra:any,Rb:any) =>{
          const readera = Ra.ReaderPhone
          const readerb = Rb.ReaderPhone
          if (readera < readerb) {
            return 1;
          }
          if (readera > readerb) {
            return -1;
          }
          return 0;
        })
        this.ListReader = Reader_change.slice(0, 5)
        break
      case '':
        this.ListReader = this.Reader.slice(0, 5)
        this.totalpage = Math.ceil(this.Reader.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Reader.length; i++){
          if(this.Reader[i].ReaderPhone == inputValue){
            Reader_change.push(this.Reader[i])
          }
        }
        console.log(Reader_change)
        this.ListReader = Reader_change.slice(0, 5)
        this.totalpage = Math.ceil(Reader_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
  }

  onInputChangere(event : any){
    const inputValue = event.target.value;
    console.log(inputValue);
    let Reader_change : any = []
    switch(inputValue){
      case 'In alphabetical order':
        Reader_change = this.Reader
        Reader_change.sort((Ra:any,Rb:any) =>{
          const readera = Ra.ReaderEmail.toLowerCase()
          const readerb = Rb.ReaderEmail.toLowerCase()
          if (readera < readerb) {
            return -1;
          }
          if (readera > readerb) {
            return 1;
          }
          return 0;
        })
        this.ListReader = Reader_change.slice(0, 5)
        break
      case 'In reverse alphabetical order':
        Reader_change = this.Reader
        Reader_change.sort((Ra:any,Rb:any) =>{
          const readera = Ra.ReaderEmail.toLowerCase()
          const readerb = Rb.ReaderEmail.toLowerCase()
          if (readera < readerb) {
            return 1;
          }
          if (readera > readerb) {
            return -1;
          }
          return 0;
        })
        this.ListReader = Reader_change.slice(0, 5)
        break
      case '':
        this.ListReader = this.Reader.slice(0, 5)
        this.totalpage = Math.ceil(this.Reader.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Reader.length; i++){
          if(this.Reader[i].ReaderEmail.toLowerCase().includes(inputValue.toLowerCase())){
            Reader_change.push(this.Reader[i])
          }
        }
        console.log(Reader_change)
        this.ListReader = Reader_change.slice(0, 5)
        this.totalpage = Math.ceil(Reader_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
  }

}
