import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-bakery',
  templateUrl: './bakery.component.html',
  styleUrls: ['./bakery.component.scss']
})
export class BakeryComponent implements OnInit {

  bakeryList: any[];
  productList: any[];
  branchOfficeList: any[];
  panelOpenState: boolean;

  constructor(public dialog: MatDialog) {
    this.panelOpenState = false;
    this.bakeryList = [
      { id: 1,
        name: 'Panaderia 1',
        nit: '23161321-1',
        address: 'Carrera 91 # 27 - 16',
        contactPhone: 3222222,
        supportEmail: 'da@da.co'
      },
      { id: 2,
        name: 'Panaderia 2',
        nit: '998942-1',
        address: 'Carrera 91 # 27 - 16',
        contactPhone: 5445632,
        supportEmail: 'da@da.co'
      },
      { id: 3,
        name: 'Panaderia 3',
        nit: '018516516-1',
        address: 'Carrera 91 # 27 - 16',
        contactPhone: 7896542,
        supportEmail: 'da@da.co'
      },
      { id: 1,
        name: 'Panaderia 4',
        nit: '1234664-1',
        address: 'Carrera 91 # 27 - 16',
        contactPhone: 7896542,
        supportEmail: 'da@da.co'
      },
    ];

    this.branchOfficeList = [
      {
        name: 'Sucursal 1',
        contactPhone: 7896542,
        supportEmail: 'da@da.co',
        openingTime: '07:00',
        closingTime: '22:00'
      },
      {
        name: 'Sucursal 2',
        contactPhone: 7896542,
        supportEmail: 'da@da.co',
        openingTime: '07:00',
        closingTime: '22:00'
      },
      {
        name: 'Sucursal 3',
        contactPhone: 7896542,
        supportEmail: 'da@da.co',
        openingTime: '07:00',
        closingTime: '22:00'
      }
    ];

    this.productList = [
      {}
    ];
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: {name: 'asdasd', animal: 'this.animal'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
