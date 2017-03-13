import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TranslateService } from 'ng2-translate';

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
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxHide="false" style="height: 150px; width: 430px;" fxHide.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p>{{Message| translate}}</p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions><button md-raised-button color="{{OkBtnColor}}" type="button" (click)="dialogRef.close('ok')">{{OkBtnText | translate}}</button>
	<button md-button type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
	</div></div>
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxShow="false" style="height: 150px; width: 200px;" fxShow.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p> {{Message| translate}} </p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions><button md-raised-button color="{{OkBtnColor}}" type="button" (click)="dialogRef.close('ok')">{{OkBtnText | translate}}</button>
	<button md-button type="button" (click)="dialogRef.close('cancel')">{{CancelBtnText | translate}}</button></md-dialog-actions>
	</div></div>`
})
export class ConfirmDialog {
	Message: string = "Are you sure?";
	TitleText: string = "Confirm";
	OkBtnText: string = "ok";
	OkBtnColor: string = "primary";
	CancelBtnText: string = "cancel";
	constructor(public dialogRef: MdDialogRef <ConfirmDialog>,private translate: TranslateService ) {}

	public SetTitleText(text: string){
		this.TitleText = text;
	}
	public SetMessagge(_Message: string){
		this.Message = _Message;
	} 
	public SetOkBtnText(text: string){
		this.OkBtnText = text;
	}
	public SetCancelText(text: string){
		this.CancelBtnText = text;
	}
	public SetOkbtnColor(colortext: string){
		this.OkBtnColor = colortext;
	}
	public SetDialogType(dialogType: string){
		if(dialogType === "delete"){
			this.TitleText = "comfirm delete";
			this.Message = "do you really want to delete?";
			this.OkBtnText = "DELETE";
			this.CancelBtnText = "Cancel";
			this.OkBtnColor = "warn";
		}
	}
}

@Component({
	selector: 'normal-dialog',
	template: `
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxHide="false" style="height: 150px; width: 430px;" fxHide.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p> {{Message| translate}} </p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions>
	<button md-button type="button" (click)="dialogRef.close()">{{OkBtnText | translate}}</button></md-dialog-actions>
	</div></div>
	<div fxFlex fxLayout="column" fxLayoutAlign="start stretch" fxShow="false" style="height: 150px; width: 200px;" fxShow.xs>
	<h5 md-dialog-title>{{TitleText| translate}}</h5>
	<md-dialog-content><p> {{'something error please try again later or contact admin'| translate}} </p></md-dialog-content>
	<hr>
	<div fxLayout="row" fxLayoutAlign="end end" >
	<md-dialog-actions>
	<button md-button type="button" (click)="dialogRef.close('ok')">{{OkBtnText | translate}}</button></md-dialog-actions>
	</div></div>`
})
export class NormalDialog {
	Message: string = "alert!";
	TitleText: string = "!!";
	OkBtnText: string = "close";

	constructor(public dialogRef: MdDialogRef <NormalDialog>,private translate: TranslateService ) {}

	public SetMessagge(_Message: string){
		this.Message = _Message;
	}
	public SetOkBtnText(text: string){
		this.OkBtnText = text;
	}
	public SetTitleText(text: string){
		this.TitleText = text;
	}
	public SetDialogType(dialogType: string){
		if(dialogType === "error"){
			this.TitleText = "Error!";
			this.Message = "something error please try again later or contact admin";
			this.OkBtnText = "close";
		}
	}

}
