import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  branchOfficeList: any[];
  branchOfficeSelected: number;
  displayedColumns: string[];
  orderList: MatTableDataSource<any>;

  constructor(private orderService: OrderService,
              private toastService: ToastrService,
              private translateService: TranslateService) {
    // @ts-ignore
    this.orderList = new MatTableDataSource([]);
    this.branchOfficeList = [];
    this.branchOfficeSelected = 3;
    this.displayedColumns = ['orderId', 'orderDate', 'pickUpTime', 'products', 'status'];
  }

  ngOnInit(): void {
    this.getOrdersByBranchOfficeId();
  }

  getOrdersByBranchOfficeId() {
    this.orderService.getOrdersByBranchOffice(this.branchOfficeSelected).subscribe((response: any) => {
      this.orderList = response;
    },(error: any) => {
      this.toastService.error(this.translateService.instant('ERRORS.ORDER_LIST'), this.translateService.instant('ERRORS.TITLE'));
    });
  }

  getStatusOrder(status: number): string {
    return status === 0 ? 'CREATED' : status === 1 ? 'DELIVERED' : 'CANCEL';
  }
}
