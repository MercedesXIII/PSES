import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { GlobalServiceRef} from '../../shared/GlobalServiceRef'
import { MdSelect } from '@angular/material';

@Component({
  selector: 'app-headermid',
  templateUrl: './headermid.component.html',
  styleUrls: ['./headermid.component.scss']
})
export class HeadermidComponent implements OnChanges {

  constructor(private router : Router, public http:Http) { }
  @Input() HeadTopId : Number;
  @Input() PositionId : Number;
  data;
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if(this.PositionId !== undefined && this.HeadTopId !== undefined)
      {
       this.http.get(GlobalServiceRef.URLService+"/Header/HeaderMid/"+this.HeadTopId+"/"+this.PositionId)
       .subscribe(res => this.data = res.json());
      }
   }
  }

}
