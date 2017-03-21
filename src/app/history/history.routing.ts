import { Component, OnInit } from '@angular/core';
import{ Routes, RouterModule} from '@angular/router'

import{ HistoryComponent } from './history.component'

export const HistoryRoutes: Routes = [
    {path:'',component:HistoryComponent}, 
]