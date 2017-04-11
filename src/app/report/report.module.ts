import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { HttpModule } from '@angular/http';
import { PopoverModule } from "ngx-popover";

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ReportComponent } from './report.component';
import { ReportRoutes } from './report.routing';
import { ReportviewComponent } from './reportview/reportview.component';
import { ReportcriteriaComponent } from './reportcriteria/reportcriteria.component';

@NgModule({

    imports: [CommonModule,
        RouterModule.forChild(ReportRoutes),
        MdCardModule,
        MdInputModule,
        FlexLayoutModule,
        NgxDatatableModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        Ng2AutoCompleteModule,
        PopoverModule],

    declarations: [ReportComponent, ReportviewComponent, ReportcriteriaComponent]
})

export class ReportModule { }