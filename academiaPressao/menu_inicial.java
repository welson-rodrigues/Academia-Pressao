package JAVARuntime;

// Importes do Java
import java.util.*;
import java.text.*;
import java.net.*;
import java.math.*;
import java.io.*;
import java.nio.*;

/**
 * Welson - Zee
*/
public class menuinicial extends Component { 

public WorldFile mundo;
public SUIButton button;

    @Override
    public void start() {
        
    }

    @Override
    public void repeat() {
        if(button.isDown()){
           WorldController.loadWorldAsync(mundo);
        } 
    }
}
/// Com o Async a tela de menu carrega em tempo real, já sem ele o menu trava o jogo até ser carregado totalmente.