import { Game } from "./game";
import { User } from "./user";

export class Move {
    id:number;
    boardRow:number;
    boardColumn:number;
    created:Date;
    game:Game;
    player:User;
}
