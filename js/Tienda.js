subirDatos();
//Carga datos a Tienda
function cargarCat(datos) {
    let mascota = "";
    let encabezado = "";
    document.querySelector("#lsProductos").innerHTML = "";
    if (datos.length > 0) {
        datos.forEach(e => {
            let cuadro = crearElementoPrincipal("div", document.querySelector("#lsProductos"), "card p-1");
            mascota = crearElementoPrincipal("div", cuadro, "card-body");
            encabezado = crearElementoPrincipal("div", mascota, "alert alert-primary");
            crearElementoHijo("p", e.tipo, encabezado, "card-title", "");
            crearElementoHijo("p", e.imagen, mascota, "align-self-center", "");
            crearElementoHijo("p", e.raza, mascota, "card-text", "Raza: ");
            crearElementoHijo("p", e.precio, mascota, "card-text", "Precio: ₡");
            crearElementoHijo("p", e.informacion, mascota, "card-text", "Descripcion: ");
            crearElementoBoton("button", "Comprar ahora", mascota, e.codigo, "btn bg-warning agregarCarrito");
        });
    }
}

