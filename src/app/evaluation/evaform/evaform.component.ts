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
  selector: 'app-evaform',
  templateUrl: './evaform.component.html',
  styleUrls: ['./evaform.component.scss']
})
export class EvaformComponent implements OnInit {

  constructor(private router : Router, public http:Http) { }
  @Input() EvaId : number;
  @Input() PeriodId : number;
  @Output() back = new EventEmitter();
  getEva = [];
  position = [];
  header = [];
  detail = [];

  
  currentPosition;
  PositionNo;
  fixedCols = 18;
  fixedRowHeight = 30;
  ratioGutter = 1;
  color = '#3f51b5'
  color2 = '#fafafa'

  ngOnInit() {
    this.http.get(GlobalServiceRef.URLService+"/Eva/EvaData/"+this.EvaId)
    .subscribe(res => {this.getEva = res.json();
                      this.currentPosition = this.getEva[0].Part2ID;
                      this.http.get(GlobalServiceRef.URLService+"/Header/All/"+this.currentPosition)
                          .subscribe(res => {
                                              this.header = res.json();
                                              this.currentPosition = this.getEva[0].Part2ID;
                                             });
                      this.currentPosition = this.getEva[0].Part2ID;
                      });
    this.http.get(GlobalServiceRef.URLService+"/Header/position").subscribe(res => this.position = res.json());
  }
  onSubmit(Id : MdSelect){
    this.http.get(GlobalServiceRef.URLService+"/Header/All/"+Id)
    .subscribe(res => this.header = res.json());
    //this.back.emit(this.PeriodId);
  }
  show(ID : number)
  {
    console.log(ID+":"+this.currentPosition)
    // this.http.get(GlobalServiceRef.URLService+"/Header/HeaderMid/"+ID+"/"+this.PositionId)
    //     .subscribe(res => this.detail = res.json());
  }

}
