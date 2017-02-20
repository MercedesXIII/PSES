import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { GlobalServiceRef} from '../../../shared/GlobalServiceRef';
import { MdSelect } from '@angular/material';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  data;
  @Input() PositionId : Number;

  constructor(private router : Router, public http:Http) {}
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
       this.http.get(GlobalServiceRef.URLService+"/Header/HeaderTop/Job/"+this.PositionId).subscribe(res => this.data = res.json());
    }
  }
}
