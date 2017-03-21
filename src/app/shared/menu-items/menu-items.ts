import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}
//https://klarsys.github.io/angular-material-icons/
const MENUITEMS = [
  {
    state: 'home',
    name: 'HOME',
    type: 'link',
    icon: 'home'
  },

  {
    state: 'history',
    name: 'History',
    type: 'link',
    icon: 'history'
  },

  {
    state: 'evaluation',
    name: 'Evaluation',
    type: 'link',
    icon: 'accessibility'
  },
  
  {
    state: 'manageheader',
    name: 'Manage Header',
    type: 'link',
    icon: 'playlist_add'
  },
  
  {
    state: 'request',
    name: 'Request',
    type: 'link',
    icon: 'https'
  },
  // {
  //   state: 'approval',
  //   name: 'Approval',
  //   type: 'link',
  //   icon: 'assignment'
  // },
  // {
  //   state: 'inprogress',
  //   name: 'In Progress',
  //   type: 'link',
  //   icon: 'queue'
  // },
  // {
  //   state: 'approved',
  //   name: 'Approved',
  //   type: 'link',
  //   icon: 'assignment_turned_in'
  // },
  // {
  //   state: 'rejected',
  //   name: 'Rejected',
  //   type: 'link',
  //   icon: 'assignment_returned'
  // }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}