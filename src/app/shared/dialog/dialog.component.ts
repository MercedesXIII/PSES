import { Component, Input, Output, OnChanges, SimpleChange, EventEmitter, OnInit, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MdSnackBar, MdInputDirective, MdSnackBarConfig, TooltipPosition, MdSelect, MdInput, MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/startWith';

import { GlobalServiceRef } from '../../shared/GlobalServiceRef'

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}

@Component({
	selector: 'comfirm-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxHide="false" style="height: 200px; width: 450px; background-color:white; padding:30px; border-radius:5px;" fxHide.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p>{{Message1| translate}} {{Message2| translate}} {{Message3| translate}}</p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions><button md-raised-button md-button-sm  style="color:white" color="{{OkBtnColor}}" type="button" (click)="dialogRef.close('ok')">{{OkBtnText | translate}}</button>
	<button md-raised-button md-button-sm type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
	</div></div>
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxShow="false" style="height: 200px; width: 300px; background-color:white; padding:30px; border-radius:5px" fxShow.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p> {{Message1| translate}} {{Message2| translate}} {{Message3| translate}} </p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions><button md-raised-button md-button-sm style="color:white" color="{{OkBtnColor}}" type="button" (click)="dialogRef.close('ok')">{{OkBtnText | translate}}</button>
	<button md-raised-button md-button-sm type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
	</div></div>`,
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
  `]
})
export class ConfirmDialog {
	Message1: string;
	Message2: string;
	Message3: string;
	TitleText: string = "Confirm";
	OkBtnText: string = "ok";
	OkBtnColor: string = "primary";
	CancelBtnText: string = "cancel";
	constructor(public dialogRef: MdDialogRef<ConfirmDialog>, private translate: TranslateService) { }

	public SetTitleText(text: string) {
		this.TitleText = text;
	}
	public SetMessagge(_Message: string, ) {
		this.Message2 = "\"" + _Message + "\"";
	}
	public SetOkBtnText(text: string) {
		this.OkBtnText = text;
	}
	public SetCancelText(text: string) {
		this.CancelBtnText = text;
	}
	public SetOkbtnColor(colortext: string) {
		this.OkBtnColor = colortext;
	}
	public SetDialogType(dialogType: string) {
		if (dialogType === "delete") {
			this.TitleText = "Confirm Delete";
			this.Message1 = "Do you want to delete";
			this.Message2 = "Are you sure?";
			this.Message3 = "?";
			this.OkBtnText = "Delete";
			this.CancelBtnText = "Cancel";
			this.OkBtnColor = "warn";
		}
		else if (dialogType === "deleteEva") {
			this.TitleText = "Confirm Delete";
			this.Message1 = "Do you want to delete evaluation";
			this.Message2 = "Are you sure?";
			this.Message3 = "?";
			this.OkBtnText = "Delete";
			this.CancelBtnText = "Cancel";
			this.OkBtnColor = "warn";
		}
		else if (dialogType === "approve") {
			this.TitleText = "Confirm Approve";
			this.Message1 = "Do you want to approve evaluation";
			this.Message2 = "Are you sure?";
			this.Message3 = "?";
			this.OkBtnText = "Confirm";
			this.CancelBtnText = "Cancel";
			this.OkBtnColor = "green";
		}
		else if (dialogType === "reject") {
			this.TitleText = "Confirm Reject";
			this.Message1 = "Do you want to reject evaluation";
			this.Message2 = "Are you sure?";
			this.Message3 = "?";
			this.OkBtnText = "Confirm";
			this.CancelBtnText = "Cancel";
			this.OkBtnColor = "warn";
		}
	}
}

@Component({
	selector: 'normal-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxHide="false" style="height: 200px; width: 450px; background-color:white; padding:30px; border-radius:5px" fxHide.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p> {{Message| translate}} </p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions>
	<button md-button type="button" (click)="dialogRef.close()">{{OkBtnText | translate}}</button></md-dialog-actions>
	</div></div>
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxShow="false" style="height: 200px; width: 300px; background-color:white; padding:30px; border-radius:5px" fxShow.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p> {{'something error please try again later or contact admin'| translate}} </p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions>
	<button md-button type="button" (click)="dialogRef.close('ok')">{{OkBtnText | translate}}</button></md-dialog-actions>
	</div></div>`,
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
  `]
})
export class NormalDialog {
	Message: string = "alert!";
	TitleText: string = "!!";
	OkBtnText: string = "close";

