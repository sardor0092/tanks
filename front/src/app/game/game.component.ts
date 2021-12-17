import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Shape } from '../models/shape';
import { WebSocketAPI } from '../service/websocket';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
  
  
  handleMessage(shapes: any) {
     
     this.shapes = JSON.parse(shapes);
     
  }

  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D | undefined | null;
  shapes!: Shape[];
  socket!: WebSocketAPI;

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.context = this.canvas.nativeElement.getContext('2d');
    setInterval(()=> this.draw(), 100);
   this.socket = new WebSocketAPI(this);
   this.socket._connect();
 
  }

  start(shape: Shape){
 
    document.addEventListener('keydown', (ev)=>{
      console.log(ev.keyCode);
      
      switch(ev.keyCode){
        case 38: {
          shape.y -= 2;
          
        } break;
        case 39: shape.x += 2; break;
        case 37: shape.x -= 2; break;
        case 40: shape.y += 2; break;
      }
      this.socket._send(shape);
      
    })


  }

  draw(){
    
    this.context?.clearRect(0,0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
   
    
    for(let i = 0; i<this.shapes.length; i++){
     let sh = this.shapes[i];
     console.log(sh);
     
      this.context?.fillRect(sh.x, sh.y, sh.width, sh.height);
    }

  }



}
