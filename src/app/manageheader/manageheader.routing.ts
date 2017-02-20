import { Component, OnInit } from '@angular/core';
import{ Routes, RouterModule} from '@angular/router'

import{ HeadertopComponent } from './headertop/headertop.component'

export const ManageheaderRoutes: Routes = [
    {path:'',component:HeadertopComponent}, 
]
