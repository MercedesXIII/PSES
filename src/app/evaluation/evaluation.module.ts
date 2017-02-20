import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { EvaluationComponent } from './evaluation.component';
import { EvaluationRoutes } from './evaluation.routing';

@NgModule({

  imports: [CommonModule, 
  RouterModule.forChild(EvaluationRoutes), 
  MdCardModule,
  MdInputModule, 
  FlexLayoutModule,
  NgxDatatableModule,
  MaterialModule],

  declarations: [EvaluationComponent]
})

export class EvaluationModule {}