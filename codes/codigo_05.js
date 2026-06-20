javascript
/*jshint sub:true*/

// Declaración de variables locales
// relacionadas con interface html
var cmbGeneracion = document.getElementById("cmbGeneracion");
var resultados = document.getElementById("Datos");

// Variable utilizada para construir la salida
var salida = "";

// Declara las variables para conectarse con servidor remoto
// que contiene el web service
//--------------------------------------------------------------
var remoto = new XMLHttpRequest();
var url = "https://pokeapi.co/api/v2/pokemon";

// Programación de evento para cambio de generación
cmbGeneracion.addEventListener("change", function () {

    var datos = cmbGeneracion.value.split(",");

    cargarPokemon(datos[0], datos[1]);

});

// Carga inicial de la primera generación
cargarPokemon(0, 151);

// Función encargada de obtener los Pokémon
function cargarPokemon(offset, limit) {

    // Determina la función HTTPRequest entre sitio local y el remoto
    remoto.open("GET", url + "?offset=" + offset + "&limit=" + limit, true);

    remoto.onreadystatechange = function () {

        if (remoto.readyState == 4) {

            if (remoto.status == 200) {

                salida = "";

                var resul = JSON.parse(remoto.responseText);

                for (var i = 0; i < resul.results.length; i++) {

                    var pokemon = resul.results[i];

                    // Obtiene el número del Pokémon a partir de la URL
                    var partes = pokemon.url.split("/");

                    var numero = partes[6];

                    numero = numero.padStart(3, "0");

                    salida = salida.concat(
                        '<div class="pokemon">' +
                            '<img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/' + numero + '.png">' +
                            '<br>' +
                            pokemon.name +
                        '</div>'
                    );
                }

                resultados.innerHTML = salida;

            } else {

                resultados.innerHTML = remoto.responseText;

            } // fin del if status

        } // fin del if readyState

    }; // fin de la función interna

    remoto.send();

}

