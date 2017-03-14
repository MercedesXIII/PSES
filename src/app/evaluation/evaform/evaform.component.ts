import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput,MdInputDirective, MdDialog, MdDialogRef } from '@angular/material';
import { GlobalServiceRef} from '../../shared/GlobalServiceRef'

import { InsertDialog,InsertDialog2,InsertDialog3 } from '../../shared/dialog/dialog.component';

@Component({
    selector: 'app-evaform',
    templateUrl: './evaform.component.html',
    styleUrls: ['./evaform.component.scss']
})
export class EvaformComponent implements OnInit {


    @Input() EvaId : number;
    @Input() PeriodId : number;
    @Output() back = new EventEmitter();
    getEva = [];
    position = [];
    header = [];
    detail = [];
    flag = [];
    flagAdd = [];
    score = [1,2,3,4,5];
    currentPosition : number;
    currentScore = [];
    currentId = [];
    getScoreAndId = [];
    subTotalScore = [];
    activeTabIndex = 0;
    PositionNo;
    fixedCols = 18;
    fixedRowHeight = 30;
    ratioGutter = 1;
    color = '#3f51b5'
    color2 = '#fafafa'
    countHeader : number = 0;
    countHead3 : number;
    countHead3full : number =0;
    flagCreate : boolean = false;
    headdata
    public form2: FormGroup;
    public form3: FormGroup;
    constructor(private router : Router, public http:Http ,private fb: FormBuilder, public dialog: MdDialog) { }
    ngOnInit() {
        this.http.get(GlobalServiceRef.URLService+"/Header/position")
        .subscribe(res => this.position = res.json());
        this.http.get(GlobalServiceRef.URLService+"/Eva/EvaData/"+this.EvaId)
        .subscribe(res => {this.getEva = res.json();
            this.currentPosition = this.getEva[0].Part2ID;
            this.http.get(GlobalServiceRef.URLService+"/Header/All/"+this.currentPosition+"/"+this.EvaId)
            .subscribe(res => {
                this.header = res.json();
                this.countHeader = 0;
                this.countHead3full = 0;
                for(let data in this.header)
                {
                    this.flag[data] = false;
                    this.flagAdd[data] =false;
                    if(this.header[data].H_Level == 1)
                        this.countHeader++;
                    else if(this.header[data].H_Level == 2)
                    {
                        //console.log(this.header[data].H_Level+" "+this.header[data].Text+" "+this.counthead2)
                        this.subTotalScore[data] = "N/A";
                    }
                    else if(this.header[data].H_Level == 3)
                    {
                        //console.log(this.header[data].point+" "+this.header[data].Text+" "+this.counthead3)
                        this.currentScore[data] = this.header[data].point;
                        this.currentId[data] = this.header[data].H_ID;
                        this.countHead3full++;
                    }
                }
            });
        });
    }
    callHeader(id)
    {
        this.currentScore = [];
        this.currentId = [];
        this.getScoreAndId = [];
        this.http.get(GlobalServiceRef.URLService+"/Header/All/"+id+"/"+this.EvaId)
        .subscribe(res => {this.header = res.json();
            this.countHeader = 0;
            this.countHead3full = 0;
            for(let data in this.header)
            {
                this.flag[data] = false;
                this.flagAdd[data] =false;
                if(this.header[data].H_Level == 1)
                    this.countHeader++;
                else if(this.header[data].H_Level == 2)
                {
                    //console.log(this.header[data].H_Level+" "+this.header[data].Text+" "+this.counthead2)
                    this.subTotalScore[data] = "N/A";
                }
                else if(this.header[data].H_Level == 3)
                {
                    //console.log(this.header[data].point+" "+this.header[data].Text+" "+this.counthead3)
                    this.currentScore[data] = this.header[data].point;
                    this.currentId[data] = this.header[data].H_ID;
                    this.countHead3full++;
                    //console.log("Score:"+this.currentScore[data]+" Id:"+this.currentId[data]+" H3Full:"+this.countHead3full)
                }
            }
        });
    }
    onSubmit(Id : MdSelect){
        this.callHeader(Id);
        //this.back.emit(this.PeriodId);
    }
    openDialogHead(HeadId:number, PositionNo:number, Level:number, i:number) {
        if(Level == 1)
        {
            let dialogRef = this.dialog.open(InsertDialog);
            dialogRef.afterClosed().subscribe(res => {
                try{
                    if(res != 'cancel')
                    {
                        let TextThai = res[0];
                        let TextEng = res[1];
                        let TextAlias = res[2];
                        this.insertHeader1(HeadId,PositionNo,TextThai,TextEng,TextAlias);
                    }
                }
                catch(ee)
                {}
            });
        }
        else if(Level == 2)
        {
            let dialogRef = this.dialog.open(InsertDialog2);
            dialogRef.afterClosed().subscribe(res => {
                try{
                    if(res != 'cancel')
                    {
                        let TextThai = res[0];
                        let TextEng = res[1];
                        this.insertHeader2(i,HeadId,PositionNo,TextThai,TextEng);
                    }
                    else
                    {
                        this.callflagAdd(i)
                    }
                }
                catch(ee)
                {}
            });
        }
        else if(Level == 3)
        {
            let dialogRef = this.dialog.open(InsertDialog3);
            dialogRef.afterClosed().subscribe(res => {
                try{
                    if(res != 'cancel')
                    {
                        let TextThai = res[0];
                        this.insertHeader3(i,HeadId,PositionNo,TextThai);
                    }
                    else
                    {
                        this.callflagAdd(i)
                    }
                }
                catch(ee)
                {}
            });
        }
    }
    insertHeader1(HeadId:number, PositionNo:number ,TextThai: string,TextEng: string,TextAlias : string)
    {
        this.callflagHead1(true);
        console.log(HeadId+" "+PositionNo+" "+this.EvaId+" "+TextThai+" "+TextEng+" "+TextAlias)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body : string = JSON.stringify({H_ID:HeadId,PositionNo:PositionNo,Eva_Id:this.EvaId,Text:TextThai,Text_Eng:TextEng,Alias:TextAlias});
        this.http.put(GlobalServiceRef.URLService+"/Header/Insert",body,{
            headers: headers
        }).subscribe((res: Response) => {
            let result = res.json();
            this.callHeader(PositionNo);
        });
    }
    // insertHeader1(HeadId:number, PositionNo:number ,TextThai: string,TextEng: string,TextAlias : string)
    // {
        //     this.callflagHead1(true);
        //     console.log(HeadId+" "+PositionNo+" "+this.EvaId+" "+TextThai.value+" "+TextEng.value+" "+TextAlias.value)
        //     let headers = new Headers({ 'Content-Type': 'application/json' });
        //     let body : string = JSON.stringify({H_ID:HeadId,PositionNo:PositionNo,Eva_Id:this.EvaId,Text:TextThai.value,Text_Eng:TextEng.value,Alias:TextAlias.value});
        //     this.http.put(GlobalServiceRef.URLService+"/Header/Insert",body,{
            //         headers: headers
            //     }).subscribe((res: Response) => {
                //         let result = res.json();
                //     });
                //     this.callHeader(PositionNo);
                //     this.form1.reset();
                // }
                insertHeader2(i:number,HeadId:number, PositionNo:number,TextThai: string,TextEng: string)
                {
                    this.callflagAdd(i);
                    console.log(HeadId+" "+PositionNo+" "+this.EvaId+" "+TextThai+" "+TextEng)
                    let headers = new Headers({ 'Content-Type': 'application/json' });
                    let body : string = JSON.stringify({H_ID:HeadId,PositionNo:PositionNo,Eva_Id:this.EvaId,Text:TextThai,Text_Eng:TextEng,Alias:"-"});
                    this.http.put(GlobalServiceRef.URLService+"/Header/Insert",body,{
                        headers: headers
                    }).subscribe((res: Response) => {
                        let result = res.json();
                        this.callHeader(PositionNo);
                    });
                }
                insertHeader3(i:number,HeadId:number, PositionNo:number ,TextThai: string)
                {
                    this.currentScore = [];
                    this.currentId = [];
                    this.getScoreAndId = [];
                    this.callflagAdd(i);
                    let headers = new Headers({ 'Content-Type': 'application/json' });
                    let body : string = JSON.stringify({H_ID:HeadId,PositionNo:PositionNo,Eva_Id:this.EvaId,Text:TextThai,Text_Eng:"-",Alias:"-"});
                    this.http.put(GlobalServiceRef.URLService+"/Header/Insert",body,{
                        headers: headers
                    }).subscribe((res: Response) => {
                        let result = res.json();
                        this.http.get(GlobalServiceRef.URLService+"/Header/All/"+PositionNo+"/"+this.EvaId)
                        .subscribe(res => {this.header = res.json();
                            this.countHeader = 0;
                            this.countHead3full = 0;
                            for(let data in this.header)
                            {
                                this.flagAdd[data] =false;
                                if(this.header[data].H_Level == 1)
                                    this.countHeader++;
                                else if(this.header[data].H_Level == 2)
                                {
                                    //console.log(this.header[data].H_Level+" "+this.header[data].Text+" "+this.counthead2)
                                    this.subTotalScore[data] = "N/A";
                                }
                                else if(this.header[data].H_Level == 3)
                                {
                                    //console.log(this.header[data].point+" "+this.header[data].Text+" "+this.counthead3)
                                    this.currentScore[data] = this.header[data].point;
                                    this.currentId[data] = this.header[data].H_ID;
                                    this.countHead3full++;
                                }
                            }
                        });
                    });
                }
                callflag(get : number)
                {
                    if(this.flag[get] == true)
                        this.flag[get] = false;
                    else
                        this.flag[get] = true;

                }
                callflagHead1(flag : boolean)
                {
                    if(this.flagCreate == true)
                        this.flagCreate = false;
                    else
                        this.flagCreate = true;
                }
                callflagAdd(get : number)
                {
                    if(this.flagAdd[get] == true)
                        this.flagAdd[get] = false;
                    else
                    {
                        this.flagAdd[get] = true;
                    }

                }
                passScore(pass : boolean)
                {
                    if(pass == true)
                        this.activeTabIndex++;
                    else
                        this.activeTabIndex--;
                }
                finishEvaluate()
                {
                    for(let data in this.currentScore)
                    {
                        this.getScoreAndId.push({Id:this.currentId[data],Score:this.currentScore[data],EvaId:this.EvaId})
                    }
                    let headers = new Headers({ 'Content-Type': 'application/json' });
                    let body : string = JSON.stringify(this.getScoreAndId);
                    this.http.put(GlobalServiceRef.URLService+"/Header/Update",body,{
                        headers: headers
                    }).subscribe((res: Response) => {
                        console.log("Complete")
                    });
                    console.log(body)
                    this.currentScore = [];
                    this.currentId = [];
                    this.getScoreAndId = [];
                    this.back.emit(this.PeriodId);
                }
                ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
                    for (let propName in changes) {
                        this.countHead3 = 0;
                        for(let data in this.currentScore)
                        {
                            if(this.currentScore[data] != 0)
                                this.countHead3++;
                        }
                        console.log(this.countHead3+" "+this.countHead3full)
                    }
                }
                call()
                {
                    this.countHead3 = 0;
                    for(let data in this.currentScore)
                    {
                        if(this.currentScore[data] != 0)
                            this.countHead3++;
                    }
                    console.log(this.countHead3+" "+this.countHead3full)
                }

            }
