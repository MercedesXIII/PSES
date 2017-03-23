import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit,ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput,MdInputDirective, MdDialog, MdDialogRef } from '@angular/material';
import { GlobalServiceRef} from '../../shared/GlobalServiceRef'

@Component({
  selector: 'app-approvedetail',
  templateUrl: './approvedetail.component.html',
  styleUrls: ['./approvedetail.component.scss']
})
export class ApprovedetailComponent implements OnInit {

    public LoginResultJson: Object;
    @Input() EvaId : number;
    @Output() back = new EventEmitter();
    //tooltip
    point: TooltipPosition = 'below';
    remove: string = 'Delete';
    adddetail : string = 'Add Detail';
    addtopic : string = 'Add Topic';

    getEva = [];
    header = [];
    detail = [];
    flag = [];
    score = [1,2,3,4,5];
    currentPosition : number;
    currentScore = [];
    currentId = [];
    currentScoreId = [];
    curentParent = [];
    getScoreAndId = [];
    subTotalScore = [];
    finalTotalScore = [];
    activeTabIndex = 0;
    PositionNo;
    fixedCols = 18;
    fixedRowHeight = 40;
    ratioGutter = 1;
    color = '#3f51b5'
    color2 = '#fafafa'
    countHeader : number = 0;
    countHead3 : number;
    countHead3full : number =0;
    openDelete : boolean = true;

    public form2: FormGroup;
    public form3: FormGroup;
    constructor(private router : Router, public http:Http ,private fb: FormBuilder, public dialog: MdDialog,public ref : ApplicationRef) { }
    ngOnInit() {
        console.log(this.EvaId)
        this.http.get(GlobalServiceRef.URLService+"/Eva/EvaData/"+this.EvaId)
        .subscribe(res => {this.getEva = res.json();
            this.currentPosition = this.getEva[0].Part2ID;
            this.http.get(GlobalServiceRef.URLService+"/Header/All/"+this.currentPosition+"/"+this.EvaId+"/1")
            .subscribe(res => {
                this.header = res.json();
                this.countHeader = 0;
                this.countHead3full = 0;
                for(let data in this.header)
                {
                    this.flag[data] = false;
                    if(this.header[data].H_Level == 1)
                    {
                        this.countHeader++;
                        this.finalTotalScore[data] = "N/A";
                    }
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
                        this.curentParent[data] = this.header[data].Parent;
                        this.currentScoreId[data] = this.header[data].Score_ID;
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
                if(this.header[data].H_Level == 1)
                {
                    this.countHeader++;
                    this.finalTotalScore[data] = "N/A";
                }
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
                    this.curentParent[data] = this.header[data].Parent;
                    this.currentScoreId[data] = this.header[data].Score_ID;
                    this.countHead3full++;
                    //console.log("Score:"+this.currentScore[data]+" Id:"+this.currentId[data]+" H3Full:"+this.countHead3full)
                }
            }
        });
    }
    onSubmit(Id : MdSelect){
        this.callHeader(Id);
    }
    callflag(get : number)
    {
        if(this.flag[get] == false)
            this.flag[get] = true;
        else
            this.flag[get] = false;

    }
    passScore(pass : boolean)
    {
        if(pass == true)
            this.activeTabIndex++;
        else
            this.activeTabIndex--;
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
    approve()
    {
        this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
        console.log(this.LoginResultJson['EmployeeID']+" "+this.EvaId)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body : string = JSON.stringify({EmpID:this.LoginResultJson['EmployeeID'],EvaID:this.EvaId});
        this.http.put(GlobalServiceRef.URLService+"/Eva/ApproveStatus",body,{
            headers: headers
        }).subscribe(() => {
            console.log("Complete");
            //this.back.emit(this.PeriodId);
        });
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
