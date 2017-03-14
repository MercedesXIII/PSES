import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import {MdDialog, MdDialogRef} from '@angular/material';

import { InsertDialog } from '../shared/dialog/dialog.component';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestComponent {
  selectedOption = [];
  constructor(public dialog: MdDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(InsertDialog);
    dialogRef.afterClosed().subscribe(res => {
      this.selectedOption = res;
    });
  }
}