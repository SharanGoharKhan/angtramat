import { Component, OnInit, Inject, Output, EventEmitter   } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() add: EventEmitter<any> = new EventEmitter ()
  add_input_model = {}
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onClickAdd () {
    this.add.emit(this.add_input_model);
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
