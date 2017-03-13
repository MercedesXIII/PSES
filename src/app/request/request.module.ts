import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MaterialModule} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { HttpModule } from '@angular/http';
import { AccordionModule } from 'ng2-accordion';

import { RequestComponent } from './request.component';
import { RequestRoutes } from './request.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RequestRoutes), 
  			MdCardModule, FlexLayoutModule,NgxDatatableModule,
  			FormsModule,ReactiveFormsModule,HttpModule,TranslateModule
  			,MdInputModule,MaterialModule,AccordionModule],
  declarations: [RequestComponent],
})

export class RequestModule {}