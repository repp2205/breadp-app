import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  role: number;
  orderList: any[];
  panelOpenState: boolean;
  displayedColumns: string[];

  constructor(private orderService: OrderService,
              private activitedRoute: ActivatedRoute,
              private dataService: DataService,
              private toastService: ToastrService,
              private translateService: TranslateService) {
    this.role = 0;
    this.orderList = [];
    this.panelOpenState = false;
    this.displayedColumns = ['id', 'image', 'name', 'category', 'quantity', 'totalAmount'];
  }

  ngOnInit(): void {
    this.role = Number(this.activitedRoute.snapshot.queryParams.r)
    this.listOrders();

    this.dataService.order$.subscribe(() => {
      this.listOrders();
    });
  }

  listOrders() {
    this.orderList = [];
    if (this.role === 0) {
      this.getOrdersByUserId(Number(this.activitedRoute.snapshot.queryParams.u));
    } else {
      this.getOrdersByBranchOfficeId(Number(this.activitedRoute.snapshot.queryParams.b));
    }
  }

  getStatusOrder(status: number): string {
    return status === 0 ? 'CREATED' : status === 1 ? 'DELIVERED' : 'CANCEL';
  }

  getOrdersByUserId(userId: number) {
    this.orderService.getOrdersByUser(userId).subscribe((response: any) => {
      this.orderList = response;
      this.orderList.forEach(item => {
        const total = item.products.map((item: any) => { return item.totalAmount }).reduce((partialSum: any, a: any) => partialSum + a, 0);
        item.products.push({ totalAmount: total });
        item.products = new MatTableDataSource(item.products);
      });
    },(error: any) => {
      this.toastService.error(this.translateService.instant('ERRORS.ORDER_LIST'), this.translateService.instant('ERRORS.TITLE'));
    });
  }

  getOrdersByBranchOfficeId(branchOfficeId: number) {
    this.orderService.getOrdersByBranchOffice(branchOfficeId).subscribe((response: any) => {
      this.orderList = response;
      this.orderList.forEach(item => {
        const total = item.products.map((item: any) => { return item.totalAmount }).reduce((partialSum: any, a: any) => partialSum + a, 0);
        item.products.push({ totalAmount: total });
        item.products = new MatTableDataSource(item.products);
      });
    },(error: any) => {
      this.toastService.error(this.translateService.instant('ERRORS.ORDER_LIST'), this.translateService.instant('ERRORS.TITLE'));
    });
  }

  updateOrder(orderId: number, status: number) {
    this.orderService.updateOrder(orderId, status).subscribe((response: any) => {
      this.listOrders();
    }, error => {
      if (error.status === 200) {
        this.listOrders();
      }
      console.log(error);
    });
  }
}
