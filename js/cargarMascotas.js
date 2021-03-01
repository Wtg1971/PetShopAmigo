if (localStorage.length > 0) {
subirDatos();
}

function cargarCat(datos) {
    let mascota = "";
    let encabezado = "";
    document.querySelector("#lsProductos").innerHTML = "";
    if (datos.length>0) {
        datos.forEach(e => {
            let cuadro = crearElementoPrincipal("div", document.querySelector("#lsProductos"), "card p-1");
            mascota = crearElementoPrincipal("div", cuadro, "card-body");
            encabezado = crearElementoPrincipal("div", mascota, "alert alert-primary");
            crearElementoHijo("p", e.tipo, encabezado, "card-title", "");
            crearElementoHijo("p", e.imagen, mascota, "align-self-center", "");
            crearElementoHijo("p", e.raza, mascota, "card-text", "Raza: ");
            crearElementoHijo("p", e.precio, mascota, "card-text", "Precio: ₡");
            crearElementoHijo("p", e.informacion, mascota, "card-text", "Descripcion: ");
            crearElementoBoton("button", "Eliminar", mascota, e.codigo, "btn btnBorrar align-bottom");
        });
    }
}

// verifica si los datos cumplen con los requerimientos y agrega al localStore
document.querySelector("#btnAgregar").onclick =() => {
    let codigo = document.querySelector("#codigo").value;
    let tipo = document.querySelector("#tipo").value;
    let informacion = document.querySelector("#informacion").value;
    let raza = document.querySelector("#raza").value;
    let precio = document.querySelector("#precio").value;
    //Crea un arreglo de imagenes
    let imagenes = [];
    imagenes = document.getElementById("imagen").files;
    //toma la imagen y la convierte a un string para guardarla en el localStore
    if (imagenes.length > 0) {

        if (precio.length <= 2 | codigo.length < 1 || tipo.length < 2 || raza.length < 4 || informacion.length < 5) {
            msnMensaje("Datos incompletos", "info");
            return;
        }
        let fileToLoad = imagenes[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result;
            let newImage = document.createElement('img');
            newImage.src = srcData;
            let imagen = newImage.outerHTML;
            let mascotas = [];
            //agrega la nueva mascota
            if (localStorage.length > 0) {
                //Carga lo que esta en la localStorage y agrega las nuevas mascotas
                //Para cuando ya existe el array mascotas en la localStorage
                mascotas = JSON.parse(localStorage.getItem("mascotas"));
                mascotas.push({
                    "raza": raza,
                    "tipo": tipo,
                    "codigo": codigo,
                    "imagen": imagen,
                    "precio": precio,
                    "informacion": informacion
                });
            }
            else {
                //Ingresa la primera mascota
                //El array no existe en la localStorage
                mascotas =
                    [{
                        raza: raza,
                        tipo: tipo,
                        codigo:codigo,
                        imagen:imagen,
                        precio: precio,
                        informacion: informacion
                    }]
            }
            
            console.log("Paso 3");
                       
            console.log(mascotas);
            //guardo las mascotas actualizadas
            localStorage.setItem("mascotas", JSON.stringify(mascotas));
            console.log(localStorage.getItem("mascotas"))
            //alera de mensaje guardado
            msnMensaje("Nueva mascota agregada", "success");
            subirDatos();
        }
        fileReader.readAsDataURL(fileToLoad);
        limpiarFormulario();
    } else { msnMensaje("No ha seleccionado la imagen", "info"); }
}

document.querySelector("#lsProductos").addEventListener("click", (e) => {
   if (e.target.tagName.toLowerCase() == "button") {
        e.target.parentElement.remove(e.target)
        EliminaMascota(e.target.getAttribute("del_codigo"));
    }
})

// Limpia los campos despues de una inserccion
function limpiarFormulario() {
    document.querySelector("#raza").value = "";
    document.querySelector("#informacion").value = "";
    document.querySelector("#tipo").value = "Perro";
    document.querySelector("#precio").value = "";
    document.getElementById("imagen").value = "";
    document.getElementById("codigo").value = "";
}