	constructor(public dialogRef: MdDialogRef<NormalDialog>, private translate: TranslateService) { }

	public SetMessagge(_Message: string) {
		this.Message = _Message;
	}
	public SetOkBtnText(text: string) {
		this.OkBtnText = text;
	}
	public SetTitleText(text: string) {
		this.TitleText = text;
	}
	public SetDialogType(dialogType: string) {
		if (dialogType === "error")
			this.TitleText = "Error!";
		this.Message = "something error please try again later or contact admin";
		this.OkBtnText = "close";
	}
}



@Component({
	selector: 'insert-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch"  style="width: 70vw; background-color:white; padding:30px; border-radius:5px">
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<form (ngSubmit)="onSubmit(TextThai,TextEng)">
		<md-dialog-content>
				<div class="mb-1">
					<md-input placeholder="TopicThai" [formControl]="form.controls['TextThai']" style="width: 100%" #TextThai></md-input>
					<small *ngIf="form.controls['TextThai'].hasError('required') && form.controls['TextThai'].touched" class="md-text-warn">You must include a TextThai.</small>
				</div>
				<div class="mb-1">
					<md-input placeholder="TopicEng" [formControl]="form.controls['TextEng']" style="width: 100%" #TextEng></md-input>
					<small *ngIf="form.controls['TextEng'].hasError('required') && form.controls['TextEng'].touched" class="md-text-warn">You must include a TextEng.</small>
				</div>
		</md-dialog-content>
		<div fxLayout="row" fxLayoutAlign="end end" >
		<md-dialog-actions><button md-raised-button color="{{OkBtnColor}}" type="submit" [disabled]="!form.valid" >{{OkBtnText | translate}}</button>
		<button md-button type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
		</div>
	</form>
	</div>`,
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
  `]
})
export class InsertDialog {
	;
	TitleText: string = "Add Topic";
	OkBtnText: string = "OK";
	OkBtnColor: string = "primary";
	CancelBtnText: string = "Cancel";

	PassValue = [];

	public form: FormGroup;
	constructor(public dialogRef: MdDialogRef<InsertDialog>, private translate: TranslateService, private fb: FormBuilder) {
		this.form = this.fb.group({
			TextThai: [null, Validators.required],
			TextEng: [null, Validators.required]
		})
	}
	onSubmit(TextThai: MdInputDirective, TextEng: MdInputDirective) {
		this.PassValue.push(TextThai.value)
		this.PassValue.push(TextEng.value)
		this.dialogRef.close(this.PassValue)
		this.form.reset();
	}
}

@Component({
	selector: 'insert-dialog2',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" style="width: 70vw; background-color:white; padding:30px; border-radius:5px">
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<form (ngSubmit)="onSubmit(TextThai,TextEng)">
		<md-dialog-content>
				<div class="mb-1">
					<md-input placeholder="TopicThai" [formControl]="form.controls['TextThai']" style="width: 100%" #TextThai></md-input>
					<small *ngIf="form.controls['TextThai'].hasError('required') && form.controls['TextThai'].touched" class="md-text-warn">You must include a TextThai.</small>
				</div>
				<div class="mb-1">
					<md-input placeholder="TopicEng" [formControl]="form.controls['TextEng']" style="width: 100%" #TextEng></md-input>
					<small *ngIf="form.controls['TextEng'].hasError('required') && form.controls['TextEng'].touched" class="md-text-warn">You must include a TextEng.</small>
				</div>
		</md-dialog-content>
		<div fxLayout="row" fxLayoutAlign="end end" >
		<md-dialog-actions><button md-raised-button color="{{OkBtnColor}}" type="submit" [disabled]="!form.valid" >{{OkBtnText | translate}}</button>
		<button md-button type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
		</div>
	</form>
	</div>`,
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
  `]
})
export class InsertDialog2 {
	TitleText: string = "Add Topic";
	OkBtnText: string = "OK";
	OkBtnColor: string = "primary";
	CancelBtnText: string = "Cancel";

