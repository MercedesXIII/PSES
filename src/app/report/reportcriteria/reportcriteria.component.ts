import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput, MdInputDirective, MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { GlobalServiceRef } from '../../shared/GlobalServiceRef'

@Component({
  selector: 'app-reportcriteria',
  templateUrl: './reportcriteria.component.html',
  styleUrls: ['./reportcriteria.component.scss']
})
export class ReportcriteriaComponent implements OnInit {

  period = [];
  constructor(public translate: TranslateService, private router: Router, public http: Http, private fb: FormBuilder, public dialog: MdDialog, public ref: ApplicationRef, public snackBar: MdSnackBar) { }
  flag: number = 0;
  ngOnInit() {
    this.http.get(GlobalServiceRef.URLService + "/Eva/Period").subscribe(res => {
      this.period = res.json();
    });
  }
  getCriteria(param: number) {
    this.flag = param;
  }

}
