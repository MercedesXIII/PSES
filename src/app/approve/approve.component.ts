import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-approve',
	templateUrl: './approve.component.html',
	styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

	EvaId : number;
	showList : number = 1;
	constructor() { }

	ngOnInit() {
	}
	getEvaId(Id : number)
	{
		this.EvaId = Id;
		this.showList = 2;
	}
	back(flag)
	{
		this.showList = 1;
	}

}
