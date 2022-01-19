import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Game } from 'src/app/entities/game';
import { User } from 'src/app/entities/user';
import { GameService } from 'src/app/_services/game.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game=new Game();
  gamee:Game; 
  form: FormGroup;
  gamesToJoin : Game[]=[];
  playerGames : Game[]=[];
  user=new User();
  aaa:string; 

  newGameOptions = {
    availablePieces: [
        {name: 'X'},
        {name: 'O'}
    ],
    selectedPiece: {name: 'O'},
    availableGameTypes: [
        {name: 'COMPETITION'},
        {name: 'COMPUTER'}
    ],
    selectedBoardDimension: {name: 'COMPUTER'}
  };

  constructor(private tokenStorageService: TokenStorageService,private gameService:GameService,private router:Router) { }

  ngOnInit(): void {
    this.gameService.getGamesToJoin().subscribe(
      data =>{
      this.gamesToJoin=data;
      console.log(data);
    });
    this.gameService.getPlayerGames().subscribe(
      data =>{
        this.playerGames=data;
        console.log(data);
    });
  }  
  createGame(){
    this.gameService.creategame(this.game).subscribe(res=>{
      this.tokenStorageService.saveGame(res);
      console.log(res);
    });
  }
  joinGame(id:number){
    this.gameService.join(id).subscribe(resultat=>{
      this.tokenStorageService.saveGame(resultat);
      console.log(resultat);
    });
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": id
      }
    };
    this.router.navigate(["Plateforme-Educative/client/gameboard"], navigationExtras);
  }
  loadGame(id:number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": id
      }
    };
    this.router.navigate(["Plateforme-Educative/client/gameboard"], navigationExtras);
  }
  
}
