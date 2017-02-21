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
  getJobId(Id :Number)
  {
    this.PositionId = Id;
    console.log(this.PositionId)
  }
  getHeadTopId(Id :Number)
  {
    this.HeadTopId = Id;
    console.log(this.HeadTopId)
  }

}
