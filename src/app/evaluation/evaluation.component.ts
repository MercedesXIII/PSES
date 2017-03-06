import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, 
  ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { GlobalServiceRef} from '../shared/GlobalServiceRef'

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  
  PeriodId : number;
  EvaId : number;
  showList : number = 1;
  header1 = [];
  header2 = [];
  ngOnInit() {}
   @ViewChild('myTable') table: any;
  constructor(private router : Router, public http:Http) {
    this.fetch((data) => {
      this.rows = data;
    });
  }
 

  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  getPeriodId(Id : number)
  {
      this.PeriodId = Id;
      this.showList = 2;
  }
  passPeriodId(Id : number)
  {
      this.PeriodId = Id;
  }
  getEvaId(Id : number)
  {
      this.EvaId = Id;
      this.showList = 3;
  }
  back(flag)
  {
     this.showList = 1;
  }
  backEva(Id : number)
  {
       this.PeriodId = Id;
       this.showList = 1;
  }
}
