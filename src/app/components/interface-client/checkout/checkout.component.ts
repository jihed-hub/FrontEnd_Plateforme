import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 // We load  Stripe
 stripePromise = loadStripe(environment.stripe);
 private url = 'http://localhost:8003/api';
 constructor(private http:HttpClient) { }

  async pay(): Promise<void> {
     // here we create a payment object
     const payment = {
      name: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: 99900,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/Plateforme-Educative/client/cancel',
      successUrl: 'http://localhost:4200/Plateforme-Educative/client/success',
    };
    const stripe = await this.stripePromise;
       // this is a normal http calls for a backend api
       this.http
       .post(`${this.url}/payment`, payment)
       .subscribe((data: any) => {
         // I use stripe to redirect To Checkout page of Stripe platform
         stripe.redirectToCheckout({
           sessionId: data.id,
         });
       });
 
  }
  ngOnInit(): void {
  }
 

}
