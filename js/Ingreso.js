// Se crea la clase Ingreso que es hija de Dato o una extensión de Dato
class Ingresos extends Dato{
    static contadorIngreso = 0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++ Ingresos.contadorIngreso;
    }
    get id(){
        return this._id;
    }
}