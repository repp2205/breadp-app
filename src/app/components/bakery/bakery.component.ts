import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { BakeryService } from '../../services/bakery.service';

@Component({
  selector: 'app-bakery',
  templateUrl: './bakery.component.html',
  styleUrls: ['./bakery.component.scss']
})
export class BakeryComponent implements OnInit {

  bakeryList: any[];
  productList: any[];
  panelOpenState: boolean;

  constructor(public dialog: MatDialog,
              private bakeryService: BakeryService) {
    this.panelOpenState = false;
    this.bakeryList = [];
    this.productList = [
      {}
    ];
  }

  ngOnInit(): void {
    this.getBakerys();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: { name: 'asdasd', animal: 'this.animal'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getBakerys() {
    this.bakeryService.getBakerys().subscribe((response: any) => {
      this.bakeryList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
}
