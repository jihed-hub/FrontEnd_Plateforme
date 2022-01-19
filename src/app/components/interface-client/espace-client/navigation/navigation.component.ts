import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router,private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
  }
  gotodashbord(){
    this.router.navigate(['Plateforme-Educative/client/espace-client/dashboard']);
  }
  
  // tslint:disable-next-line: typedef
  gotoprofil(){
  this.router.navigate(['Plateforme-Educative/client/espace-client/profil']);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/Plateforme-Educative/home']);
 }


}
