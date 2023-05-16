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
  }

  
  LoadRent(i:any = null, j:any = null){
    this.ListRent = this.Rent.slice(i, j)
  }

  LoadListRent(){
    this.service.loadRent().subscribe(data =>{
      this.Rent = null
      this.Rent = data
      console.log(this.ListRent)
      this.Rent.forEach((r:any) =>{
        this.service.loadReaderName(r.ReaderID).subscribe(data =>{
          r.ReaderName = data[0].ReaderName
        })
        this.service.loadLibrarianName(r.LibrarianID).subscribe(data =>{
          r.LibrarianName = data[0].LibrarianName
        })
      })
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

  onInputChangerid(event: any){
    const inputValue = event.target.value
    let Rent_change : any  = []
    switch(inputValue){
      case '1 to n':
        Rent_change = this.Rent
        Rent_change.sort((Ra:any,Rb:any) =>{
          const renta = Ra.RentID
          const rentb = Rb.RentID
          if (renta < rentb) {
            return -1;
          }
          if (renta > rentb) {
            return 1;
          }
          return 0;
        })
        this.ListRent = Rent_change.slice(0, 5)
        break
      case 'n to 1':
        Rent_change = this.Rent
        Rent_change.sort((Ra:any,Rb:any) =>{
          const renta = Ra.RentID
          const rentb = Rb.RentID
          if (renta < rentb) {
            return 1;
          }
          if (renta > rentb) {
            return -1;
          }
          return 0;
        })
        this.ListRent = Rent_change.slice(0, 5)
        break
      case '':
        this.ListRent = this.Rent.slice(0, 5)
        this.totalpage = Math.ceil(this.Rent.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Rent.length; i++){
          if(this.Rent[i].RentID == inputValue){
            Rent_change.push(this.Rent[i])
          }
        }
        this.ListRent = Rent_change.slice(0, 5)
        this.totalpage = Math.ceil(Rent_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
  }

  onInputChangeln(event: any) {
    const inputValue = event.target.value;
    console.log(inputValue);
    let Rent_change : any = []
    switch(inputValue){
      case 'In alphabetical order':
        Rent_change = this.Rent
        Rent_change.sort((Ra:any,Rb:any) =>{
          const renta = Ra.LibrarianName.toLowerCase()
          const rentb = Rb.LibrarianName.toLowerCase()
          if (renta < rentb) {
            return -1;
          }
          if (renta > rentb) {
            return 1;
          }
          return 0;
        })
        this.ListRent = Rent_change.slice(0, 5)
        break
      case 'In reverse alphabetical order':
        Rent_change = this.Rent
        Rent_change.sort((Ra:any,Rb:any) =>{
          const renta = Ra.LibrarianName.toLowerCase()
          const rentb = Rb.LibrarianName.toLowerCase()
          if (renta < rentb) {
            return 1;
          }
          if (renta > rentb) {
            return -1;
          }
          return 0;
        })
        this.ListRent = Rent_change.slice(0, 5)
        break
      case '':
        this.ListRent = this.Rent.slice(0, 5)
        this.totalpage = Math.ceil(this.Rent.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Rent.length; i++){
          if(this.Rent[i].LibrarianName.toLowerCase().includes(inputValue.toLowerCase())){
            Rent_change.push(this.Rent[i])
          }
        }
        console.log(Rent_change)
        this.ListRent = Rent_change.slice(0, 5)
        this.totalpage = Math.ceil(Rent_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
    
  }

  onInputChangern(event: any) {
    const inputValue = event.target.value;
    console.log(inputValue);
    let Rent_change : any = []
    switch(inputValue){
      case 'In alphabetical order':
        Rent_change = this.Rent
        Rent_change.sort((Ra:any,Rb:any) =>{
          const renta = Ra.ReaderName.toLowerCase()
          const rentb = Rb.ReaderName.toLowerCase()
          if (renta < rentb) {
            return -1;
          }
          if (renta > rentb) {
            return 1;
          }
          return 0;
        })
        this.ListRent = Rent_change.slice(0, 5)
        break
      case 'In reverse alphabetical order':
        Rent_change = this.Rent
        Rent_change.sort((Ra:any,Rb:any) =>{
          const renta = Ra.ReaderName.toLowerCase()
          const rentb = Rb.ReaderName.toLowerCase()
          if (renta < rentb) {
            return 1;
          }
          if (renta > rentb) {
            return -1;
          }
          return 0;
        })
        this.ListRent = Rent_change.slice(0, 5)
        break
      case '':
        this.ListRent = this.Rent.slice(0, 5)
        this.totalpage = Math.ceil(this.Rent.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
      default:
        for(let i = 0; i < this.Rent.length; i++){
          if(this.Rent[i].ReaderName.toLowerCase().includes(inputValue.toLowerCase())){
            Rent_change.push(this.Rent[i])
          }
        }
        console.log(Rent_change)
        this.ListRent = Rent_change.slice(0, 5)
        this.totalpage = Math.ceil(Rent_change.length / 5)
        this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
        break
    }
    
  }

  onInputChangepdate(event : any){
    const inputValue = event.target.value;
    console.log(inputValue);
    let Rent_change : any = []
    for(let i = 0; i < this.Rent.length; i++){
      if(this.Rent[i].PublicationDate.split('T')[0] == inputValue){
        Rent_change.push(this.Rent[i])
      }
    }
    console.log(Rent_change)
    this.ListRent = Rent_change.slice(0, 5)
    this.totalpage = Math.ceil(Rent_change.length / 5)
    this.totalarr = Array.from({ length: this.totalpage }, (_, i) => i)
  }

  onInputChangedue(event: any){
    const inputValue = event.target.value;
  }

}
