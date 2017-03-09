import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { GlobalServiceRef} from '../../shared/GlobalServiceRef'
import { MdSelect } from '@angular/material';

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
    score = [1,2,3,4,5];
    currentPosition;
    currentScore = [];
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
    flagCreate : number = 1;
    headdata
    public form: FormGroup;
    constructor(private router : Router, public http:Http ,private fb: FormBuilder) { }
    ngOnInit() {
        this.http.get(GlobalServiceRef.URLService+"/Eva/EvaData/"+this.EvaId)
        .subscribe(res => {this.getEva = res.json();
            this.currentPosition = this.getEva[0].Part2ID;
            this.http.get(GlobalServiceRef.URLService+"/Header/All/"+this.currentPosition+"/"+this.EvaId)
            .subscribe(res => {
                this.header = res.json();
                this.currentPosition = this.getEva[0].Part2ID;
                this.countHeader = 0;
                this.countHead3full = 0;
                for(let data in this.header)
                {
                    this.flag[data] = false;
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
                        this.currentScore[data] = 0//this.header[data].point;
                        this.countHead3full++;
                    }
                }
            });
            this.currentPosition = this.getEva[0].Part2ID;
        });
        this.http.get(GlobalServiceRef.URLService+"/Header/position")
        .subscribe(res => this.position = res.json());

        this.form = this.fb.group({
            TextThai: [null, Validators.required],
            TextEng: [null, Validators.required],
            TextAlias: [null, Validators.required] 
        })
    }
    onSubmit(Id : MdSelect){
        this.http.get(GlobalServiceRef.URLService+"/Header/All/"+Id+"/"+this.EvaId)
        .subscribe(res => {this.header = res.json();
            this.countHeader = 0;
            this.countHead3full = 0;
            for(let data in this.header)
            {
                this.flag[data] = false;
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
                    this.countHead3full++;
                }
            }
        });
        //this.back.emit(this.PeriodId);
    }
    insertHeader(HeadId:number, PositionNo:number,EvaId:number ,TextThai: HTMLInputElement,TextEng: HTMLInputElement,TextAlias: HTMLInputElement)
    {
        this.flagCreate = 1;
        console.log(HeadId+" "+PositionNo+" "+EvaId+" "+TextThai.value+" "+TextEng.value+" "+TextAlias.value)
        //this.Header = new HeaderTop(this.PositionId,TextThai.value,TextEng.value,TextAlias.value)
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let body : string = JSON.stringify({Text:TextThai.value,Text_Eng:TextEng.value,Alias:TextAlias.value});
        // this.http.put(GlobalServiceRef.URLService+"/Header/HeaderTop/Insert",body,{
        //     headers: headers
        // }).subscribe((res: Response) => {
        //     let result = res.json();
        // });
        // this.http.get(GlobalServiceRef.URLService+"/Header/HeaderTop/Job/"+this.PositionId)
        // .subscribe(res => this.data = res.json());
        // this.form.reset();
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
    callflag(get : number)
    {
        if(this.flag[get] == true)
            this.flag[get] = false;
        else
            this.flag[get] = true;

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
            console.log(this.currentScore[data])
        }
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
