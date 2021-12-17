
export class Game{
  functions: any[] = [];
 constructor(){}
 addAnimation(f: Function){
     this.functions.push(f);
   }
}