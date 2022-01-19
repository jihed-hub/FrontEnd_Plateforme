import { User } from './user';

export class Game {
    id:number;
    secondPlayer:User;
    firstPlayer:User;
    player:User;
    firstPlayerPieceCode:string;
    gameType:string;
    gameStatus:string;
    created:Date;
}
