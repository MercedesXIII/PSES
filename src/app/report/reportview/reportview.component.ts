import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput, MdInputDirective, MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { GlobalServiceRef } from '../../shared/GlobalServiceRef'

@Component({
  selector: 'app-reportview',
  templateUrl: './reportview.component.html',
  styleUrls: ['./reportview.component.scss']
})
export class ReportviewComponent implements OnInit {
  data = [];
  constructor(public translate: TranslateService, private router: Router, public http: Http) {
  }
  @Input() PeriodId: number;
  @Input() Group: number;
  @Input() Subgroup: number;
  ngOnInit() {
    this.http.get(GlobalServiceRef.URLService + "/Report/Report1/" + this.Group + "/" + this.Subgroup + "/" + this.PeriodId).subscribe(res => {
      this.data = res.json();
    });
  }
}
