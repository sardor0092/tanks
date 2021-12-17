package net.idrok.tanka.contoller;

import net.idrok.tanka.model.Shape;
import net.idrok.tanka.model.Shapes;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class WebSocket {

    @MessageMapping("/game")
    @SendTo("/topic/position")
    public List<Shape> greeting(@Payload Shape shape) {
        System.out.println("KKK: " + shape.getId());
        for(Shape s: Shapes.shapes){
            if(s.getId().equals(shape.getId())){
                s.setX(shape.getX());
                s.setY(shape.getY());
                s.setWidth(shape.getWidth());
                s.setHeight(shape.getHeight());
                break;
            }
        }
        return Shapes.shapes;
    }


    @MessageMapping("/game/join")
    @SendTo("/topic/position")
    public List<Shape> addShape(@Payload Shape  shape, SimpMessageHeaderAccessor headerAccessor) {

        headerAccessor.getSessionAttributes().put("id", shape.getId());
        Shapes.addShape(shape);
        return Shapes.shapes;
    }
}