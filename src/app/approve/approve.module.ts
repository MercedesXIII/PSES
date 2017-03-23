import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { ApproveRoutes } from './approve.routing';
import { ApproveComponent } from './approve.component';
import { ApprovelistComponent } from './approvelist/approvelist.component';
import { ApprovedetailComponent } from './approvedetail/approvedetail.component';

@NgModule({

    imports: [CommonModule,
    RouterModule.forChild(ApproveRoutes),
    MdCardModule,
    MdInputModule, 
    FlexLayoutModule,
    NgxDatatableModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule],

    declarations: [ApproveComponent, ApprovelistComponent, ApprovedetailComponent]
})

export class ApproveModule {}