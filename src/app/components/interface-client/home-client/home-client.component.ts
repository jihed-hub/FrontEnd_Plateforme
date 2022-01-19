import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/_services/game.service';
import { Game } from 'src/app/entities/game';
import { FormGroup, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { TransfertService } from 'src/app/_services/transfert.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UploadfilesService } from 'src/app/_services/uploadfiles.service';
import { DBFile } from 'src/app/entities/dbfile';
import { Product } from 'src/app/entities/product';
import { StoreService } from 'src/app/_services/store.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
}) 
export class HomeClientComponent implements OnInit {
  message:number;

  constructor(private transfereService:TransfertService,private uploadService: UploadfilesService,
    private storeService:StoreService,private router:Router,private tokenStorageService:TokenStorageService){}

    position : number ;
    dbFiles : DBFile[] = []; 
    products: Product[] = [];


  ngOnInit(): void { 
    this.transfereService.currentMessage.subscribe(message => this.message = message)
    console.log("espace"+this.message);
    if (this.router.url.indexOf('/Plateforme-Educative/client/store') > -1) {
        this.position=1;
    }
    else if (this.router.url.indexOf('/Plateforme-Educative/client/files') > -1){
        this.position=2;
    }
    else if (this.router.url.indexOf('/Plateforme-Educative/client/home/games') > -1){
    this.position=3;
    }
    else if(this.router.url.indexOf('/Plateforme-Educative/home')>-1){
        this.position=4;
    }

    this.uploadService.getFileswithlimitof4rows().subscribe(
      results=> {
        this.dbFiles=results;
        console.log(results);
      } 
    );
    this.storeService.getProducts().subscribe(
      res=>{
        this.products=res.productList;
        console.log(res);
      }
    );
  }

  public goToStore(){
    this.position=1;
  }
  public goToFiles(){
    this.position=2;
  }
  public goToGames(){
    this.position=3;
  }
 
  public goToFilesFromHome(){
    this.router.navigate(["/Plateforme-Educative/client/files"]);
  }
  public goToStoreFromHome(){
    this.router.navigate(["/Plateforme-Educative/client/store"]);
  }
  addToCart(e){
    this.storeService.addCartItems(e).subscribe(
      res=>{
        console.log(res);
        alert("added succefully");
      });
  } 
 
  downloadFile(fileData: DBFile ): void { 
    this.uploadService 
      .download(fileData.id)
      .subscribe(blob => saveAs(blob, fileData.id));
  }
  
}
