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
    selector: 'app-approvelist',
    templateUrl: './approvelist.component.html',
    styleUrls: ['./approvelist.component.scss']
})
export class ApprovelistComponent implements OnInit {

    public LoginResultJson: Object;

    //ToolTlip
    position: TooltipPosition = 'below';
    detail: string = 'Detail';
    remove: string = 'Delete';
    st: string = 'Staff';
    pm: string = 'PM';
    gm: string = 'GM';
    hrd: string = 'HRD';

    progress = [];
    showPeriod : boolean = false;
    listapprove = [];
    @Input() PeriodId :string;
    @Output() outEvaId = new EventEmitter();
    constructor(private router : Router, public http:Http,public ngzone :NgZone, public dialog: MdDialog, public ref : ChangeDetectorRef) {}
    
    ngOnInit() {
        this.ref.detectChanges()
        this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
        // this.http.get(GlobalServiceRef.URLService+"/Eva/ApproveList/"+this.LoginResultJson['EmployeeID'])
        // .subscribe(res => {this.listapprove = res.json()
            //     }});
            this.http.get(GlobalServiceRef.URLService+"/Eva/ApproveList/890148")
            .subscribe(res => {this.listapprove = res.json()
                for(let index in this.listapprove)
                {
                    if(this.listapprove[index].hrd == 1)
                    {
                        console.log(this.listapprove[index].hrd)
                        this.progress[index] = 100;
                    }
                    else if(this.listapprove[index].gm == 1)
                    {
                        console.log(this.listapprove[index].gm)
                        this.progress[index] = 75;
                    }
                    else if(this.listapprove[index].pm == 1)
                    {
                        console.log(this.listapprove[index].pm)
                        this.progress[index] = 50;
                    }
                    else if(this.listapprove[index].sm == 1)
                    {
                        console.log(this.listapprove[index].sm)
                        this.progress[index] = 25;
                    }
                    else
                    {
                        this.progress[index] = 0;
                    }
                    }});
            // this.http.get(GlobalServiceRef.URLService+"/Eva/ApproveList/430045")
            // .subscribe(res => {this.listapprove = res.json();});
            // this.http.get(GlobalServiceRef.URLService+"/Eva/ApproveList/460143")
            // .subscribe(res => {this.listapprove = res.json()});
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
            this.outEvaId.emit(value["EvaID"]);
        }

    }
