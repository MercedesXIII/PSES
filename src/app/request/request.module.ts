import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';

import { RequestComponent } from './request.component';

@NgModule({
  declarations: [RequestComponent],
  bootstrap: [RequestComponent],
  providers: []
})

export class RequestModule {}
//platformBrowserDynamic().bootstrapModule(RequestModule);