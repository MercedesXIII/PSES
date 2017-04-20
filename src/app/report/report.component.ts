import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor() { }
  flagpage = 0;
  PeriodId;
  Group;
  Subgroup;
  ngOnInit() {
    this.flagpage = 0;
  }
  getPeriodId(Id) {
    this.PeriodId = Id;
    this.flagpage = 1;
  }
  getGroup(Id) {
    this.Group = Id;
    this.flagpage = 1;
  }
  getSubgroup(Id) {
    this.Subgroup = Id;
    this.flagpage = 1;
  }
  backpage(Id) {
    this.flagpage = 0;
  }

}
