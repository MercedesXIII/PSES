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
  HeadMidId : Number;
  getJobId(Id :Number)
  {
    this.PositionId = Id;
  }
  getHeadTopId(Id :Number)
  {
    this.HeadTopId = Id;
    this.headtop = false;
    this.headmid = true;
    this.headbot = false;
  }
  getHeadMidId(Id :Number)
  {
    this.HeadMidId = Id;
    this.headtop = false;
    this.headmid = false;
    this.headbot = true;
  }

}
