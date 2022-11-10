import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList: any[];
  panelOpenState: boolean;

  constructor(private orderService: OrderService) {
    this.panelOpenState = false;
    this.orderList = [
      { id: 1,
        orderDate: '2022-11-07',
        pickUpTime: '2022-11-07 18:00',
        status: 0,
        products: [
          { id: 1, name: 'Pan', quantity: 10, amount: 1000 }
        ]
      },
      { id: 2,
        orderDate: '2022-11-06',
        pickUpTime: '2022-11-06 15:30',
        status: 1,
        products: [
          { id: 1, name: 'Gaseosa', quantity: 10 },
          { id: 1, name: 'Papas', quantity: 10 }
        ]
      },
      { id: 3,
        orderDate: '2022-11-05',
        pickUpTime: '2022-11-05 19:00',
        status: 0,
        products: [
          { id: 1, name: 'Gatorade', quantity: 10 }
        ]
      },
      { id: 4,
        orderDate: '2022-11-04',
        pickUpTime: '2022-11-04 21:45',
        status: 2,
        products: [
          { id: 1, name: 'Cafe', quantity: 10 }
        ]
      }
    ];
  }

  ngOnInit(): void {

  }

  getStatusOrder(status: number): string {
    return status === 0 ? 'CREATED' : status === 1 ? 'DELIVERED' : 'CANCEL';
  }
}
