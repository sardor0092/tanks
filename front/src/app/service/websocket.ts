import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { GameComponent } from '../game/game.component';
import { Shape } from '../models/shape';


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/position";
    stompClient: any;
    appComponent: GameComponent;
    constructor(appComponent: GameComponent){
        this.appComponent = appComponent;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        let shape = new Shape('id' + Math.floor(Math.random()*1000), 0,0,123,123);
        _this.stompClient.connect({},  (frame: any)=> {
                _this.stompClient.send("/app/game/join", {}, JSON.stringify(shape));
            _this.appComponent.start(shape);
            _this.stompClient.subscribe(_this.topic,  (sdkEvent:any) =>{
                console.log("keldi xabar");
                
                _this.onMessageReceived(sdkEvent);
            });
           
            console.log(_this.stompClient);
            
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error:any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/game", {}, JSON.stringify(message));
    }

    onMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + message);
        this.appComponent.handleMessage(message.body);
    }
}