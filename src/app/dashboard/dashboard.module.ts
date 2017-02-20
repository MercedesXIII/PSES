import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdCardModule, MdButtonModule, MdListModule, MdProgressBarModule, MdMenuModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), HttpModule, TranslateModule, MdIconModule, MdCardModule, MdButtonModule, MdListModule, MdProgressBarModule, MdMenuModule, ChartsModule, NgxDatatableModule, FlexLayoutModule],
  declarations: [DashboardComponent]
})

export class DashboardModule {}