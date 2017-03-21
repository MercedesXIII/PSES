import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ViewChild,NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput, MdDialog, MdDialogRef } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/startWith';

import { GlobalServiceRef} from '../../shared/GlobalServiceRef'
import { ConfirmDialog } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-historylist',
  templateUrl: './historylist.component.html',
  styleUrls: ['./historylist.component.scss']
})
export class HistorylistComponent implements OnInit {

   public LoginResultJson: Object;

    //ToolTlip
    position: TooltipPosition = 'below';
    detail: string = 'Detail';
    remove: string = 'Delete';
    showPeriod : boolean = false;
    listeva = [];
    @Input() PeriodId :string;
    @Output() outEvaId = new EventEmitter();
    constructor(private router : Router, public http:Http,public ngzone :NgZone, public dialog: MdDialog, public ref : ChangeDetectorRef) {}
    
    ngOnInit() {
        this.ref.detectChanges()
        this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
                this.http.get(GlobalServiceRef.URLService+"/Eva/Eva/"+this.LoginResultJson['EmployeeID']+"/all")
                .subscribe(res => this.listeva = res.json());
    }
    create(flag : boolean)
    {
        if(flag == true)
        {
            this.showPeriod = true;
        }
        else
        {
            this.showPeriod = false;
        }
    }
    passEvaId(event,row,value){
        this.outEvaId.emit(value["Eva_ID"]);
    }

}