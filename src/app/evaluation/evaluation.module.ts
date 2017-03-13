import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MaterialModule} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { HttpModule } from '@angular/http';

import { EvaluationComponent } from './evaluation.component';
import { EvaluationRoutes } from './evaluation.routing';
import { EvalistComponent } from './evalist/evalist.component';
import { GetevalistComponent } from './getevalist/getevalist.component';
import { EvaformComponent } from './evaform/evaform.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({

  imports: [CommonModule, 
  RouterModule.forChild(EvaluationRoutes), 
  MdCardModule,
  MdInputModule, 
  FlexLayoutModule,
  NgxDatatableModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  Ng2AutoCompleteModule],

  declarations: [EvaluationComponent, EvalistComponent, GetevalistComponent, EvaformComponent]
})

export class EvaluationModule {}