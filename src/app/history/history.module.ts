import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { HistoryComponent } from './history.component';
import { HistoryRoutes } from './history.routing';
import { HistorylistComponent } from './historylist/historylist.component';
import { HistorydetailComponent } from './historydetail/historydetail.component';

@NgModule({

    imports: [CommonModule,
    RouterModule.forChild(HistoryRoutes),
    MdCardModule,
    MdInputModule, 
    FlexLayoutModule,
    NgxDatatableModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule],

    declarations: [HistoryComponent, HistorylistComponent, HistorydetailComponent]
})

export class HistoryModule {}