	PassValue = [];

	public form: FormGroup;
	constructor(public dialogRef: MdDialogRef<InsertDialog2>, private translate: TranslateService, private fb: FormBuilder) {
		this.form = this.fb.group({
			TextThai: [null, Validators.required],
			TextEng: [null, Validators.required]
		})
	}
	onSubmit(TextThai: MdInputDirective, TextEng: MdInputDirective) {
		this.PassValue.push(TextThai.value)
		this.PassValue.push(TextEng.value)
		this.dialogRef.close(this.PassValue)
		this.form.reset();
	}
}

@Component({
	selector: 'insert-dialog3',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" style="width: 70vw; background-color:white; padding:30px; border-radius:5px">
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<form (ngSubmit)="onSubmit(TextThai,TextEng)">
		<md-dialog-content>
				<div class="mb-1">
					<md-input placeholder="TopicThai" [formControl]="form.controls['TextThai']" style="width: 100%" #TextThai></md-input>
					<small *ngIf="form.controls['TextThai'].hasError('required') && form.controls['TextThai'].touched" class="md-text-warn">You must include a TextThai.</small>
				</div>
				<div class="mb-1">
					<md-input placeholder="TopicEng" [formControl]="form.controls['TextEng']" style="width: 100%" #TextEng></md-input>
					<small *ngIf="form.controls['TextEng'].hasError('required') && form.controls['TextEng'].touched" class="md-text-warn">You must include a TextEng.</small>
				</div>
		</md-dialog-content>
		<div fxLayout="row" fxLayoutAlign="end end" >
		<md-dialog-actions><button md-raised-button color="{{OkBtnColor}}" type="submit" [disabled]="!form.valid" >{{OkBtnText | translate}}</button>
		<button md-button type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
		</div>
	</form>
	</div>`,
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
  `]

})
export class InsertDialog3 {
	TitleText: string = "Add Topic";
	OkBtnText: string = "OK";
	OkBtnColor: string = "primary";
	CancelBtnText: string = "Cancel";

	PassValue = [];

	public form: FormGroup;
	constructor(public dialogRef: MdDialogRef<InsertDialog3>, private translate: TranslateService, private fb: FormBuilder) {
		this.form = this.fb.group({
			TextThai: [],
			TextEng: []
		})
	}
	onSubmit(TextThai: MdInputDirective, TextEng: MdInputDirective) {
		this.PassValue.push(TextThai.value)
		this.PassValue.push(TextEng.value)
		this.dialogRef.close(this.PassValue)
		this.form.reset();
	}
}

@Component({
	selector: 'loading-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch">
		<img src="assets/images/giphy.gif" md-list-avatar style="width: 100px; height: 100px;">
	</div>`,
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
  `]

})
export class Loading {
	constructor(public dialogRef: MdDialogRef<Loading>, private translate: TranslateService) { }
}

@Component({
	selector: 'topaddeva-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" style="width: 70vw; background-color:white; padding:30px; border-radius:5px">
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<form (ngSubmit)="onSubmit(Text)">
		<md-dialog-content>
				<div class="mb-1">
					<md-select class="ml-1" [formControl]="form.controls['Text']" placeholder="{{'Add Topic' | translate}}" style="width: 90%;" #Text>
			            <md-option *ngFor="let data of header" [value]="data">
			                {{ data['Text_Language'][Lang] }}
			            </md-option>
			        </md-select>
				</div>
		</md-dialog-content>
		<div fxLayout="row" fxLayoutAlign="end end" >
		<md-dialog-actions><button md-raised-button color="{{OkBtnColor}}" type="submit" [disabled]="!form.valid">{{OkBtnText | translate}}</button>
		<button md-button type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
		</div>
	</form>
	</div>`,
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
  `]

})
export class TopAddEva {
	TitleText: string = "Add Topic";
	OkBtnText: string = "OK";
	OkBtnColor: string = "primary";
	CancelBtnText: string = "Cancel";

