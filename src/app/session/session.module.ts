import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '@angular/material';
import { HttpModule, Http } from '@angular/http';

import { SessionRoutes } from './session.routing';

import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

import { SharedModule }       from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, HttpModule, SharedModule, RouterModule.forChild(SessionRoutes), MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
  declarations: [NotFoundComponent, ErrorComponent, ForgotComponent, LockscreenComponent, SigninComponent, SignupComponent]
})

export class SessionModule {}