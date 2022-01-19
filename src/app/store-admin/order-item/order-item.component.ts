import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/_services/store.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  orderlist: any[] = [];

  constructor(private route: Router, private api: StoreService) { }

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList() {
    this.api.getOrders().subscribe(res => {
      this.orderlist = res.orderlist;
    });
  }
  approve(orderid) {
    let order = {
      "orderId": orderid,
      "orderStatus": "Approved"
    }
    this.api.update(order).subscribe(res => {
      this.getOrderList();
      alert("Approved");
    });
  }
  decline(orderid) {
    let order = {
      "orderId": orderid,
      "orderStatus": "Declined"
    }
    this.api.update(order).subscribe(res => {
      this.getOrderList();
      alert("declined");
    });
  }

}