	header = [];
	PassValue = [];
	Topic;
	Lang;
	public form: FormGroup;
	constructor(public http: Http, public dialogRef: MdDialogRef<InsertDialog3>, private translate: TranslateService, private fb: FormBuilder) {
		this.form = this.fb.group({
			Text: [null, Validators.required]
		})
	}
	Insert(Position, Level) {
		this.http.get(GlobalServiceRef.URLService + "/Header/GetHeader/" + Position)
			.subscribe(res => {
				for (let data of res.json()) {
					if (data.H_Level == Level)
						this.header.push(data)
				}
				if (this.translate.currentLang == "th") {
					this.Lang = 'TH'
				}
				else {
					this.Lang = 'EN'
				}
			});
	}
	SetText(Text) {
		this.TitleText = Text
	}
	onSubmit(Text: MdSelect) {
		console.log(Text.selected.value)
		this.PassValue.push(Text.selected.value['Text'])
		this.PassValue.push(Text.selected.value['Text_Eng'])
		this.PassValue.push(Text.selected.value['Alias'])
		this.dialogRef.close(this.PassValue)
		this.form.reset();
	}
}

@Component({
	selector: 'addemp-dialog',
	templateUrl: './addemp-dialog.html',
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
	.completer-limit /deep/ .completer-dropdown {
		overflow-y: auto;
		max-height: 8rem;
		width:50vw;
	}
	.completer-limit /deep/ input{
		width:100%;
		display: block;
		height: 34px;
		padding: 6px 12px;
		font-size: 14px;
		line-height: 1.42857143;
		color: #555;
		background-color: #fff;
		background-image: none;
		border: 1px solid #ccc;
		border-radius: 4px;
		-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		
	}
	input{
		display: block;
		height: 20px;
		padding: 6px 12px;
		font-size: 14px;
		line-height: 1.42857143;
		color: #555;
		background-color: #fff;
		background-image: none;
		border: 1px solid #ccc;
		border-radius: 4px;
		-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		-webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
		-o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
	}
	
  `]

})
export class AddEmp {
	TitleText: string = "Add Topic";
	OkBtnText: string = "OK";
	OkBtnColor: string = "primary";
	CancelBtnText: string = "Cancel";
	emp = [];
	Name = [];
	ProjectCode = [];
	Role = [];
	Lang;
	public form: FormGroup;
	constructor(public http: Http, public dialogRef: MdDialogRef<AddEmp>, private translate: TranslateService, private fb: FormBuilder) {
		this.form = this.fb.group({
			EmpName: [null, Validators.required],
			EmpProjectCode: [null, Validators.required],
			EmpRole: [null, Validators.required],
			StartDate: [null, Validators.required],
			FinishDate: [null, Validators.required]

		})
	}
	getValue(Name, ProjectCode, Role) {
		this.Name = Name;
		this.ProjectCode = ProjectCode;
		this.Role = Role;
	}
	onSubmit(_Name: HTMLInputElement, _ProjectCode: HTMLInputElement, _Role: HTMLInputElement, _StartDate: HTMLInputElement, _FinishDate: HTMLInputElement) {
		console.log(_Name.value + " " + _ProjectCode.value + " " + _Role.value + " " + _StartDate.value + " " + _FinishDate.value)
	}


}

@Component({
	selector: 'loading-dialog',
	templateUrl: './evaflow-dialog.html',
	styles: [`
    /deep/ .md-dialog-container
	{
		background:none;
		box-shadow:none;
	}
  `]

})
export class EvaFlow {
	public LoginResultJson: Object;

	//ToolTlip
	position: TooltipPosition = 'below';
	detail: string = 'Detail';
	remove: string = 'Delete';
	wait: string = 'Waiting';
	showPeriod: boolean = false;
	listhistory = [];
	progress = [];
	Lang;

	@Input() PeriodId: string;
	@Output() outEvaId = new EventEmitter();
	constructor(public translate: TranslateService, private router: Router, public http: Http, public ngzone: NgZone, public dialog: MdDialog, public dialogRef: MdDialogRef<AddEmp>, private fb: FormBuilder) { }

	ngOnInit() {
	}
	evaluationFlow(EvaID) {
		this.http.get(GlobalServiceRef.URLService + "/Eva/Approveflow/" + EvaID).subscribe(res => {
			this.listhistory = res.json();
			if (this.translate.currentLang == "th") {
				this.Lang = 'TH'
			}
			else {
				this.Lang = 'EN'
			}
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
}