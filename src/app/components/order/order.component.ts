import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() orderList: any[];
  panelOpenState: boolean;
  displayedColumns: string[];

  constructor(private orderService: OrderService,
              private activitedRoute: ActivatedRoute,
              private toastService: ToastrService,
              private translateService: TranslateService) {
    this.panelOpenState = false;
    this.orderList = [];
    this.displayedColumns = ['id', 'image', 'name', 'category', 'quantity', 'total_amount'];
  }

  ngOnInit(): void {
    this.getOrdersByUserId(Number(this.activitedRoute.snapshot.queryParams.u));
  }

  getStatusOrder(status: number): string {
    return status === 0 ? 'CREATED' : status === 1 ? 'DELIVERED' : 'CANCEL';
  }

  getOrdersByUserId(userId: number) {
    this.orderService.getOrdersByUser(userId).subscribe((response: any) => {
      this.orderList = response;
      this.orderList.forEach(item => {
        const total = item.products.map((item: any) => { return item.total_amount }).reduce((partialSum: any, a: any) => partialSum + a, 0);
        item.products.push({ total_amount: total });
        item.products = new MatTableDataSource(item.products);
      });
    },(error: any) => {
      this.toastService.error(this.translateService.instant('ERRORS.ORDER_LIST'), this.translateService.instant('ERRORS.TITLE'));
    });
  }
}
