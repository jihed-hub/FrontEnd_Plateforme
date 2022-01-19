import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../entities/product';
const ADMIN_API = 'http://localhost:8003/api/admin/';
const USER_API = 'http://localhost:8003/api/user/';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http:HttpClient) { }
  
  addProduct(desc: string, quan: string, price: string, prodname: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("quantity", quan);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("file", image);
    return this.http.post<any>(ADMIN_API +'addProduct' , formData);
    }
  getProduct(): Observable<any>{
    return this.http.get<any>(ADMIN_API + 'getProducts');
  }
  delProduct(prodid: number){
    return this.http.delete<any>(ADMIN_API +'delProduct'+"?productid=" + prodid);
  } 
  updateProduct(desc: string, quan: string, price: string, prodname: string, image: File, productid: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("productname", prodname);
    formData.append("quantity", quan);
    formData.append("file", image);
    formData.append("productid", productid);
    return this.http.put<any>(ADMIN_API +'updProduct'+'?productid=' + productid, formData);
  }


  getProducts(){
    return this.http.get<any>(USER_API + 'getProducts');
  }
  getProductswithlimitof5(){
    return this.http.get<any>(USER_API + 'productss');
  }
  addCartItems(product:Product){
    return this.http.get<any>(USER_API + 'addProductToCart'+"?productid=" + product.productid);
  }
  getCartItems(){
    return this.http.get<any>(USER_API + 'viewCart');
  }
  updateCart(cartid: number, quant: number){
    return this.http.get<any>(USER_API + 'updCart'+'?cartId=' + cartid + "&quantity=" + quant);
  }
  delCart(cartid: number){
    return this.http.delete<any>(USER_API + 'delCart'+"?cartId=" +cartid);
  }
  place(){ 
    return this.http.get<any>(USER_API + 'placeOrder');
  }
  update(order: any) {
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("orderStatus", order.orderStatus);
    return this.http.post<any>(ADMIN_API +'updOrder' , formData)
  } 
  getOrders() {
    return this.http.get<any>(ADMIN_API +'getOrders');
  }
}
