import {Component} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

import { ConfirmDialog } from '../shared/dialog/dialog.component';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestComponent {
   lastCloseResult: string;

  constructor(public dialog: MdDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.componentInstance.SetDialogType("delete");
    dialogRef.afterClosed().subscribe(result => {
    this.lastCloseResult = result });
  }
}