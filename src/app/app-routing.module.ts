import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from './book/book.component';
import { RentComponent } from './rent/rent.component';
import { LoginComponent } from './login/login.component';
import { GaurderGuard } from './gaurder.guard';

const routes: Routes = [
  {path: 'book', component:BookComponent},
  { path: '', redirectTo: '/rent', pathMatch: 'full'},
  {path: 'rent', component:RentComponent, canActivate: [GaurderGuard]},
  {path: 'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
