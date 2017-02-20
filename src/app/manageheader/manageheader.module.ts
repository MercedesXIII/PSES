import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ManageheaderComponent } from './manageheader.component';
import { ManageheaderRoutes } from './manageheader.routing';
import { HeadertopComponent } from './headertop/headertop.component';
import { HeadermidComponent } from './headermid/headermid.component';
import { HeaderbotComponent } from './headerbot/headerbot.component';
import { SelectjobComponent } from './headertop/selectjob/selectjob.component';
import { HeaderComponent } from './headertop/header/header.component';

@NgModule({

  imports: [CommonModule, 
  RouterModule.forChild(ManageheaderRoutes), 
  MdCardModule,
  MdInputModule, 
  FlexLayoutModule,
  NgxDatatableModule,
  MaterialModule],

  declarations: [ManageheaderComponent, 
  HeadertopComponent, 
  HeadermidComponent, 
  HeaderbotComponent,
  SelectjobComponent,
  HeaderComponent]
})

export class ManageheaderModule {}