import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition } from '@angular/material';
import { TranslateService } from 'ng2-translate';



import { GlobalServiceRef} from '../../../shared/GlobalServiceRef'
import { HeaderTop } from '../../../shared/model/HeaderTop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  position: TooltipPosition = 'below';
  new: string = 'New HeaderTop';
  edit : string = 'Edit'
  remove: string = 'Delete';
  detail: string = 'Detail'
  data;
  count : number = 0;
  flagCreate : number = 0;
  @Input() PositionId : number;
  @Output() HeadTopId = new EventEmitter();
  @Output() HeadTopName = new EventEmitter();
  editing = {};
  public form: FormGroup;
  HeaderTop : HeaderTop;
  constructor(private router : Router, public http:Http ,private fb: FormBuilder) {}
  ngOnInit()
  {
    this.form = this.fb.group({
      TextThai: [null, Validators.required],
      TextEng: [null, Validators.required],
      TextAlias: [null, Validators.required] 
    })
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if(this.PositionId !== undefined)
      {
       this.flagCreate = 1
       this.http.get(GlobalServiceRef.URLService+"/Header/HeaderTop/Job/"+this.PositionId)
       this.http.get(GlobalServiceRef.URLService+"/Header/HeaderTop/Job/"+this.PositionId)
       .subscribe(res => this.data = res.json());
      }
    }
  }
  onSubmit(TextThai: HTMLInputElement,TextEng: HTMLInputElement,TextAlias: HTMLInputElement)
  {
      this.flagCreate = 1;
      this.HeaderTop = new HeaderTop(this.PositionId,TextThai.value,TextEng.value,TextAlias.value)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let body : string = JSON.stringify(this.HeaderTop);
      this.http.put(GlobalServiceRef.URLService+"/Header/HeaderTop/Insert",body,{
        headers: headers
      }).subscribe((res: Response) => {
        let result = res.json();
      });
      this.http.get(GlobalServiceRef.URLService+"/Header/HeaderTop/Job/"+this.PositionId)
       .subscribe(res => this.data = res.json());
       this.http.get(GlobalServiceRef.URLService+"/Header/HeaderTop/Job/"+this.PositionId)
       .subscribe(res => this.data = res.json());
       this.http.get(GlobalServiceRef.URLService+"/Header/HeaderTop/Job/"+this.PositionId)
       .subscribe(res => this.data = res.json());
       this.form.reset();
  }
  passId(event,row,value){
      this.HeadTopId.emit(value["H1_ID"]);
      this.HeadTopName.emit(value["Text"]); 
  }
  delete(event,row,value){
      
      let del;
      if(confirm("Confirm Delete") == true)
      {
        this.http.delete(GlobalServiceRef.URLService+"/Header/HeaderTop/Delete/"+value["H1_ID"]+"/"+this.PositionId)
         .subscribe(res => del = res.json());

        this.data.splice(value.$$index, 1);
      }
     else
     {
       return 0;
     }
  }
  create(flag : number)
  {
    if(flag == 1)
    {
      this.flagCreate = 2;
      this.form.reset();
    }
    else
    {
      this.flagCreate = 1;
    }
  }
}