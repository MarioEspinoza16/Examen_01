const entrenadorList = document.getElementById("entrenadorList");

let db = null;

window.onload = function() {
    let request = indexedDB.open("PokedexDB", 1);

    request.onupgradeneeded = function(e) {
        db = e.target.result;
        db.createObjectStore("entrenadores", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = function(e) {
        db = e.target.result;
        insertarSiVacio();
    };
};

function insertarSiVacio() {
    let tx = db.transaction(["entrenadores"], "readwrite");
    let store = tx.objectStore("entrenadores");

    store.count().onsuccess = function(e) {
        if (e.target.result === 0) {
            const trainers = [
                { nombre: "Cristiano Ronaldo", sexo: "Masculino", residencia: "Madrid, España", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Portugal.jpg/800px-Cristiano_Ronaldo_playing_for_Portugal.jpg" },
                { nombre: "Lionel Messi", sexo: "Masculino", residencia: "Miami, Estados Unidos", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/800px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg" },
                { nombre: "Neymar Jr", sexo: "Masculino", residencia: "São Paulo, Brasil", foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Neymar_Jr._with_Brazil_2022.jpg/800px-Neymar_Jr._with_Brazil_2022.jpg" }
            ];
            trainers.forEach(t => store.add(t));
        }
        cargarEntrenadores();
    };
}

function cargarEntrenadores() {
    let tx = db.transaction(["entrenadores"], "readonly");
    tx.objectStore("entrenadores").getAll().onsuccess = function(e) {
        mostrar(e.target.result);
    };
}

function mostrar(lista) {
    entrenadorList.innerHTML = "";
    lista.forEach(ent => {
        let card = document.createElement("div");
        card.className = "col-lg-3 col-md-4 col-6";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${ent.foto}" class="card-img-top" style="height:180px;object-fit:cover">
                <div class="card-body text-center">
                    <h6>${ent.nombre}</h6>
                </div>
            </div>
        `;
        card.onclick = () => mostrarDetalle(ent);
        entrenadorList.appendChild(card);
    });
}

function mostrarDetalle(ent) {
    document.getElementById("entrenadorTitle").innerText = ent.nombre;
    document.getElementById("entrenadorImage").src = ent.foto;
    document.getElementById("entrenadorInfo").innerHTML = `
        Sexo: ${ent.sexo}<br>
        Residencia: ${ent.residencia}
    `;
    new bootstrap.Modal(document.getElementById("entrenadorModal")).show();
}