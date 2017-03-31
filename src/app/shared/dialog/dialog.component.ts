import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MdInputDirective } from '@angular/material';
import { TranslateService } from 'ng2-translate';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
	<md-dialog-actions><button md-raised-button color="{{OkBtnColor}}" type="button" (click)="dialogRef.close('ok')">{{OkBtnText | translate}}</button>
	<button md-button type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
	</div></div>
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxShow="false" style="height: 200px; width: 300px; background-color:white; padding:30px; border-radius:5px" fxShow.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p> {{Message1| translate}} {{Message2| translate}} {{Message3| translate}} </p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions><button md-raised-button color="{{OkBtnColor}}" type="button" (click)="dialogRef.close('ok')">{{OkBtnText | translate}}</button>
	<button md-button type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
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
			this.OkBtnColor = "primary";
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
	<form (ngSubmit)="onSubmit(TextThai,TextEng,TextAlias)">
		<md-dialog-content>
				<div class="mb-1">
					<md-input placeholder="TextThai" [formControl]="form.controls['TextThai']" style="width: 100%" #TextThai></md-input>
					<small *ngIf="form.controls['TextThai'].hasError('required') && form.controls['TextThai'].touched" class="md-text-warn">You must include a TextThai.</small>
				</div>
				<div class="mb-1">
					<md-input placeholder="TextEng" [formControl]="form.controls['TextEng']" style="width: 100%" #TextEng></md-input>
					<small *ngIf="form.controls['TextEng'].hasError('required') && form.controls['TextEng'].touched" class="md-text-warn">You must include a TextEng.</small>
				</div>
				<div class="mb-1">
					<md-input placeholder="TextAlias" [maxlength]="1" [formControl]="form.controls['TextAlias']" style="width: 100%" #TextAlias></md-input>
					<small *ngIf="form.controls['TextAlias'].hasError('required') && form.controls['TextAlias'].touched" class="md-text-warn">You must include a TextAlias.</small>
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
			TextEng: [null, Validators.required],
			TextAlias: [null, Validators.required]
		})
	}
	onSubmit(TextThai: MdInputDirective, TextEng: MdInputDirective, TextAlias: MdInputDirective) {
		this.PassValue.push(TextThai.value)
		this.PassValue.push(TextEng.value)
		this.PassValue.push(TextAlias.value)
		this.dialogRef.close(this.PassValue)
		this.form.reset();
	}
}

@Component({
	selector: 'insert-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" style="width: 70vw; background-color:white; padding:30px; border-radius:5px">
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<form (ngSubmit)="onSubmit(TextThai,TextEng,TextAlias)">
		<md-dialog-content>
				<div class="mb-1">
					<md-input placeholder="TextThai" [formControl]="form.controls['TextThai']" style="width: 100%" #TextThai></md-input>
					<small *ngIf="form.controls['TextThai'].hasError('required') && form.controls['TextThai'].touched" class="md-text-warn">You must include a TextThai.</small>
				</div>
				<div class="mb-1">
					<md-input placeholder="TextEng" [formControl]="form.controls['TextEng']" style="width: 100%" #TextEng></md-input>
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
	selector: 'insert-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" style="width: 70vw; background-color:white; padding:30px; border-radius:5px">
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<form (ngSubmit)="onSubmit(TextThai,TextEng,TextAlias)">
		<md-dialog-content>
				<div class="mb-1">
					<md-input placeholder="TextThai" [formControl]="form.controls['TextThai']" style="width: 100%" #TextThai></md-input>
					<small *ngIf="form.controls['TextThai'].hasError('required') && form.controls['TextThai'].touched" class="md-text-warn">You must include a TextThai.</small>
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
export class InsertDialog3 {
	TitleText: string = "Add Topic";
	OkBtnText: string = "OK";
	OkBtnColor: string = "primary";
	CancelBtnText: string = "Cancel";

	PassValue = [];

	public form: FormGroup;
	constructor(public dialogRef: MdDialogRef<InsertDialog3>, private translate: TranslateService, private fb: FormBuilder) {
		this.form = this.fb.group({
			TextThai: [null, Validators.required]
		})
	}
	onSubmit(TextThai: MdInputDirective) {
		this.PassValue.push(TextThai.value)
		this.dialogRef.close(this.PassValue)
		this.form.reset();
	}
}

@Component({
	selector: 'loading-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch">
		<img src="assets/images/giphy.gif" md-list-avatar style="width: 300px; height: 200px;">
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
