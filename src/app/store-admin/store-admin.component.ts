import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../entities/product';
import { StoreService } from '../_services/store.service';
import { MessageService, ConfirmationService } from 'primeng/api';
 
@Component({
  selector: 'app-store-admin',
  templateUrl: './store-admin.component.html',
  styleUrls: ['./store-admin.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class StoreAdminComponent implements OnInit {
  products: Product[] = [];
  fileToUpload: File = null;
  showAdd = false;
  showAdd1 = false;
  bookDetailsDialog: boolean;
  bookEditDialog: boolean;
  orderviewDialog: boolean;
  p:Product;
  orderlist: any[] = [];
  
  constructor(private router:Router,private storeService:StoreService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }
  imageUrl: string = "/assets/img/noimage.png";

  ngOnInit(): void {
    this.storeService.getProduct().subscribe(
      res =>{
        this.products = res.productList;
        console.log(this.products);
    });
    this.getOrderList();
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  show() {
    this.showAdd = true;
  }
  hide() {
    this.showAdd = false;
  }
  show1() {
    this.showAdd1 = true;
  }
  hide1() {
    this.showAdd1 = false;
  }
  addProd(desc, quan, price, prodname, image) {
    this.storeService.addProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload).subscribe(
      res => {
        this.products = res.productList;
        alert("Product added succefully.");
    });
  }
  delProd(prodid){
        this.storeService.delProduct(prodid.value).subscribe(
          res=>{
            this.products=res.productList;
            alert("supprimée");
          });
  }
  updateProd(desc, quan, price, prodname, image){
    this.storeService.updateProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload, this.p.productid)
    .subscribe(res => {
      alert("Product Updated Succefully.");
    });
  }


  bookDetail(product:Product){
    this.p=product;
    this.bookDetailsDialog=true;
  }
  bookEdit(product:Product){
    this.p=product;
    this.bookEditDialog=true;
  }
  vieworder(){
    this.orderviewDialog=true;
  }
  getOrderList() {
    this.storeService.getOrders().subscribe(res => {
      this.orderlist = res.orderlist;
    });
  }
  approve(orderid) {
    let order = {
      "orderId": orderid,
      "orderStatus": "Approved"
    }
    this.storeService.update(order).subscribe(res => {
      this.getOrderList();
      alert("Approved");
    });
  }
  decline(orderid) {
    let order = {
      "orderId": orderid,
      "orderStatus": "Declined"
    }
    this.storeService.update(order).subscribe(res => {
      this.getOrderList();
      alert("declined");
    });
  }


}
