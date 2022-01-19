import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Game } from 'src/app/entities/game';
import { Move } from 'src/app/entities/move';
import { GameService } from 'src/app/_services/game.service';
import { MoveService } from 'src/app/_services/move.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  game: Game = {
    id: 0,
    secondPlayer: null,
    firstPlayer:null,
    player:null,
    firstPlayerPieceCode:'',
    gameType:'',
    gameStatus:'',
    created:null
  };
  gamePropreties:Game[]=[];
  movesInGame:Move[]=[];
  gameId:string;
  id:number;
  rows= [
    [
        {'id': '11', 'letter': '', 'class': 'box'},
        {'id': '12', 'letter': '', 'class': 'box'},
        {'id': '13', 'letter': '', 'class': 'box'}
    ],
    [
        {'id': '21', 'letter': '', 'class': 'box'},
        {'id': '22', 'letter': '', 'class': 'box'},
        {'id': '23', 'letter': '', 'class': 'box'}
    ],
    [
        {'id': '31', 'letter': '', 'class': 'box'},
        {'id': '32', 'letter': '', 'class': 'box'},
        {'id': '33', 'letter': '', 'class': 'box'}
    ]
];

  constructor(private tokenStorageService: TokenStorageService,private route: ActivatedRoute,private gameService: GameService,private moveService:MoveService) { 
    this.gameService.getInitialData().subscribe(res =>{
        res.gameList.forEach(gam => {
          if(gam.id==this.gameId){
            this.game=gam;
          }
        });
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.gameId=params["id"];
      console.log(this.gameId);
    });
    this.getMovesHistory(+this.gameId);
  }

  getMovesHistory(id:number){
    this.moveService.getMoveHistory(id).subscribe(res=>{
      this.movesInGame=res;
      console.log(res);
    });

  }

}
