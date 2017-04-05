import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput, MdInputDirective, MdDialog, MdDialogRef } from '@angular/material';
import { GlobalServiceRef } from '../../shared/GlobalServiceRef'



@Component({
    selector: 'app-historydetail',
    templateUrl: './historydetail.component.html',
    styleUrls: ['./historydetail.component.scss']
})
export class HistorydetailComponent implements OnInit {

    @Input() EvaId: number;
    @Output() back = new EventEmitter();
    //tooltip
    point: TooltipPosition = 'below';
    remove: string = 'Delete';
    adddetail: string = 'Add Detail';
    addtopic: string = 'Add Topic';

    getEva = [];
    header = [];
    detail = [];
    flag = [];
    score = [1, 2, 3, 4, 5];
    currentPosition: number;
    currentScore = [];
    currentId = [];
    currentScoreId = [];
    curentParent = [];
    getScoreAndId = [];
    TotalScore = 0;
    TotalLevel;
    subTotalScore = [];
    finalTotalScore = [];
    activeTabIndex = 0;
    PositionNo;
    fixedCols = 18;
    fixedRowHeight = 40;
    ratioGutter = 1;
    color = '#3f51b5'
    color2 = '#fafafa'
    countHeader: number = 0;
    countHead3: number;
    countHead3full: number = 0;
    openDelete: boolean = true;
    Lang

    public form2: FormGroup;
    public form3: FormGroup;
    constructor(public translate: TranslateService, private router: Router, public http: Http, private fb: FormBuilder, public dialog: MdDialog, public ref: ApplicationRef) { }
    ngOnInit() {
        console.log(this.EvaId)
        this.http.get(GlobalServiceRef.URLService + "/Eva/EvaData/" + this.EvaId)
            .subscribe(res => {
                this.getEva = res.json();
                this.currentPosition = this.getEva[0].Part2ID;
                this.http.get(GlobalServiceRef.URLService + "/Header/All/" + this.currentPosition + "/" + this.EvaId + "/1/EN")
                    .subscribe(res => {
                        this.header = res.json();
                        this.countHeader = 0;
                        this.countHead3full = 0;
                        for (let data in this.header) {
                            this.flag[data] = false;
                            if (this.header[data].H_Level == 1) {
                                this.countHeader++;
                                this.TotalScore += this.header[data].point;
                                this.finalTotalScore[data] = this.calScore(this.header[data].point)
                            }
                            else if (this.header[data].H_Level == 2) {
                                //console.log(this.header[data].H_Level+" "+this.header[data].Text+" "+this.counthead2)
                                this.subTotalScore[data] = this.calScore(this.header[data].point)
                            }
                            else if (this.header[data].H_Level == 3) {
                                //console.log(this.header[data].point+" "+this.header[data].Text+" "+this.counthead3)
                                this.currentScore[data] = this.header[data].point;
                                this.currentId[data] = this.header[data].H_ID;
                                this.curentParent[data] = this.header[data].Parent;
                                this.currentScoreId[data] = this.header[data].Score_ID;
                                this.countHead3full++;
                            }
                        }
                        console.log(this.TotalScore + " " + this.countHeader)
                        this.TotalScore /= this.countHeader
                        this.TotalScore = Math.round(this.TotalScore * 100) / 100
                        this.TotalLevel = this.calFullScore(this.TotalScore)
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
    callflag(get: number) {
        if (this.flag[get] == false)
            this.flag[get] = true;
        else
            this.flag[get] = false;
    }
    calFullScore(score: number) {
        if (score < 1)
            return "Not Available"
        else if (score < 3)
            return "Unacceptable"
        else if (score < 5)
            return "Need Improve"
        else if (score < 7)
            return "Standard"
        else if (score < 9)
            return "Above Standard"
        else
            return "Outstanding"
    }
    calScore(score: number) {
        if (score < 1)
            return "N/A"
        else if (score < 3)
            return "UNA"
        else if (score < 5)
            return "NIM"
        else if (score < 7)
            return "STD"
        else if (score < 9)
            return "AST"
        else
            return "OUT"
    }
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            this.countHead3 = 0;
            for (let data in this.currentScore) {
                if (this.currentScore[data] != 0)
                    this.countHead3++;
            }
            console.log(this.countHead3 + " " + this.countHead3full)
        }
    }
    call() {
        this.countHead3 = 0;
        for (let data in this.currentScore) {
            if (this.currentScore[data] != 0)
                this.countHead3++;
        }
        console.log(this.countHead3 + " " + this.countHead3full)
    }
    backpage() {
        this.back.emit(true);
    }

}
