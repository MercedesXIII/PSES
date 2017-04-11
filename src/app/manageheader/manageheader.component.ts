import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, MdDialog, TooltipPosition } from '@angular/material';
import { TranslateService, TranslateModule } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { GlobalServiceRef } from '../shared/GlobalServiceRef'
import { MdSelect } from '@angular/material';

import { ConfirmDialog, InsertDialog, InsertDialog2, InsertDialog3 } from '../shared/dialog/dialog.component';
@Component({
    selector: 'app-manageheader',
    templateUrl: './manageheader.component.html',
})
export class ManageheaderComponent implements OnInit {

    @Input() EvaId: number;
    @Input() PeriodId: number;
    @Output() back = new EventEmitter();
    //tooltip
    point: TooltipPosition = 'below';
    remove: string = 'Delete';
    adddetail: string = 'Add Detail';
    addtopic: string = 'Add Topic';

    position = [];
    header = [];
    detail = [];
    flag = [];
    currentPosition: number;
    activeTabIndex = 0;
    PositionNo;
    fixedCols = 18;
    fixedRowHeight = 30;
    ratioGutter = 1;
    color = '#3f51b5'
    color2 = '#fafafa'
    countHeader: number = 0;
    headdata
    Lang;

    constructor(public translate: TranslateService, private router: Router, public http: Http, private fb: FormBuilder, public dialog: MdDialog, public ref: ChangeDetectorRef) { }
    ngOnInit() {
        // if (this.translate.currentLang == "th") {
        //     console.log("thai")
        // }
        // else {
        //     console.log("eng")
        // }
        // this.translate.onLangChange.subscribe(() => {
        //     if (this.translate.currentLang == "th") {
        //         console.log("thai")
        //     }
        //     else {
        //         console.log("eng")
        //     }
        // })
        this.http.get(GlobalServiceRef.URLService + "/Header/position")
            .subscribe(res => {
                this.position = res.json();
                this.currentPosition = 44;
                this.http.get(GlobalServiceRef.URLService + "/Header/GetHeader/" + this.currentPosition)
                    .subscribe(res => {
                        this.header = res.json();
                        this.countHeader = 0;
                        for (let data in this.header) {
                            this.flag[data] = false;
                            if (this.header[data].H_Level == 1)
                                this.countHeader++;
                        }
                    });
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
    callHeader(id) {
        this.http.get(GlobalServiceRef.URLService + "/Header/GetHeader/" + id)
            .subscribe(res => {
                this.header = res.json();
                this.countHeader = 0;
                for (let data in this.header) {
                    this.flag[data] = false;
                    if (this.header[data].H_Level == 1)
                        this.countHeader++;
                }
            });
    }
    onSubmit(Id: MdSelect) {
        this.callHeader(Id);
        //this.back.emit(this.PeriodId);
    }
    openDialogHead(HeadId: number, PositionNo: number, Level: number, i: number) {
        if (Level == 1) {
            let dialogRef = this.dialog.open(InsertDialog);
            dialogRef.afterClosed().subscribe(res => {
                try {
                    if (res != 'cancel') {
                        let TextThai = res[0];
                        let TextEng = res[1];
                        this.insertHeader1(HeadId, PositionNo, TextThai, TextEng);
                    }
                }
                catch (ee)
                { }
            });
        }
        else if (Level == 2) {
            let dialogRef = this.dialog.open(InsertDialog2);
            dialogRef.afterClosed().subscribe(res => {
                try {
                    if (res != 'cancel') {
                        let TextThai = res[0];
                        let TextEng = res[1];
                        this.insertHeader2(i, HeadId, PositionNo, TextThai, TextEng);
                    }
                }
                catch (ee)
                { }
            });
        }
        else if (Level == 3) {
            let dialogRef = this.dialog.open(InsertDialog3);
            dialogRef.afterClosed().subscribe(res => {
                try {
                    if (res != 'cancel') {
                        let TextThai = res[0];
                        let TextEng = res[1];
                        this.insertHeader3(i, HeadId, PositionNo, TextThai, TextEng);
                    }
                }
                catch (ee)
                { }
            });
        }
    }
    insertHeader1(HeadId: number, PositionNo: number, TextThai: string, TextEng: string) {
        console.log(HeadId + " " + PositionNo + " " + TextThai + " " + TextEng)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body: string = JSON.stringify({ H_ID: HeadId, PositionNo: PositionNo, Text: TextThai, Text_Eng: TextEng, Alias: "-" });

        this.http.put(GlobalServiceRef.URLService + "/Header/InsertHeader", body, {
            headers: headers
        }).subscribe((res: Response) => {
            let result = res.json();
            this.callHeader(PositionNo);
        });
    }
    insertHeader2(i: number, HeadId: number, PositionNo: number, TextThai: string, TextEng: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body: string = JSON.stringify({ H_ID: HeadId, PositionNo: PositionNo, Text: TextThai, Text_Eng: TextEng, Alias: "-" });
        this.http.put(GlobalServiceRef.URLService + "/Header/InsertHeader", body, {
            headers: headers
        }).subscribe((res: Response) => {
            let result = res.json();
            this.callHeader(PositionNo);
        });
    }
    insertHeader3(i: number, HeadId: number, PositionNo: number, TextThai: string, TextEng: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body: string = JSON.stringify({ H_ID: HeadId, PositionNo: PositionNo, Text: TextThai, Text_Eng: TextEng, Alias: "-" });
        this.http.put(GlobalServiceRef.URLService + "/Header/InsertHeader", body, {
            headers: headers
        }).subscribe((res: Response) => {
            let result = res.json();
            this.http.get(GlobalServiceRef.URLService + "/Header/GetHeader/" + PositionNo)
                .subscribe(res => {
                    this.header = res.json();
                    this.countHeader = 0;
                    for (let data in this.header) {
                        this.flag[data] = false;
                        this.flag[i] = true;
                        if (this.header[data].H_Level == 1)
                            this.countHeader++;
                    }
                });
        });

    }
    delete(H_Id: number, indexHead: number, Text: string) {
        let dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.SetDialogType("delete");
        dialogRef.componentInstance.SetMessagge(Text)
        dialogRef.afterClosed().subscribe(result => {
            if (result === "ok") {
                this.http.delete(GlobalServiceRef.URLService + "/Header/Delete/" + H_Id)
                    .subscribe((res: Response) => {
                        if (res.ok) {
                            this.header.splice(indexHead, 1);
                        }
                    });
            }
        });
    }
    callflag(get: number) {
        if (this.flag[get] == true)
            this.flag[get] = false;
        else
            this.flag[get] = true;
    }
    passScore(pass: boolean) {
        if (pass == true)
            this.activeTabIndex++;
        else
            this.activeTabIndex--;
    }
}
