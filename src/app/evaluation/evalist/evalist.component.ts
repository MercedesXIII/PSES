import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ViewChild,NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/startWith';

import { GlobalServiceRef} from '../../shared/GlobalServiceRef'

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
    add: string = 'Add New Evaluate'
    remove: string = 'Delete';
    showPeriod : boolean = false;
    currentPeriod;
    listeva = [];
    period = [];

    @Input() PeriodId :string;
    @Output() outPeriodId = new EventEmitter();
    @Output() outPeriodId2 = new EventEmitter();
    @Output() outEvaId = new EventEmitter();
    constructor(private router : Router, public http:Http,public ngzone :NgZone) {}
    
    ngOnInit() {
        this.LoginResultJson = JSON.parse(sessionStorage.getItem('currentUser'))
        this.http.get(GlobalServiceRef.URLService+"/Eva/Period").subscribe(res => {
            this.period = res.json();
            if(this.PeriodId != undefined && this.PeriodId != 'all')
            {
                this.showPeriod = true;
                this.currentPeriod=this.PeriodId;
                this.http.get(GlobalServiceRef.URLService+"/Eva/Eva/"+this.LoginResultJson['EmployeeID']+"/"+this.PeriodId)
                .subscribe(res => this.listeva = res.json());
            }
            else
            {
                this.showPeriod = false;
                this.currentPeriod = 'all';
                this.http.get(GlobalServiceRef.URLService+"/Eva/Eva/"+this.LoginResultJson['EmployeeID']+"/all")
                .subscribe(res => this.listeva = res.json());
            }
        });
    }
    create(flag : boolean)
    {
        if(flag == true)
        {
            this.showPeriod = true;
        }
        else
        {
            this.showPeriod = false;
        }
    }
    getPeriod(Id : MdSelect)
    {
        try
        {
            this.outPeriodId.emit(Id); 
        }
        catch(ee){}
    }
    getDataPeriod(Id : string)
    {
        try
        {
            if(Id != undefined){
                this.http.get(GlobalServiceRef.URLService+"/Eva/Eva/"+this.LoginResultJson['EmployeeID']+"/"+Id)
                .subscribe(res => {
                    this.listeva = res.json()
                    if(Id == 'all')
                    {
                        this.showPeriod = false;
                    }
                    else
                    {
                        this.showPeriod = true;
                    }
                });
            }
            this.outPeriodId2.emit(Id); 
        }
        catch(ee){}
    }
    delete(event,row,value){

        let del;
        if(confirm("Confirm Delete") == true)
        {
            this.http.delete(GlobalServiceRef.URLService+"/Eva/Delete/"+value["Eva_ID"])
            .subscribe((res: Response) => {
                if(res.ok){
                    console.log("ok");
                }
            });

            this.listeva.splice(value.$$index, 1);
        }
        else
        {
            return 0;
        }
    }
    passEvaId(event,row,value,period){
        this.outEvaId.emit(value["Eva_ID"]);
    }

}
