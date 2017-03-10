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
    flagAdd = [];
    score = [1,2,3,4,5];
    currentPosition : number;
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
    public form2: FormGroup;
    public form3: FormGroup;
    constructor(private router : Router, public http:Http ,private fb: FormBuilder) { }
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
                        this.countHead3full++;
                    }
                }
            });
        });
        this.form2 = this.fb.group({
            TextThai2: [null, Validators.required],
            TextEng2: [null, Validators.required]
        })
        this.form3 = this.fb.group({
            TextThai3: [null, Validators.required]
        })
    }
    callHeader(id)
    {
        this.http.get(GlobalServiceRef.URLService+"/Header/All/"+id+"/"+this.EvaId)
        .subscribe(res => {this.header = res.json();
            this.countHeader = 0;
            this.countHead3full = 0;
            for(let data in this.header)
            {
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
    }
    onSubmit(Id : MdSelect){
            this.callHeader(Id);
        //this.back.emit(this.PeriodId);
    }
    insertHeader2(i:number,HeadId:number, PositionNo:number,EvaId:number ,TextThai: HTMLInputElement,TextEng: HTMLInputElement)
    {
        this.callflagAdd(i);
        console.log(HeadId+" "+PositionNo+" "+EvaId+" "+TextThai.value+" "+TextEng.value)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body : string = JSON.stringify({H_ID:HeadId,PositionNo:PositionNo,Eva_Id:EvaId,Text:TextThai.value,Text_Eng:TextEng.value,Alias:"-"});
        this.http.put(GlobalServiceRef.URLService+"/Header/Insert",body,{
            headers: headers
        }).subscribe((res: Response) => {
            let result = res.json();
        });
        this.callHeader(PositionNo);
        this.form2.reset();
    }
    insertHeader3(i:number,HeadId:number, PositionNo:number,EvaId:number ,TextThai: HTMLInputElement)
    {
        this.callflagAdd(i);
        console.log(HeadId+" "+PositionNo+" "+EvaId+" "+TextThai.value+" 3")
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body : string = JSON.stringify({H_ID:HeadId,PositionNo:PositionNo,Eva_Id:EvaId,Text:TextThai.value,Text_Eng:"-",Alias:"-"});
        this.http.put(GlobalServiceRef.URLService+"/Header/Insert",body,{
            headers: headers
        }).subscribe((res: Response) => {
            let result = res.json();
        });
        this.callHeader(PositionNo);
        this.form3.reset();
    }
    callflag(get : number)
    {
        if(this.flag[get] == true)
            this.flag[get] = false;
        else
            this.flag[get] = true;

    }
    callflagAdd(get : number)
    {
        if(this.flagAdd[get] == true)
            this.flagAdd[get] = false;
        else
        {
            this.flagAdd[get] = true;
            this.form2.reset();
            this.form3.reset();
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
