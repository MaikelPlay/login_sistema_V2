/**
 * Realiza y procesa la petición asíncrona con estructura basada en FormData
 */
function autenticar() {
    // Construir los datos de la petición como un objeto JSON
    let datosPeticion = {
        "action": "login",
        "data": {
            "username": document.getElementById("txtUserName").value,
            "password": document.getElementById("txtPassword").value
        }
    };

    // Convertir el objeto JSON a una cadena de texto
    let datosJSON = JSON.stringify(datosPeticion);

    // Preparar los datos a enviar en un objeto FormData
    let datosFormData = new FormData();
    datosFormData.append('peticion', datosJSON);

    // Generar el URL al que vamos a realizar la solicitud
    let url = "login.php";

    fetch(url, {
        method: 'POST',
        body: datosFormData // Enviar los datos FormData
    })
    .then(function (response) {
        return response.json(); // Convertir el cuerpo de la respuesta a JSON
    })
    .then(function (respuesta) {
        if (respuesta.success === false) {
            // Manejar credenciales incorrectas
            alert(respuesta.data.message || "Credenciales incorrectas");
            
        } else if (respuesta.success === true) {
            // Manejar credenciales correctas
            document.getElementById("login").classList.add("oculto");
            document.getElementById("logged").classList.remove("oculto");

            document.getElementById("avatar").innerHTML = 
                `<img src="data:image/png;base64,${respuesta.data.avatar}" alt="Avatar">`;
            document.getElementById("nombre").textContent = 
                `${respuesta.data.name} ${respuesta.data.lastname}`;

            let mensajesDiv = document.getElementById("mensajes");
            mensajesDiv.innerHTML = `<h4>Tiene ${respuesta.messages.length} mensajes nuevos</h4>`;
            respuesta.messages.forEach((mensaje) => {
                let mensajeHTML = `
                    <hr>
                    <div class="message-box">
                        <h4>${mensaje.subject}</h4>
                        <p>${mensaje.date}</p>
                        <p>${mensaje.body}</p>
                    </div>`;
                mensajesDiv.innerHTML += mensajeHTML;
            });
        }
    })
    .catch(function (error) {
        console.error("Error de red o procesamiento:", error);
    });
}

/**
 * Función principal
 */
function main() {
    const boton = document.getElementById("btnLogin");
    boton.addEventListener("click", autenticar);
}

// Tras cargarse el DOM, llamar a main()
window.addEventListener("load", main);
