import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from '../_guards/auth.guard';

import { RequestComponent } from './request/request.component'

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'evaluation',
  pathMatch: 'full',
}, {
  path: '',
  component: AdminLayoutComponent, canActivate: [AuthGuard],
  children: [
    //   {
    //   path: 'home',
    //   loadChildren: './dashboard/dashboard.module#DashboardModule'
    // }, 
    {
      path: 'approve',
      loadChildren: './approve/approve.module#ApproveModule'
    }, {
      path: 'history',
      loadChildren: './history/history.module#HistoryModule'
    }, {
      path: 'evaluation',
      loadChildren: './evaluation/evaluation.module#EvaluationModule'
    }, {
      path: 'manageheader',
      loadChildren: './manageheader/manageheader.module#ManageheaderModule'
    }, {
      path: 'request',
      component: RequestComponent
    },]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];