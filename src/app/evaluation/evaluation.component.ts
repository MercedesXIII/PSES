import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  public LoginResultJson: Object;

  ngOnInit() {
  }

  rows = [];

  constructor() {
    this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
    console.log('eiei');
    console.log(this.LoginResultJson);
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    let req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
    console.log('eiei');
   }
}
