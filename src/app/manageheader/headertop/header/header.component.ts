import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { GlobalServiceRef} from '../../../shared/GlobalServiceRef'
import { MdSelect } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  data;
  @Input() PositionId : Number;
  @Output() HeadTopId = new EventEmitter();
  constructor(private router : Router, public http:Http) {}
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if(this.PositionId !== undefined)
      {
       this.http.get(GlobalServiceRef.URLService+"/Header/HeaderTop/Job/"+this.PositionId)
       .subscribe(res => this.data = res.json());
      }
    }
  }
  passId(event,row,value){
      this.HeadTopId.emit(value["H1_ID"]); 
  }
}
