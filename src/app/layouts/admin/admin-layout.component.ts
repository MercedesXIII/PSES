import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from "rxjs";

import { TranslateService } from 'ng2-translate';
import {Http, Response, Headers,URLSearchParams} from '@angular/http';

import { GlobalServiceRef} from '../../shared/GlobalServiceRef'

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router:Subscription;

  public LoginResultJson: Object;

  today: number = Date.now();
  url: string;
  showSettings:boolean = false;

  @ViewChild('sidemenu') sidemenu;

  constructor(public menuItems: MenuItems, private router: Router, private translate: TranslateService , public http: Http) {
    let browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|en/) ? browserLang : 'en');
    //translate.use('fr');
    this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.url = event.url;
      if (this.isOver()) this.sidemenu.close();
    });
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  isOver(): boolean {
    // if(this.url === '/evaluation' || this.url === '/manageheader' || this.url === '/history' || this.url === '/approve') {
    //   return true;
    // } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    //}
  }

  addMenuItem(): void {
    this.menuItems.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        {state: 'menu', name: 'MENU'},
        {state: 'timelmenuine', name: 'MENU'}
      ]
    });
  }
  LogOut(): void{
    let headers = new Headers({ 'Content-Type': 'application/json' }); 

    let body =JSON.stringify({ EmployeeID: this.LoginResultJson['EmployeeID']});

    this.http.post(GlobalServiceRef.URLService+"/Logout",body,{
      headers:headers,
    }).subscribe((res: Response) => {
      console.log('Logout Completed');
    });
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('/session/signin'); 
  }
}