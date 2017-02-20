import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { RequestComponent } from './request.component';
import { RequestRoutes } from './request.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RequestRoutes), MdCardModule, FlexLayoutModule],
  declarations: [RequestComponent]
})

export class RequestModule {}