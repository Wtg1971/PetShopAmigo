//Permite cargar en la página los datos que se agregan desde el formulario

function subirDatos() {
    let mascotas = [];
        if (localStorage.length > 0) {
            mascotas = JSON.parse(localStorage.getItem("mascotas"));
        }
    cargarCat(mascotas);
}


function iniciarCat(datos) {
    localStorage.setItem("mascotas", JSON.stringify(datos));
    subirDatos();
}

//Crea los elementos para insertar las mascotas

function crearElementoBoton(tipo, contenido, principal, texto, clases) {
    var elemento = document.createElement(tipo);
    elemento.innerHTML = contenido;
    elemento.className = clases;
    elemento.type = "button";
    elemento.setAttribute("del_Codigo", texto);
    principal.appendChild(elemento);
}

function crearElementoHijo(tipo, contenido, principal, clases, extra) {
    var elemento = document.createElement(tipo);
    elemento.className = clases;
    elemento.innerHTML = extra + contenido;
    principal.appendChild(elemento);
}

function crearElementoImagen(tipo, img, principal, clases) {
    var elemento = document.createElement(tipo);
    elemento.className = clases;
    elemento.setAttribute("src", `img/mascotas/${img}.jpg`);
    principal.appendChild(elemento);
}

function crearElementoPrincipal(tipo, principal, clases) {
    var elemento = document.createElement(tipo);
    elemento.className = clases;
    principal.appendChild(elemento);
    return elemento;
}

function EliminaMascota(codigo) {
    let mascotas = [];
    if (localStorage.length > 0) {
        //extraer las mascotas guardados
        mascotas = JSON.parse(localStorage.getItem("mascotas"));
    }

    mascotas = FiltrarMascotaEliminar(mascotas, codigo);
    localStorage.removeItem(mascotas);
    localStorage.setItem("mascotas", JSON.stringify(mascotas));
    msnMensaje("Se elimino exitosamente!!!", "success")
    subirDatos();
}

function FiltrarMascotaEliminar(datos, codigo) {
    let aux = [];
    aux = datos.filter(e => {
        return e.codigo != codigo; //buqueda por codigo

    });
    return aux;
}

function msnMensaje(texto, icono) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icono,
        title: texto
    })

}

