// database.js
// Base de datos simulada usando localStorage

const DB_KEY_POKEMON = "pokedex";
const DB_KEY_ENTRENADORES = "entrenadores";

// ----------------------
// POKÉDEX
// ----------------------

function getPokemon() {
    return JSON.parse(localStorage.getItem(DB_KEY_POKEMON)) || [];
}

function savePokemon(lista) {
    localStorage.setItem(DB_KEY_POKEMON, JSON.stringify(lista));
}

function addPokemon(pokemon) {
    let lista = getPokemon();
    lista.push(pokemon);
    savePokemon(lista);
}

// ----------------------
// ENTRENADORES
// ----------------------

function getEntrenadores() {
    return JSON.parse(localStorage.getItem(DB_KEY_ENTRENADORES)) || [];
}

function saveEntrenadores(lista) {
    localStorage.setItem(DB_KEY_ENTRENADORES, JSON.stringify(lista));
}

function addEntrenador(entrenador) {
    let lista = getEntrenadores();
    lista.push(entrenador);
    saveEntrenadores(lista);
}

// 🔥 INICIALIZAR ENTRENADORES PREDEFINIDOS
function initEntrenadores() {
    let lista = getEntrenadores();

    if (lista.length === 0) {
        lista = [
            { nombre: "Cristiano Ronaldo", edad: 39, region: "Portugal" },
            { nombre: "Neymar Jr", edad: 32, region: "Brasil" },
            { nombre: "Lionel Messi", edad: 37, region: "Argentina" }
        ];

        saveEntrenadores(lista);
    }
}

// ----------------------
// UTILIDAD GENERAL
// ----------------------

function clearDB() {
    localStorage.removeItem(DB_KEY_POKEMON);
    localStorage.removeItem(DB_KEY_ENTRENADORES);
}