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
  PositionId : Number;
  HeadTopId : Number;
  HeadTopName: String;
  HeadMidName: String;
  HeadMidId : Number;
  getJobId(Id :Number)
  {
    this.PositionId = Id;
  }
  getHeadTopId(Id :Number, Name: String)
  {
    this.HeadTopId = Id;
    this.HeadTopName = Name
    this.headtop = false;
    this.headmid = true;
    this.headbot = false;
  }
  getHeadTopName(Name: String)
  {
    this.HeadTopName = Name
  }
  getHeadMidName(Name: String)
  {
    this.HeadMidName = Name
  }
  getHeadMidId(Id :Number)
  {
    this.HeadMidId = Id;
    this.headtop = false;
    this.headmid = false;
    this.headbot = true;
  }
  back(page : Number)
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
