import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manageheader',
  templateUrl: './manageheader.component.html',
})
export class ManageheaderComponent implements OnInit {
  
  headtop : boolean = true;
  headmid : boolean = false;
  headbot : boolean = false;
  constructor() { }

  ngOnInit() {
  }
  PositionId : number;
  HeadTopId : number;
  HeadTopName: string;
  HeadMidName: string;
  HeadMidId : number;
  getJobId(Id :number)
  {
    this.PositionId = Id;
  }
  getHeadTopId(Id :number, Name: string)
  {
    this.HeadTopId = Id;
    this.HeadTopName = Name
    this.headtop = false;
    this.headmid = true;
    this.headbot = false;
  }
  getHeadTopName(Name: string)
  {
    this.HeadTopName = Name
  }
  getHeadMidName(Name: string)
  {
    this.HeadMidName = Name
  }
  getHeadMidId(Id :number)
  {
    this.HeadMidId = Id;
    this.headtop = false;
    this.headmid = false;
    this.headbot = true;
  }
  back(page : number)
  {
    if(page == 1)
    {
        this.headtop = true;
        this.headmid = false;
        this.headbot = false;
    }
    else if(page == 2)
    {
        this.headtop = false;
        this.headmid = true;
        this.headbot = false;
    }
  }

}
