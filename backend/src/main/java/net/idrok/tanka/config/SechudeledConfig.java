package net.idrok.tanka.config;

import net.idrok.tanka.model.Shapes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class SechudeledConfig {

        @Autowired
        private SimpMessageSendingOperations messagingTemplate;


        @Scheduled(fixedRate = 5000)
        public void refresh() {
            System.out.println(Shapes.shapes.size());
            messagingTemplate.convertAndSend("/topic/position", Shapes.shapes);
        }

    }

