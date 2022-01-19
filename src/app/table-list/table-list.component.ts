import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { MessageService } from 'primeng/api';
import { Client } from '../entities/client';
import { Table } from 'primeng/table';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [MessageService]
})
export class TableListComponent implements OnInit {

  constructor(private adminservice: AdminService,private messageService: MessageService) { }
  clientDialog: boolean;
  cltt: Client;
  @ViewChild('dt') table: Table;
  loading: boolean = true;
  userclient: Client[]= null;
  checked: boolean = false;
  formErrors = {};
  validationMessages = {};
  form: FormGroup;
  isSuccessful = false;

  ngOnInit(): void {
    this.adminservice.getClientt()
    .subscribe((data) => {this.userclient = data, console.log(data), this.loading = false;
    }, error => console.log(error));
  }
  activateclient(idclt: number){
    this.adminservice.activateuserclient(idclt).subscribe(data => { this.userclient = data ,
      console.log(data);
    });
    this.clientDialog = false;
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Client ajouté '});

  }
  refuseclient(idclt: number){
    this.adminservice.removeuserclient(idclt).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }
  profilclient(client: Client){
    this.cltt = client ;
   this.clientDialog = true;
  
  }
  hidecltDialog() {
    this.clientDialog = false;
  }
  

}
