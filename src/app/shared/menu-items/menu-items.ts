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

const MENUITEMSPM = [
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
  LoginResultJson
  getAll(): Menu[] {
    this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
    if (this.LoginResultJson['positionNo'] == 60)
      return MENUITEMSPM;
    else if (this.LoginResultJson['positionNo'] == 23)
      return MENUITEMSHR;
    else
      return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}