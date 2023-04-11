import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from './book/book.component';
import { RentComponent } from './rent/rent.component';

const routes: Routes = [
  {path: 'book', component:BookComponent},
  {path: '', component:RentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
