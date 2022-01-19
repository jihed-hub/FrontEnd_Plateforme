import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { Cart } from 'src/app/entities/cart';
import { Product } from 'src/app/entities/product';
import { StoreService } from 'src/app/_services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products: Product[] = [];
  cartDialog: Boolean;
  cartlist: Cart[];
  totalSum: number = 0;
  constructor(private storeService:StoreService,private router:Router,private http:HttpClient) { }

// We load  Stripe
stripePromise = loadStripe(environment.stripe);
private url = 'http://localhost:8003/api';

  ngOnInit(): void {
    this.storeService.getProducts().subscribe(
      res=>{
        this.products=res.productList;
      });

      this.storeService.getCartItems().subscribe(res => {
        this.cartlist = res.carts;
        console.log(this.cartlist);
        this.cartlist.forEach(value => {
          this.totalSum = this.totalSum + (value.quantity * value.price);
        });
      });

  }
  addToCart(e){
    this.storeService.addCartItems(e).subscribe(
      res=>{
        console.log(res);
        alert("added succefully");
      });
  } 
  opencart(){
    this.cartDialog=true;
  } 
  update(id, quantity) {
    this.storeService.updateCart(id.value, quantity.value).subscribe(res => {
      this.cartlist = res.carts;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
        alert("Cart Updated Succefully.");
      });
    });
  }
  delete(id) {
    this.storeService.delCart(id.value).subscribe(res => {
      this.cartlist = res.carts;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);
      });
      alert("Your cart have been deleted");
    });
  }
  place() { 
    this.storeService.place().subscribe(res => {
      console.log(res); 
    });
    alert("Your order have been placed");
    this.router.navigate(["/Plateforme-Educative/client/checkout"]);
  }



}
