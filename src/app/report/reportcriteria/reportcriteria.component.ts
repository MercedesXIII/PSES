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
  group = [];
  subgroup = [];
  constructor(public translate: TranslateService, private router: Router, public http: Http, private fb: FormBuilder, public dialog: MdDialog, public ref: ApplicationRef, public snackBar: MdSnackBar) { }
  flag: number = 0;
  @Output() outPeriodId = new EventEmitter();
  @Output() outGroup = new EventEmitter();
  @Output() outSubgroup = new EventEmitter();
  Period;
  Group;
  Subgroup;
  ngOnInit() {
    this.http.get(GlobalServiceRef.URLService + "/Eva/Period").subscribe(res => {
      this.period = res.json();
      this.http.get(GlobalServiceRef.URLService + "/Report/Group/nonsub").subscribe(res => {
        this.group = res.json();
        this.Period = 'all';
        this.Group = '0';
        this.Subgroup = '0';
      });
    });
  }
  getSubgroup() {
    this.subgroup = [];
    this.http.get(GlobalServiceRef.URLService + "/Report/Group/" + this.Group).subscribe(res => {
      this.subgroup = res.json();
    });
  }
  getCriteria(param: number) {
    this.flag = param;
  }
  PassCriteria() {
    this.outPeriodId.emit(this.Period);
    this.outGroup.emit(this.Group);
    this.outSubgroup.emit(this.Subgroup);
    console.log(this.Period + " " + this.Group + " " + this.Subgroup)
  }
  Test() {
    window.open(GlobalServiceRef.URLService + "/report/Test")
  }

}