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
  flag:boolean = false;
  header = [{
      "Id":"1",
      "Text":"A"
  },
  {
      "Id":"2",
      "Text":"B"
  },
  {
      "Id":"3",
      "Text":"C"
  }]
  detail = [{
      "Id":"4",
      "Text":"D"
  },
  {
      "Id":"5",
      "Text":"E"
  },
  {
      "Id":"6",
      "Text":"F"
  }]
  callflag(get : boolean)
  {
      this.flag = get;
  }
  constructor() {
  }
}