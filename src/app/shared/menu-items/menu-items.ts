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
  // {
  //   state: 'home',
  //   name: 'HOME',
  //   type: 'link',
  //   icon: 'home'
  // },
  {
    state: 'evaluation',
    name: 'Evaluation',
    type: 'link',
    icon: 'accessibility'
  },
  {
    state: 'history',
    name: 'History',
    type: 'link',
    icon: 'history'
  },
  {
    state: 'approve',
    name: 'Approve',
    type: 'link',
    icon: 'visibility'
  },

  {
    state: 'manageheader',
    name: 'Manage Topic',
    type: 'link',
    icon: 'playlist_add'
  },
  {
    state: 'report',
    name: 'Report',
    type: 'link',
    icon: 'chrome_reader_mode'
  },
];

const MENUITEMSHR = [
  {
    state: 'history',
    name: 'History',
    type: 'link',
    icon: 'history'
  },
  {
    state: 'report',
    name: 'Report',
    type: 'link',
    icon: 'chrome_reader_mode'
  },
];

@Injectable()
export class MenuItems {
  a = 1;
  getAll(): Menu[] {
    if (this.a == 1)
      return MENUITEMS;
    else if (this.a == 2)
      return MENUITEMSHR;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}