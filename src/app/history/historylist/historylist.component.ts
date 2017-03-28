import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput, MdDialog, MdDialogRef } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/startWith';

import { GlobalServiceRef } from '../../shared/GlobalServiceRef'
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
    showPeriod: boolean = false;
    listhistory = [];
    progress = [];
    @Input() PeriodId: string;
    @Output() outEvaId = new EventEmitter();
    constructor(private router: Router, public http: Http, public ngzone: NgZone, public dialog: MdDialog, public ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.ref.detectChanges()
        this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
        this.http.get(GlobalServiceRef.URLService + "/Eva/Eva/ApproveHistory/" + this.LoginResultJson['EmployeeID']).subscribe(res => { this.listhistory = res.json(); this.progressApprove() });
        // this.http.get(GlobalServiceRef.URLService + "/Eva/Eva/ApproveHistory/490428").subscribe(res => { this.listhistory = res.json(); this.progressApprove() });
        // this.http.get(GlobalServiceRef.URLService + "/Eva/Eva/ApproveHistory/890148").subscribe(res => { this.listhistory = res.json(); this.progressApprove() });
        // this.http.get(GlobalServiceRef.URLService + "/Eva/Eva/ApproveHistory/430045").subscribe(res => { this.listhistory = res.json(); this.progressApprove() });
        // this.http.get(GlobalServiceRef.URLService + "/Eva/Eva/ApproveHistory/460143").subscribe(res => { this.listhistory = res.json(); this.progressApprove() });
    }
    create(flag: boolean) {
        if (flag == true) {
            this.showPeriod = true;
        }
        else {
            this.showPeriod = false;
        }
    }
    passEvaId(event, row, value) {
        this.outEvaId.emit(value["EvaID"]);
    }
    progressApprove() {
        for (let index in this.listhistory) {
            if (this.listhistory[index].HR == 1) {
                this.progress[index] = 100;
            }
            else if (this.listhistory[index].GM == 1) {
                this.progress[index] = 75;
            }
            else if (this.listhistory[index].PM == 1) {
                this.progress[index] = 50;
            }
            else if (this.listhistory[index].ST == 1) {
                this.progress[index] = 25;
            }
            else {
                this.progress[index] = 0;
            }
        }
    }

}
