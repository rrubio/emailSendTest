import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ControlMessages } from './control-messages/control-messages.component';
import { ValidationService } from './services/validation.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlMessages
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    ValidationService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
