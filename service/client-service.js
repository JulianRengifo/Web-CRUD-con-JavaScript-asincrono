
const crearNuevaLinea = (nombre, email) => {
    
    //Bueno, en este caso yo lo que quiero es generar el tr, el puro tr. Lo voy a crear, ya puedo eliminarlo 
    const linea = document.createElement("tr")
    //Lo que necesitamos es poder combinar código HTML con JavaScript, y eso lo vamos a lograr con los backticks, es decir estas comillas al revés
    const contenido = `
            <td class="td" data-td>
            ${nombre}
            </td>
            <td> ${email} </td>
            <td>
              <ul class="table__button-control">
                <li>
                  <a
                    href="../screens/editar_cliente.html"
                    class="simple-button simple-button--edit"
                    >Editar</a
                  >
                </li>
                <li>
                  <button
                    class="simple-button simple-button--delete"
                    type="button"
                  >
                    Eliminar
                  </button>
                </li>
              </ul>
            </td>
          `;

            linea.innerHTML = contenido;
            return linea
};

//La informacion anterior se guardara en data-table
//Entonces lo que va a hacer esto es recorrer todo el árbol del DOM y obtener este elemento de aquí.
const table = document.querySelector("[data-table]")

/* crear una nueva comunicación entre el front end y el back end. Esto lo vamos a lograr con una clase que ya viene nativa en el navegador
, que se llama XMLHttpRequest. */
const http = new XMLHttpRequest (); 

// CRUD :   -----   Metodos HTTP
// Create   -----   POST
// Read     -----   GET
// Update   -----   PUT / PATCH
// Delete   -----   DELETE


//es un método que va a recibir dos parámetros. El primero que va a recibir es el método, y el segundo la URL o en dénde es que queremos que nosotros realice la acción http.
http.open ("GET", "http://localhost:3000/perfil");

// http.send que se va a encargar de enviar la petición. Entonces desde nuestro navegador o desde nuestro proyecto está saliendo hacia el servidor, que se encuentra en esta URL.
http.send();

//http.onload. Entonces lo que significa esto es que, una vez que cargues o que termines de recibir una respuesta, vas a ejecutar esta función. 
http.onload = () => {
    /* JSON, recuerdan, está todo en mayúscula, punto parse, ¿y qué va a recibir? Nuestro http.response. Entonces lo que va a hacer es: recibes esto de aquí, 
    ya vimos que es un texto. Ahora lo que va a hacer es dentro de la clase JSON hay un método que es parse, que justamente lo que nos va a ayudar es a transformarlo
    con esto los datos ya se ingresan en el table.*/
    const data = JSON.parse(http.response);
    // tenemos data, que es un arreglo, y los arreglos, como sabes, tienen métodos. El que nosotros vamos a utilizar es .forEach.
    data.forEach(perfil => {
        //Y lo que quiero entonces es: créame entonces aquí una nueva línea, despues de crearlo lo agregamos
        const nuevaLinea = crearNuevaLinea(perfil.nombre, perfil.email);
        // Para agregarlo usamos es table.appendChild(nuevaLinea).
        table.appendChild(nuevaLinea);
    });


    /* Y ahora, lo que tenemos que ver es la parte de anidación, por así decirlo. Imagina que nosotros queremos que se cargue esta información, 
    hacer una nueva petición, por ejemplo a los perfiles que se hayan creado en el día de hoy. */
    const http2 = new XMLHttpRequest()
    http2.open("GET", "http://localhost:3000/perfil/hoy")
    http2.send();
    http2.onload = () => {
        const data2 = JSON.parse(http2.response)
    }
};

console.log(http);
