document.addEventListener("DOMContentLoaded", function () {

    let lista = JSON.parse(localStorage.getItem("entrenadores")) || [];

    // Asegurar que los 3 famosos siempre estén presentes
    const famosos = [
        { nombre: "Cristiano Ronaldo", edad: 39, region: "Portugal" },
        { nombre: "Lionel Messi", edad: 37, region: "Argentina" },
        { nombre: "Neymar Jr", edad: 32, region: "Brasil" }
    ];

    famosos.forEach(famoso => {
        if (!lista.some(e => e.nombre === famoso.nombre)) {
            lista.push(famoso);
        }
    });

    localStorage.setItem("entrenadores", JSON.stringify(lista));

    // Mostrar todos
    const contenedor = document.getElementById("listaEntrenadores");
    contenedor.innerHTML = "";

    lista.forEach(ent => {
        const div = document.createElement("div");
        div.style = "border: 2px solid #ffcb05; background: #f8f8f8; padding: 15px; margin: 10px; border-radius: 10px; max-width: 400px;";
        div.innerHTML = `
            <h3>👤 ${ent.nombre}</h3>
            <p><strong>Edad:</strong> ${ent.edad} años</p>
            <p><strong>Región:</strong> ${ent.region}</p>
        `;
        contenedor.appendChild(div);
    });
});