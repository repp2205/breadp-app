import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from '../../services/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BakeryService } from '../../services/bakery.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  branchOfficeList: any[];
  displayedColumns: string[];
  branchOfficeSelected: number;
  orderList: MatTableDataSource<any>;
  @ViewChild('paginatorOrders') paginatorOrders: MatPaginator | undefined;

  constructor(private orderService: OrderService,
              private toastService: ToastrService,
              private bakeryService: BakeryService,
              private activitedRoute: ActivatedRoute,
              private translateService: TranslateService) {
    this.branchOfficeList = [];
    this.branchOfficeSelected = 0;
    // @ts-ignore
    this.orderList = new MatTableDataSource([]);
    this.displayedColumns = ['orderId', 'orderDate', 'pickUpTime', 'products', 'status'];
  }

  ngOnInit(): void {
    this.getBranchOfficeByBakery(Number(this.activitedRoute.snapshot.queryParams.b));
  }

  getBranchOfficeByBakery(bakeryId: number) {
    this.bakeryService.getBranchOfficeByBakery(bakeryId).subscribe((response: any) => {
      this.branchOfficeList = response;
    }, error => {
      console.log(error);
    });
  }

  getOrdersByBranchOfficeId() {
    this.orderService.getOrdersByBranchOffice(this.branchOfficeSelected).subscribe((response: any) => {
      if (response.length === 0) {
        // @ts-ignore
        this.orderList = new MatTableDataSource([]);
        this.toastService.warning(this.translateService.instant('ERRORS.NO_ORDERS_BY_BRANCH_OFFICE'), this.translateService.instant('ERRORS.TITLE'));
        return;
      }
      this.orderList = new MatTableDataSource(response);
      // @ts-ignore
      this.orderList.paginator = this.paginatorOrders;
    },(error: any) => {
      this.toastService.error(this.translateService.instant('ERRORS.ORDER_LIST'), this.translateService.instant('ERRORS.TITLE'));
    });
  }

  getStatusOrder(status: number): string {
    return status === 0 ? 'CREATED' : status === 1 ? 'DELIVERED' : 'CANCEL';
  }

  exportData(data: any): any {
    const csvString = [
      ['ID Orden', 'Fecha de creación', 'Fecha de recogida', 'Nº de productos seleccionados', 'Estado de la orden' ],
      ...data.map((item: any) => [
        item.orderId,
        item.orderDate,
        item.pickUpTime,
        item.products.length,
        this.getStatusOrder(item.status)
      ])
    ]
      .map(e => e.join(','))
      .join('\n');

    let blob = new Blob([csvString], {type: 'text/csv;charset=utf-8;'});

    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = 'Reporte.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
