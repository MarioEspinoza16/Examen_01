document.addEventListener("DOMContentLoaded", function () {

    let equipos = JSON.parse(localStorage.getItem("equipos")) || [];

    // Si no hay equipos, crear ejemplos
    if (equipos.length === 0) {
        equipos = [
            {
                nombre: "Equipo Fuego",
                imagen: "https://picsum.photos/id/1015/300/200",
                entrenador: "Cristiano Ronaldo",
                pokemones: ["Charizard", "Blaziken", "Infernape"]
            },
            {
                nombre: "Equipo Agua",
                imagen: "https://picsum.photos/id/201/300/200",
                entrenador: "Neymar Jr",
                pokemones: ["Blastoise", "Gyarados", "Greninja"]
            }
        ];
        localStorage.setItem("equipos", JSON.stringify(equipos));
    }

    const contenedor = document.getElementById("listaEquipos");
    contenedor.innerHTML = "";

    if (equipos.length === 0) {
        contenedor.innerHTML = "<p class='text-center'>No hay equipos aún.</p>";
        return;
    }

    equipos.forEach(equipo => {
        const div = document.createElement("div");
        div.className = "col-lg-4 col-md-6";
        div.innerHTML = `
            <div class="card h-100">
                <img src="${equipo.imagen}" class="card-img-top" style="height: 180px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${equipo.nombre}</h5>
                    <p><strong>Entrenador:</strong> ${equipo.entrenador}</p>
                    <p><strong>Pokémon:</strong> ${equipo.pokemones.join(", ")}</p>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });
});