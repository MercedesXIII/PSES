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
    @Input() PeriodId : number;
    ngOnInit() {
    }
    listeva = [];
    selected = [];
    @Output() back = new EventEmitter();
    constructor(private router : Router, public http:Http) {
        this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
    }
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (let propName in changes) {
            if(this.LoginResultJson['EmployeeID'] !== undefined && this.PeriodId !== undefined)
            {
                this.http.get(GlobalServiceRef.URLService+"/Eva/GetEvaList/"+this.LoginResultJson['EmployeeID']
                    +"/"+this.PeriodId).subscribe(res => this.listeva = res.json());
            }
        }
    }
    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
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
        for (let val of this.selected)
        {
            let body : string = JSON.stringify({EvaluatorNO:this.LoginResultJson['EmployeeID'],
                EmployeeNO:val['StaffID'],ProjectNO:val['ProjectID'],PeriodID:this.PeriodId});
            this.http.put(GlobalServiceRef.URLService+"/Eva/InsertEva",body,{
                headers: headers
            }).subscribe((res: Response) => {
                if(res.ok){
                    console.log("done");
                }
            });
        }
        this.back.emit(this.PeriodId);
    }
}
