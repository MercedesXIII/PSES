import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { GlobalServiceRef} from '../../../shared/GlobalServiceRef'
import { MdSelect } from '@angular/material';


@Component({
  selector: 'app-selectjob',
  templateUrl: './selectjob.component.html',
  styleUrls: ['./selectjob.component.scss']
})
export class SelectjobComponent implements OnInit {
  data;
  headJobId;
  PositionNo;
  @Output() out = new EventEmitter();
  constructor( private router : Router, public http:Http) {
      this.http.get(GlobalServiceRef.URLService+"/Header/position").subscribe(res => this.data = res.json());
  }
  ngOnInit() {
  }
  onSubmit(Id : MdSelect){
  		this.out.emit(Id.selected.value); 
	}
}
