import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput, MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/startWith';

import { GlobalServiceRef } from '../../shared/GlobalServiceRef'
import { ConfirmDialog } from '../../shared/dialog/dialog.component';

@Component({
    selector: 'app-evalist',
    templateUrl: './evalist.component.html',
    styleUrls: ['./evalist.component.scss']
})
export class EvalistComponent implements OnInit {

    public LoginResultJson: Object;

    //ToolTlip
    position: TooltipPosition = 'below';
    evaluate: string = 'Evaluate';
    add: string = 'Add New Evaluate';
    remove: string = 'Delete';
    finished: string = 'Finished';
    unfinished: string = 'Unfinished';
    wait: string = 'Wait';

    config: MdDialogConfig = { disableClose: true };


    showPeriod: boolean = false;
    currentPeriod;
    listeva = [];
    period = [];
    Duration = [];
    DurationId = [];
    success = 1;
    Lang
    @Input() PeriodId: string;
    @Output() outPeriodId = new EventEmitter();
    @Output() outPeriodId2 = new EventEmitter();
    @Output() outEvaId = new EventEmitter();
    constructor(public translate: TranslateService, private router: Router, public http: Http, public ngzone: NgZone, public dialog: MdDialog, public ref: ChangeDetectorRef) { }

    ngOnInit() {
        this.ref.detectChanges()
        this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
        this.http.get(GlobalServiceRef.URLService + "/Eva/Period").subscribe(res => {
            this.period = res.json();
            // this.Duration[0] = 'all'
            // this.DurationId[0] = 'all'
            // for (let data in this.period) {
            //     this.Duration[data + 1] = this.period[data].StartDate + "-" + this.period[data].FinishDate
            //     this.DurationId[data + 1] = this.period[data].Period_Id
            // }
            if (this.PeriodId != undefined && this.PeriodId != 'all') {
                this.showPeriod = true;
                console.log(this.PeriodId)
                this.currentPeriod = this.PeriodId;
                this.http.get(GlobalServiceRef.URLService + "/Eva/Eva/" + this.LoginResultJson['EmployeeID'] + "/" + this.PeriodId)
                    .subscribe(res => { this.listeva = res.json(); });
            }
            else {
                this.showPeriod = false;
                this.currentPeriod = 'all';
                this.http.get(GlobalServiceRef.URLService + "/Eva/Eva/" + this.LoginResultJson['EmployeeID'] + "/all")
                    .subscribe(res => this.listeva = res.json());
            }
            if (this.translate.currentLang == "th") {
                this.Lang = 'TH'
            }
            else {
                this.Lang = 'EN'
            }
        });
        this.translate.onLangChange.subscribe(() => {
            if (this.translate.currentLang == "th") {
                this.Lang = 'TH'
            }
            else {
                this.Lang = 'EN'
            }
        });
    }
    create(flag: boolean) {
        if (flag == true) {
            this.showPeriod = true;
        }
        else {
            this.showPeriod = false;
        }
    }
    getPeriod(Id: MdSelect) {
        try {
            this.outPeriodId.emit(Id);
        }
        catch (ee) { }
    }
    getDataPeriod(Id: string) {
        try {
            console.log(Id + " " + this.currentPeriod);
            if (Id != undefined) {
                this.http.get(GlobalServiceRef.URLService + "/Eva/Eva/" + this.LoginResultJson['EmployeeID'] + "/" + Id)
                    .subscribe(res => {
                        this.listeva = res.json()
                        if (Id == 'all') {
                            this.showPeriod = false;
                        }
                        else {
                            this.showPeriod = true;
                        }
                    });
            }
            this.outPeriodId2.emit(Id);
        }
        catch (ee) { }
    }
    delete(event, row, value) {
        let dialogRef = this.dialog.open(ConfirmDialog, this.config);
        dialogRef.componentInstance.SetDialogType("deleteEva");
        dialogRef.componentInstance.SetMessagge(value['name_language'][this.Lang]);
        dialogRef.afterClosed().subscribe(result => {
            if (result === "ok") {
                this.http.delete(GlobalServiceRef.URLService + "/Eva/Delete/" + value["Eva_ID"])
                    .subscribe((res: Response) => {
                        if (res.ok) {
                            return 0;
                        }
                    });
                this.listeva.splice(value.$$index, 1);
            }
        });
    }
    passEvaId(event, row, value, period) {
        this.outEvaId.emit(value["Eva_ID"]);
    }
    changeStatus(event, row, value) {
        console.log(value["EvaStatus"]);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body: string = JSON.stringify(value["Eva_ID"]);
        this.http.put(GlobalServiceRef.URLService + "/Header/EvaStatus", body, {
            headers: headers
        }).subscribe(res => {
            console.log("complete")
            if (value["EvaStatus"] == 1)
                value["EvaStatus"] = 2
            else
                value["EvaStatus"] = 1
        })

    }

}
