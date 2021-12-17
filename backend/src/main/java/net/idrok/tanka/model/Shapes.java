package net.idrok.tanka.model;

import java.util.ArrayList;
import java.util.List;

public class Shapes {
    public static List<Shape> shapes = new ArrayList<>();

    public static  void addShape(Shape shape){
        shapes.add(shape);
    }
}
