// Función para cargar el cabecero

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    // Aquí más adelante deberos de crear con el innerHTML los elementos para cargar la primeros datos 
    // generados desde app.js
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto); // Este es el ejemplo
    porcentaje = porcentajeEgreso
    ingreso = totalIngresos()
    egreso = totalEgresos()
    document.getElementById("ingreso").innerHTML = formatoMoneda(ingreso);
    document.getElementById("egreso").innerHTML = formatoMoneda(egreso);
    document.getElementById("pe").innerHTML = formatoPorcentaje(porcentaje);

}

const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-MX", { style: "percent", minimumFractionDigits: 2 });
}

// Funciones para totalIngresos y totalEgresos

let totalIngresos = () => {
    let totalIngresos = 0;
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

// Se crean 2 arreglos pre-cargados de infrmación para inicializar la aplicación

const ingresos = [
    new Ingresos("Sueldo", 10000)
];

const egresos = [
    new Egresos("Vacaciones", 5000)
];

// Funciones para Ingresos, ser tendrá que haceralgo similiar para los Egresos

// Función para crearIngresos

const cargarIngresos = () => {
    let ingresosHTML = "";
    for (ingreso of ingresos) {
        ingresosHTML += crearIngresos(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

const crearIngresos = (ingreso) => {
    let ingresosTemplete = `
                <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name=close-circle-outline onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `
    return ingresosTemplete;
}

const eliminarIngreso = (id) => {
    let ingresoEliminar = ingresos.findIndex(ingresos => ingreso.id === id);
    ingresos.splice(ingresoEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

// Funciones para Egresos 
const cargarEgresos = () => {
    let egresosHTML = "";
    for (egreso of egresos) {
        egresosHTML += crearEgresos(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresos = (egreso) => {
    let porcentajeEgreso = egreso.valor / totalIngresos();
    let egresosTemplete = `
        <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name=close-circle-outline onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `
    return egresosTemplete;
}

const eliminarEgreso = (id) => {
    let egresoEliminar = egresos.findIndex(egresos => egreso.id === id);
    egresos.splice(egresoEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}




// Función para cargar la aplicación

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

// Función para poder agregar datos a nuestro contenedor esta función es la que va a permitir
// definir el tipo de dato que se esta creando si es un Ingreso o un Egreso construye los objetos correspondientes

const agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if (descripcion.value !== "" && valor.value !== "") {
        if (tipo.value === "ingreso") {
            ingresos.push(new Ingresos(descripcion.value, +valor.value)); // Forma corta para agregar un nuevo elemento al arreglo
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === "egreso") {
            let newEgreso = new Egresos(descripcion.value, +valor.value);
            egresos.push(newEgreso);
            cargarCabecero();
            cargarEgresos();
        }
    } else {
        alert("Debes llenar todos los campos, falta un dato");
    }
}


