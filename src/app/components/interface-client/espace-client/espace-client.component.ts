import { Component, OnInit } from '@angular/core';
import { TransfertService } from 'src/app/_services/transfert.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
}) 
export class EspaceClientComponent implements OnInit {
  message:number;

  constructor(private transfereService:TransfertService,
    private router:Router,private tokenStorageService:TokenStorageService) { }
    position : number ;
  ngOnInit(): void {
    this.transfereService.currentMessage.subscribe(message => this.message = message)

    console.log("espace"+this.message);
    if (this.router.url.indexOf('/Plateforme-Educative/client/espace-client/dashboard') > -1) {
        this.position=1;
    }
    else if (this.router.url.indexOf('/Plateforme-Educative/client/espace-client/profil') > -1){
        this.position=3;
   }
    else if(this.router.url.indexOf('/Plateforme-Educative/home')>-1){
        this.position=2;
    }
  }
  public gotoprofil(){
    this.position=3;

  }

  gotodashboard(){
    this.position=1;
  }

  logout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['/Plateforme-Educative/home']);
    this.position=2;
    
  }
  

}
