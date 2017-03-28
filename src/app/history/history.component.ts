import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  EvaId: number;
  showList: number = 1;
  constructor() { }

  ngOnInit() {
  }
  getEvaId(Id: number) {
    this.EvaId = Id;
    this.showList = 2;
  }
  back(flag: boolean) {
    if (flag == true)
      this.showList = 1;
  }

}
