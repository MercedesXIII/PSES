import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect ,MdCheckbox} from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { GlobalServiceRef} from '../../shared/GlobalServiceRef'

@Component({
    selector: 'app-getevalist',
    templateUrl: './getevalist.component.html',
    styleUrls: ['./getevalist.component.scss']
})
export class GetevalistComponent implements OnChanges {

    public LoginResultJson: Object;

    //ToolTlip
    position: TooltipPosition = 'below';
    chb:boolean = true;
    startDate = [];
    finishDate = [];
    @Input() PeriodId : number;
    ngOnInit() {
        if(this.translate.currentLang == "th")
        {
            console.log("thai")
        }
        else
        {
            console.log("eng")
        }
        this.translate.onLangChange.subscribe(()=>{
            if(this.translate.currentLang == "th")
            {
                console.log("thai")
            }
            else
            {
                console.log("eng")
            }
        })
    }
    listeva = [];
    selected = [];
    @Output() back = new EventEmitter();
    constructor(private router : Router, public http:Http, public translate:TranslateService) {
        this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
    }
    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
        for (let propName in changes) {
            if(this.LoginResultJson['EmployeeID'] !== undefined && this.PeriodId !== undefined)
            {
                this.http.get(GlobalServiceRef.URLService+"/Eva/GetEvaList/"+this.LoginResultJson['EmployeeID']
                    +"/"+this.PeriodId).subscribe(res => {this.listeva = res.json();
                        for(let date in this.listeva)
                        {
                             console.log(this.listeva[date].PlanStartDate+" "+this.listeva[date].PlanFinishDate)
                             this.startDate[date]=this.listeva[date].PlanStartDate;
                             this.finishDate[date]=this.listeva[date].PlanFinishDate;
                        }
                    });
                }
            }
        }
        onSelect({ selected }) {
            this.selected.splice(0, this.selected.length);
            this.selected.push(...selected);
            this.chb = true;
        }
        all(flag : boolean) 
        {
            if(flag == true)
            {
                this.chb = false;
                for(let data of this.listeva)
                {
                    this.selected.push(data)
                }
            }
            else
            {
                this.chb = true;
                this.selected = [];
            }
        }
        onSubmit()
        {

            let headers = new Headers({ 'Content-Type': 'application/json' });
            console.log(this.selected);
            for (let val in this.selected)
            {
                console.log(this.startDate[val]+"-"+this.finishDate[val])
                let body : string = JSON.stringify({EvaluatorNO:this.LoginResultJson['EmployeeID'],
                    EmployeeNO:this.selected[val].StaffID,ProjectNO:this.selected[val].ProjectID,PeriodID:this.PeriodId
                    ,StartDate:this.startDate[val],FinishDate:this.finishDate[val]});
                this.http.put(GlobalServiceRef.URLService+"/Eva/InsertEva",body,{
                    headers: headers
                }).subscribe((res: Response) => {
                    if(res.ok){
                        console.log("done");
                    }
                    this.back.emit(this.PeriodId);
                });
            }
        }
    }
