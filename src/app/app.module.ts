import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { JazzDialog } from './material/dialog/dialog.component';
import { ConfirmDialog, InsertDialog, InsertDialog2, InsertDialog3, NormalDialog, DialogComponent, Loading, TopAddEva, AddEmp, EvaFlow } from './shared/dialog/dialog.component';
//import { PopoverModule } from "ngx-popover";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AuthGuard } from '../_guards/auth.guard';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2CompleterModule } from "ng2-completer";
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
    InsertDialog,
    InsertDialog2,
    InsertDialog3,
    Loading,
    TopAddEva,
    AddEmp,
    EvaFlow
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
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
    Ng2CompleterModule,
    //PopoverModule,
    NgxDatatableModule
  ],
  providers: [AuthGuard],
  entryComponents: [JazzDialog, DialogComponent, ConfirmDialog, NormalDialog, InsertDialog, InsertDialog2, InsertDialog3, Loading, TopAddEva, AddEmp, EvaFlow],
  bootstrap: [AppComponent]
})
export class AppModule { }
