import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headertop',
  templateUrl: './headertop.component.html',
  styleUrls: ['./headertop.component.scss']
})
export class HeadertopComponent implements OnInit {

  PositionId : Number;
  constructor() { }

  ngOnInit() {
  }
  in(Id :Number)
  {
  	this.PositionId = Id;
    console.log(this.PositionId);
  }

}
