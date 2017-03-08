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
    activeTabIndex = 0;
    PositionNo;
    fixedCols = 18;
    fixedRowHeight = 30;
    ratioGutter = 1;
    color = '#3f51b5'
    color2 = '#fafafa'
    countHeader : number = 0;
    constructor(private router : Router, public http:Http) { }
    ngOnInit() {
        this.http.get(GlobalServiceRef.URLService+"/Eva/EvaData/"+this.EvaId)
        .subscribe(res => {this.getEva = res.json();
            this.currentPosition = this.getEva[0].Part2ID;
            this.http.get(GlobalServiceRef.URLService+"/Header/All/"+this.currentPosition)
            .subscribe(res => {
                this.header = res.json();
                this.currentPosition = this.getEva[0].Part2ID;
                this.countHeader = 0;
                for(let data in this.header)
                {
                    this.flag[data] = false;
                    if(this.header[data].H_Level == 1)
                        this.countHeader++;
                }
            });
            this.currentPosition = this.getEva[0].Part2ID;
        });
        this.http.get(GlobalServiceRef.URLService+"/Header/position").subscribe(res => this.position = res.json());
    }
    onSubmit(Id : MdSelect){
        this.http.get(GlobalServiceRef.URLService+"/Header/All/"+Id)
        .subscribe(res => {this.header = res.json();
                            this.countHeader = 0;
                            for(let data in this.header)
                            {
                                this.flag[data] = false;
                                if(this.header[data].H_Level == 1)
                                this.countHeader++;
                            }
                        });
        //this.back.emit(this.PeriodId);
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
        for(let data in this.currentScore)
        {
            console.log(this.currentScore[data])
        }
        if(pass == true)
            this.activeTabIndex++;
        else
            this.activeTabIndex--;
    }

}