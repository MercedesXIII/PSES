import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Http, Response, Headers,URLSearchParams} from '@angular/http';

import { GlobalServiceRef} from '../../shared/GlobalServiceRef'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  public LoginResultJson: Object;
  public returnUrl: string;
  public ResultBool: boolean;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private router: Router, public http: Http) {
    this.ResultBool = true;
  }

  ngOnInit() {
  	this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]    
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(username: HTMLInputElement, password: HTMLInputElement) {    

    let headers = new Headers({ 'Content-Type': 'application/json' }); 

    let body =JSON.stringify({ username: username.value, password: password.value });

    //this.http.get('http://localhost:56416/LogIn', {
    this.http.post(GlobalServiceRef.URLService+"/Login",body,{
        headers: headers
    }).subscribe((res: Response) => {
      this.LoginResultJson = res.json();
      if(this.ResultBool = this.LoginResultJson['Result'])
      {
        sessionStorage.setItem('currentUser',JSON.stringify(this.LoginResultJson));
        this.router.navigateByUrl('/');
      }
    });
  }
}
