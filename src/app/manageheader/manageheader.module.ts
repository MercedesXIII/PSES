import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { ManageheaderComponent } from './manageheader.component';
import { ManageheaderRoutes } from './manageheader.routing';

@NgModule({

    imports: [CommonModule, 
    RouterModule.forChild(ManageheaderRoutes), 
    MdCardModule,
    MdInputModule, 
    FlexLayoutModule,
    NgxDatatableModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule],

    declarations: [ManageheaderComponent]
})

export class ManageheaderModule {}