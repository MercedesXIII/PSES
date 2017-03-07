import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect ,MdCheckbox} from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { AccordionModule } from 'ng2-accordion';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestComponent {
  flag = [];
  header = [{
    "Id":"1",
    "Text":"A",
    "Level":"1",
    "Parent":"0"
  },
  {
    "Id":"11",
    "Text":"AA",
    "Level":"2",
    "Parent":"1"
  },
  {
    "Id":"111",
    "Text":"AAA",
    "Level":"3",
    "Parent":"11"

  },{
    "Id":"2",
    "Text":"B",
    "Level":"1",
    "Parent":"0"
  },
  {
    "Id":"22",
    "Text":"BB",
    "Level":"2",
    "Parent":"2"
  },
  {
    "Id":"222",
    "Text":"BBB",
    "Level":"3",
    "Parent":"22"
  },{
    "Id":"3",
    "Text":"C",
    "Level":"1",
    "Parent":"0"
  },
  {
    "Id":"33",
    "Text":"CC",
    "Level":"2",
    "Parent":"3"
  },
  {
    "Id":"333",
    "Text":"CCC",
    "Level":"3",
    "Parent":"33"
  }]
  callflag(get : number)
  {
    console.log(get);
    if(this.flag[get] == true)
      this.flag[get] = false;
    else
      this.flag[get] = true;

  }
  constructor() {
    for(let data in this.header)
    {
      this.flag[data] = false;
    }
  }
}