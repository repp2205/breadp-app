import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { OrderService } from '../../../services/order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ModalComponent} from "../../bakery/modal/modal.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalRecoverComponent implements OnInit {

  formRecover: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    const regex = new RegExp('^\\w+([.-_+]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,10})+$');
    this.formRecover = new FormGroup({
        user: new FormControl('', [Validators.required, Validators.pattern(regex)]),
      }
    );
  }

  ngOnInit(): void {}

  recoverPassword() {
    this.dialogRef.close();
  }

}
