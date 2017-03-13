import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { JazzDialog } from './material/dialog/dialog.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ConfirmDialog } from './shared/dialog/dialog.component';
import { NormalDialog } from './shared/dialog/dialog.component';

import { AuthGuard } from '../_guards/auth.guard';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule }       from './shared/shared.module';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { RequestComponent } from './request/request.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    JazzDialog,
    DialogComponent,
    ConfirmDialog,
    NormalDialog,
    RequestComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    ReactiveFormsModule,
    Ng2AutoCompleteModule,
  ],
  providers: [AuthGuard],
  entryComponents: [ JazzDialog,DialogComponent,ConfirmDialog,NormalDialog ],
  bootstrap: [AppComponent]
})
export class AppModule { }
