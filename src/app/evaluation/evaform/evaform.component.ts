import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { CustomValidators } from 'ng2-validation';
import { MdSnackBar, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput, MdInputDirective, MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { GlobalServiceRef } from '../../shared/GlobalServiceRef'

import { ConfirmDialog, InsertDialog, InsertDialog2, InsertDialog3, Loading, TopAddEva } from '../../shared/dialog/dialog.component';

@Component({
	selector: 'app-evaform',
	templateUrl: './evaform.component.html',
	styleUrls: ['./evaform.component.scss']
})
export class EvaformComponent implements OnInit {


	@Input() EvaId: number;
	@Input() PeriodId: number;
	@Output() back = new EventEmitter();

	config: MdDialogConfig = { disableClose: true };
	//tooltip
	point: TooltipPosition = 'below';
	remove: string = 'Delete';
	adddetail: string = 'Add Detail';
	addtopic: string = 'Add Topic';

	getEva = [];
	position = [];
	header = [];
	detail = [];
	flag = [];
	score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	currentPosition: number;
	currentScore = [];
	currentScoreId = [];
	curentParent = [];
	getScoreAndId = [];
	subTotalScore = [];
	finalTotalScore = [];
	passFinalTotalScore = [];
	passSubTotalScore = [];
	Comment = [];
	activeTabIndex = 0;
	PositionNo;
	fixedCols = 18;
	fixedRowHeight = 40;
	ratioGutter = 1;
	color = '#3f51b5'
	color2 = '#fafafa'
	countHeader: number = 0;
	countHead3: number;
	countHead3full: number = 0;
	openDelete: boolean = true;
	x = 0;
	Lang;
	a;

	public form2: FormGroup;
	public form3: FormGroup;
	constructor(public translate: TranslateService, private router: Router, public http: Http, private fb: FormBuilder, public dialog: MdDialog, public ref: ApplicationRef, public snackBar: MdSnackBar) { }
	ngOnInit() {

		this.http.get(GlobalServiceRef.URLService + "/Header/position")
			.subscribe(res => this.position = res.json());
		this.http.get(GlobalServiceRef.URLService + "/Eva/EvaData/" + this.EvaId)
			.subscribe(res => {
				this.getEva = res.json();
				console.log(this.EvaId)
				this.currentPosition = this.getEva[0].Part2ID;
				this.http.get(GlobalServiceRef.URLService + "/Header/All/" + this.currentPosition + "/" + this.EvaId + "/1/EN")
					.subscribe(res => {
						this.header = res.json();
						this.countHeader = 0;
						this.countHead3full = 0;
						for (let data in this.header) {
							this.flag[data] = false;
							if (this.header[data].H_Level == 1) {
								//console.log(this.header[data].point)
								this.Comment[data] = this.header[data].Comment;
								this.countHeader++;
								this.passFinalTotalScore[data] = this.header[data].point;
								this.finalTotalScore[data] = this.calScore(this.header[data].point)
							}
							else if (this.header[data].H_Level == 2) {
								//console.log(this.header[data].Comment + " " + this.EvaId + " " + this.currentPosition)
								this.Comment[data] = this.header[data].Comment;
								//console.log(this.header[data].point)
								this.passSubTotalScore[data] = this.header[data].point;
								this.subTotalScore[data] = this.calScore(this.header[data].point)
							}
							else if (this.header[data].H_Level == 3) {
								//console.log(this.header[data].point+" "+this.header[data].Text+" "+this.counthead3)
								this.currentScore[data] = this.header[data].point;
								this.curentParent[data] = this.header[data].Parent;
								this.currentScoreId[data] = this.header[data].Score_ID;
								this.countHead3full++;
							}
						}
						if (this.translate.currentLang == "th") {
							this.Lang = 'TH'
						}
						else {
							this.Lang = 'EN'
						}
					});
			});
		this.translate.onLangChange.subscribe(() => {
			if (this.translate.currentLang == "th") {
				this.Lang = 'TH'
			}
			else {
				this.Lang = 'EN'
			}
		});
	}
	callHeader(id, lang: string) {
		//this.currentScore = [];
		//this.getScoreAndId = [];
		this.http.get(GlobalServiceRef.URLService + "/Header/All/" + id + "/" + this.EvaId + "/2/" + lang)
			.subscribe(res => {
				this.header = res.json();
				this.countHeader = 0;
				this.countHead3full = 0;
				for (let data in this.header) {
					this.flag[data] = false;
					if (this.header[data].H_Level == 1) {
						this.Comment[data] = this.header[data].Comment;
						this.countHeader++;
						this.passFinalTotalScore[data] = this.header[data].point;
						this.finalTotalScore[data] = this.calScore(this.header[data].point)
					}
					else if (this.header[data].H_Level == 2) {

						this.Comment[data] = this.header[data].Comment;
						this.passSubTotalScore[data] = this.header[data].point;
						this.subTotalScore[data] = this.calScore(this.header[data].point)
					}
					else if (this.header[data].H_Level == 3) {
						//console.log(this.header[data].point+" "+this.header[data].Text+" "+this.counthead3)
						this.currentScore[data] = this.header[data].point;
						this.curentParent[data] = this.header[data].Parent;
						this.currentScoreId[data] = this.header[data].Score_ID;
						this.countHead3full++;
						//console.log("Score:"+this.currentScore[data]+" Id:"+this.currentId[data]+" H3Full:"+this.countHead3full)
					}
				}
			});
	}
	callHeader3(i, id, lang: string) {
		this.http.get(GlobalServiceRef.URLService + "/Header/All/" + id + "/" + this.EvaId + "/2/" + lang)
			.subscribe(res => {
				this.header = res.json();
				this.countHeader = 0;
				this.countHead3full = 0;
				for (let data in this.header) {
					this.flag[data] = false;
					this.flag[i] = true;
					if (this.header[data].H_Level == 1) {
						this.Comment[data] = this.header[data].Comment;
						this.countHeader++;
						this.passFinalTotalScore[data] = this.header[data].point;
						this.finalTotalScore[data] = this.calScore(this.header[data].point)
					}
					else if (this.header[data].H_Level == 2) {
						this.Comment[data] = this.header[data].Comment;
						//console.log(this.header[data].H_Level+" "+this.header[data].Text+" "+this.counthead2)
						this.passSubTotalScore[data] = this.header[data].point;
						this.subTotalScore[data] = this.calScore(this.header[data].point)
					}
					else if (this.header[data].H_Level == 3) {
						//console.log(this.header[data].point+" "+this.header[data].Text+" "+this.counthead3)
						this.currentScore[data] = this.header[data].point;
						this.curentParent[data] = this.header[data].Parent;
						this.currentScoreId[data] = this.header[data].Score_ID;
						this.countHead3full++;
					}
				}
			});
	}
	onSubmit(Id: MdSelect) {
		if (this.translate.currentLang == "th") {
			this.callHeader(Id, "TH")
		}
		else {
			this.callHeader(Id, "EN")
		}
		this.translate.onLangChange.subscribe(() => {
			if (this.translate.currentLang == "th") {
				this.callHeader(Id, "TH")
			}
			else {
				this.callHeader(Id, "EN")
			}
		})
	}
	openDialogHead(HeadId: number, PositionNo: number, Level: number, i: number) {
		if (Level == 1) {
			let dialogRef = this.dialog.open(TopAddEva, this.config);
			dialogRef.componentInstance.Insert(this.currentPosition, Level);
			dialogRef.afterClosed().subscribe(res => {
				try {
					if (res != 'cancel') {
						console.log(res[0] + " " + res[1] + " " + res[2])
						let TextThai = res[0];
						let TextEng = res[1];
						let TextAlias = res[2];
						this.insertHeader1(HeadId, PositionNo, TextThai, TextEng, TextAlias);
					}
				}
				catch (ee)
				{ }
			});
		}
		else if (Level == 2) {
			let dialogRef = this.dialog.open(TopAddEva, this.config);
			dialogRef.componentInstance.Insert(this.currentPosition, Level);
			dialogRef.afterClosed().subscribe(res => {
				try {
					if (res != 'cancel') {
						let TextThai = res[0];
						let TextEng = res[1];
						this.insertHeader2(i, HeadId, PositionNo, TextThai, TextEng);
					}
				}
				catch (ee)
				{ }
			});
		}
		else if (Level == 3) {
			let dialogRef = this.dialog.open(InsertDialog3, this.config);
			dialogRef.afterClosed().subscribe(res => {
				try {
					if (res != 'cancel') {
						let TextThai = res[0];
						this.insertHeader3(i, HeadId, PositionNo, TextThai);
					}
				}
				catch (ee)
				{ }
			});
		}
	}
	calScore(score: number) {
		if (score < 1)
			return "N/A"
		else if (score < 3)
			return "UNA"
		else if (score < 5)
			return "NIM"
		else if (score < 7)
			return "STD"
		else if (score < 9)
			return "AST"
		else
			return "OUT"
	}
	insertHeader1(HeadId: number, PositionNo: number, TextThai: string, TextEng: string, TextAlias: string) {
		//console.log(HeadId + " " + PositionNo + " " + this.EvaId + " " + TextThai + " " + TextEng + " " + TextAlias)
		let dialogRef = this.dialog.open(Loading, this.config);
		dialogRef.afterClosed().subscribe(() => {
			console.log("Loading")
		});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body: string = JSON.stringify({ H_ID: HeadId, PositionNo: PositionNo, Eva_Id: this.EvaId, Text: TextThai, Text_Eng: TextEng, Alias: TextAlias });
		this.http.put(GlobalServiceRef.URLService + "/Header/Insert", body, {
			headers: headers
		}).subscribe((res: Response) => {
			let result = res.json();
			dialogRef.close();
			if (this.translate.currentLang == "th") {
				this.callHeader(PositionNo, "TH")
			}
			else {
				this.callHeader(PositionNo, "EN")
			}
		});
	}
	insertHeader2(i: number, HeadId: number, PositionNo: number, TextThai: string, TextEng: string) {
		//console.log(HeadId + " " + PositionNo + " " + this.EvaId + " " + TextThai + " " + TextEng)
		let dialogRef = this.dialog.open(Loading, this.config);
		dialogRef.afterClosed().subscribe(() => {
			console.log("Loading")
		});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body: string = JSON.stringify({ H_ID: HeadId, PositionNo: PositionNo, Eva_Id: this.EvaId, Text: TextThai, Text_Eng: TextEng, Alias: "-" });
		this.http.put(GlobalServiceRef.URLService + "/Header/Insert", body, {
			headers: headers
		}).subscribe((res: Response) => {
			let result = res.json();
			dialogRef.close();
			if (this.translate.currentLang == "th") {
				this.callHeader(PositionNo, "TH")
			}
			else {
				this.callHeader(PositionNo, "EN")
			}
		});
	}
	insertHeader3(i: number, HeadId: number, PositionNo: number, TextThai: string) {
		//this.currentScore = [];
		//this.getScoreAndId = [];
		let dialogRef = this.dialog.open(Loading, this.config);
		dialogRef.afterClosed().subscribe(() => {
			console.log("Loading")
		});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body: string = JSON.stringify({ H_ID: HeadId, PositionNo: PositionNo, Eva_Id: this.EvaId, Text: TextThai, Text_Eng: "-", Alias: "-" });
		this.http.put(GlobalServiceRef.URLService + "/Header/Insert", body, {
			headers: headers
		}).subscribe((res: Response) => {
			let result = res.json();
			dialogRef.close();
			if (this.translate.currentLang == "th") {
				this.callHeader3(i, PositionNo, "TH")
			}
			else {
				this.callHeader3(i, PositionNo, "EN")
			}
		});
	}
	delete(H_Id: number, indexHead: number, Text: string) {
		let dialogRef = this.dialog.open(ConfirmDialog, this.config);
		dialogRef.componentInstance.SetDialogType("delete");
		dialogRef.componentInstance.SetMessagge(Text);
		dialogRef.afterClosed().subscribe(result => {
			if (result === "ok") {
				this.http.delete(GlobalServiceRef.URLService + "/Header/Delete/" + H_Id)
					.subscribe((res: Response) => {
						if (res.ok) {
							this.header.splice(indexHead, 1);
						}
					});
			}
		});
	}
	callflag(get: number) {
		if (this.flag[get] == false)
			this.flag[get] = true;
		else
			this.flag[get] = false;

	}
	passScore(pass: boolean) {
		if (pass == true)
			this.activeTabIndex++;
		else
			this.activeTabIndex--;
	}
	finishEvaluate() {
		let dialogRef = this.dialog.open(Loading, this.config);
		dialogRef.afterClosed().subscribe(() => {
			console.log("Loading")
		});
		this.x = 1;

		// let config = new MdSnackBarConfig();
		// this.snackBar.open("Waitting", "Close", config);
		for (let data in this.header) {
			if (this.header[data].H_Level == 1) {
				this.getScoreAndId.push({ Id: this.header[data].H_ID, Score: this.passFinalTotalScore[data], EvaId: this.EvaId, Comment: this.Comment[data] })
			}
			else if (this.header[data].H_Level == 2) {
				//console.log(this.CommentH2[data])
				this.getScoreAndId.push({ Id: this.header[data].H_ID, Score: this.passSubTotalScore[data], EvaId: this.EvaId, Comment: this.Comment[data] })
			}
			else if (this.header[data].H_Level == 3) {
				this.getScoreAndId.push({ Id: this.header[data].H_ID, Score: this.currentScore[data], EvaId: this.EvaId })
			}

		}
		console.log(this.PeriodId)
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body: string = JSON.stringify(this.getScoreAndId);
		this.http.put(GlobalServiceRef.URLService + "/Header/Update", body, {
			headers: headers
		}).subscribe((res: Response) => {
			//this.selected[val].StaffIDconsole.log("Complete");
			dialogRef.close();
			this.back.emit(this.PeriodId);
		});
		this.currentScore = [];
		this.getScoreAndId = [];
	}
	call() {
		this.countHead3 = 0;
		for (let data in this.currentScore) {
			if (this.currentScore[data] != 0)
				this.countHead3++;
		}
		//console.log(this.countHead3 + " " + this.countHead3full)
	}
	backpage() {
		this.back.emit(this.PeriodId);
	}
	// calculate() {
	//     for (let data in this.header) {
	//         if (this.header[data].H_Level == 1) {
	//             this.getScoreAndId.push({ Id: this.header[data].H_ID, Score: this.passFinalTotalScore[data], EvaId: this.EvaId, Comment: this.Comment[data] })
	//         }
	//         else if (this.header[data].H_Level == 2) {
	//             //console.log(this.CommentH2[data])
	//             this.getScoreAndId.push({ Id: this.header[data].H_ID, Score: this.passSubTotalScore[data], EvaId: this.EvaId, Comment: this.Comment[data] })
	//         }
	//         else if (this.header[data].H_Level == 3) {
	//             this.getScoreAndId.push({ Id: this.header[data].H_ID, Score: this.currentScore[data], EvaId: this.EvaId })
	//         }

	//     }
	//     let headers = new Headers({ 'Content-Type': 'application/json' });
	//     let body: string = JSON.stringify(this.getScoreAndId);
	//     this.http.put(GlobalServiceRef.URLService + "/Header/Update", body, {
	//         headers: headers
	//     }).subscribe((res: Response) => {
	//         this.callHeader(this.currentPosition);
	//     });
	// }

}
