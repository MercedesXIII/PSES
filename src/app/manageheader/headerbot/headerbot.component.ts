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
  selector: 'app-headerbot',
  templateUrl: './headerbot.component.html',
  styleUrls: ['./headerbot.component.scss']
})
export class HeaderbotComponent implements OnChanges {

  @Input() HeadMidId : number;
  data;
  constructor(private router : Router, public http:Http){}
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if(this.HeadMidId !== undefined)
      {
       this.http.get(GlobalServiceRef.URLService+"/Header/HeaderBot/"+this.HeadMidId)
       .subscribe(res => this.data = res.json());
      }
   }
  }

}
