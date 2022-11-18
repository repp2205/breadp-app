import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { OrderService } from '../../../services/order.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  date: Date;
  minDate: Date;
  maxDate: Date;
  userId: number;
  categories: any;
  orderId: string;
  pickupTime: string;
  orderCreate: string;
  panelOpenState: boolean;
  displayedColumns: string[];
  displayedColumnsResume: string[];
  productsSelectedList: MatTableDataSource<any>;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              private activitedRoute: ActivatedRoute,
              private orderService: OrderService,
              private dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.userId = 0;
    this.orderId = '';
    this.orderCreate = '';
    this.date = new Date();
    this.minDate = new Date();
    this.maxDate = this.addDays(new Date(), 2);
    this.pickupTime = this.date.toString().substring(16, 21);
    this.panelOpenState = false;
    this.productsSelectedList = new MatTableDataSource();
    this.displayedColumns = ['name', 'image', 'totalAmount', 'selected'];
    this.displayedColumnsResume = ['quantity', 'name', 'amount', 'totalAmount'];

    this.categories = {
      Panaderia: [], Pasteleria: [], Bebidas: [], Desayunos: [], Lacteos: []
    };

    Object.keys(this.categories).forEach((category: string) => {
      this.categories[category] = this.data.productList.filter((product: any) => {
        return product.category.toLowerCase() === category.toLowerCase()
      });
      this.categories[category] = new MatTableDataSource(this.categories[category]);
    });
  }


  addDays(date: Date, days: number): Date {
    let result = date;
    result.setDate(result.getDate() + days);
    return result;
  }

  ngOnInit(): void {
    this.userId = Number(this.activitedRoute.snapshot.queryParams.u);
  }

  getCategoryList(): string[] {
    return Object.keys(this.categories);
  }

  nextStep() {
    Object.keys(this.categories).forEach((category: any) => {
      this.categories[category].filteredData.forEach((product: any) => {
        if (product.selected) {
          product.totalAmount = product.selected * product.amount;
          this.productsSelectedList.data.push(product);
        }
      });
    });
    const total = this.productsSelectedList.data.map((item: any) => { return item.totalAmount }).reduce((partialSum: any, a: any) => partialSum + a, 0);
    this.productsSelectedList.data.push({ totalAmount: total });
  }

  getNewPickupTime(e: any) {
    this.pickupTime = e;
  }

  hasSelectedProducts() {
    let hasSelected = 0;
    Object.keys(this.categories).forEach((category: any) => {
      this.categories[category].filteredData.forEach((product: any) => {
        hasSelected = hasSelected + ((product.selected) ? product.selected : 0);
      })
    });
    return (hasSelected > 0);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrder(): void {
    let products = this.productsSelectedList.data;
    products.pop();
    const order = {
      userId: this.userId,
      branchOfficeId: this.data.branchOffice.id,
      pickUpTime: this.getFormatPickupTime(),
      products: products.map((item: any) => {
        return {
          productId: item.productId,
          quantity: item.selected,
          totalAmount: item.totalAmount
        };
      })
    }
    this.orderService.createOrder(order).subscribe((response: any) => {
      this.orderId = response.orderId;
      this.orderCreate = 'success';
      this.dataService.order = Math.random().toString();
    }, error => {
      this.orderCreate = 'error';
    });
  }

  getFormatPickupTime(): string {
    let date = this.date.toISOString().replace('T', ' ');
    date = date.substring(0, date.length - 5).replace(date.substring(11, 16), this.pickupTime);
    return date;
  }
}
