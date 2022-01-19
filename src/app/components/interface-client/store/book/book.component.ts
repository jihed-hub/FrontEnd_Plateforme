import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/entities/product';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() public product;
  @Output() productAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }
  addToCart() {
    this.productAddToCart.emit(this.product);
  }

}
