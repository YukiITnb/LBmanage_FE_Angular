import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentComponent } from './rent/rent.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { ReaderComponent } from './reader/reader.component';
@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    RentComponent,
    LoginComponent,
    ReaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
