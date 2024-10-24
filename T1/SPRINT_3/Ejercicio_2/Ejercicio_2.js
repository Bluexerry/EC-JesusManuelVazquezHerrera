// Función para obtener la información básica de un Pokémon
async function obtenerInfoBasicaPokemon(nombrePokemon) {
    const pokemonInfoDiv = document.getElementById("pokemonInfo");
    pokemonInfoDiv.innerHTML = ""; // Limpiar contenido previo

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
        if (!respuesta.ok) throw new Error("Pokémon no encontrado");
        const pokemon = await respuesta.json();

        // Crear el contenido a mostrar
        const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const id = pokemon.id;
        const tipos = pokemon.types.map(tipo => tipo.type.name).join(", ");
        const imagen = pokemon.sprites.front_default;

        pokemonInfoDiv.innerHTML = `
            <h3>${nombre} (#${id})</h3>
            <p>Tipos: ${tipos}</p>
            <img src="${imagen}" alt="${nombre}">
        `;
    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Función para comparar dos Pokémon y mostrar todas sus estadísticas
async function compararPokemon(pokemon1, pokemon2) {
    const comparativaPokemonDiv = document.getElementById("comparativaPokemon");
    comparativaPokemonDiv.innerHTML = ""; // Limpiar contenido previo

    try {
        const respuesta1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1.toLowerCase()}`);
        const respuesta2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.toLowerCase()}`);
        if (!respuesta1.ok || !respuesta2.ok) throw new Error("Uno de los Pokémon no fue encontrado");

        const pokemonA = await respuesta1.json();
        const pokemonB = await respuesta2.json();

        // Extraer todas las estadísticas
        const statsA = {
            nombre: pokemonA.name,
            hp: pokemonA.stats[0].base_stat,
            ataque: pokemonA.stats[1].base_stat,
            defensa: pokemonA.stats[2].base_stat,
            ataqueEspecial: pokemonA.stats[3].base_stat,
            defensaEspecial: pokemonA.stats[4].base_stat,
            velocidad: pokemonA.stats[5].base_stat
        };

        const statsB = {
            nombre: pokemonB.name,
            hp: pokemonB.stats[0].base_stat,
            ataque: pokemonB.stats[1].base_stat,
            defensa: pokemonB.stats[2].base_stat,
            ataqueEspecial: pokemonB.stats[3].base_stat,
            defensaEspecial: pokemonB.stats[4].base_stat,
            velocidad: pokemonB.stats[5].base_stat
        };

        // Calcular quién tiene mejores estadísticas generales
        const totalStatsA = Object.values(statsA).slice(1).reduce((a, b) => a + b, 0);
        const totalStatsB = Object.values(statsB).slice(1).reduce((a, b) => a + b, 0);
        const mejorPokemon = totalStatsA > totalStatsB ? statsA.nombre : statsB.nombre;

        // Crear una tabla comparativa con todas las estadísticas
        comparativaPokemonDiv.innerHTML = `
            <table>
                <tr>
                    <th>Estadísticas</th>
                    <th>${statsA.nombre.charAt(0).toUpperCase() + statsA.nombre.slice(1)}</th>
                    <th>${statsB.nombre.charAt(0).toUpperCase() + statsB.nombre.slice(1)}</th>
                </tr>
                <tr>
                    <td>HP</td>
                    <td>${statsA.hp}</td>
                    <td>${statsB.hp}</td>
                </tr>
                <tr>
                    <td>Ataque</td>
                    <td>${statsA.ataque}</td>
                    <td>${statsB.ataque}</td>
                </tr>
                <tr>
                    <td>Defensa</td>
                    <td>${statsA.defensa}</td>
                    <td>${statsB.defensa}</td>
                </tr>
                <tr>
                    <td>Ataque Especial</td>
                    <td>${statsA.ataqueEspecial}</td>
                    <td>${statsB.ataqueEspecial}</td>
                </tr>
                <tr>
                    <td>Defensa Especial</td>
                    <td>${statsA.defensaEspecial}</td>
                    <td>${statsB.defensaEspecial}</td>
                </tr>
                <tr>
                    <td>Velocidad</td>
                    <td>${statsA.velocidad}</td>
                    <td>${statsB.velocidad}</td>
                </tr>
            </table>
            <p><strong>Mejor Pokémon: ${mejorPokemon.charAt(0).toUpperCase() + mejorPokemon.slice(1)}</strong></p>
        `;
    } catch (error) {
        comparativaPokemonDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Función para obtener la cadena evolutiva y habilidades de un Pokémon
async function obtenerCadenaEvolutiva(nombrePokemon) {
    const evolutionInfoDiv = document.getElementById("evolutionInfo");
    evolutionInfoDiv.innerHTML = ""; // Limpiar contenido previo

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon.toLowerCase()}`);
        if (!respuesta.ok) throw new Error("Pokémon no encontrado");

        const species = await respuesta.json();
        const evolutionChainUrl = species.evolution_chain.url;
        const respuestaCadena = await fetch(evolutionChainUrl);
        const evolutionChain = await respuestaCadena.json();

        let evoluciones = [];
        let actual = evolutionChain.chain;

        // Navegar a través de la cadena de evoluciones
        while (actual) {
            evoluciones.push(actual.species.name.charAt(0).toUpperCase() + actual.species.name.slice(1));
            actual = actual.evolves_to[0];
        }

        const habilidades = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`);
        const pokemon = await habilidades.json();
        const listaHabilidades = pokemon.abilities;

        // Mostrar cadena evolutiva sin guiones
        evolutionInfoDiv.innerHTML = `
            <h3>Cadena Evolutiva</h3>
            <p>${evoluciones.join(" &rarr; ")}</p>
            <h4>Habilidades:</h4>
            <ul id="habilidades-list">
                ${listaHabilidades.map(habilidad => `
                    <li>
                        ${habilidad.ability.name.charAt(0).toUpperCase() + habilidad.ability.name.slice(1)}
                        <button onclick="mostrarDescripcionHabilidad('${habilidad.ability.url}')">Ver descripción</button>
                    </li>
                `).join('')}
            </ul>
        `;
    } catch (error) {
        evolutionInfoDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Función para mostrar la descripción de una habilidad en un modal
async function mostrarDescripcionHabilidad(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("No se pudo obtener la descripción de la habilidad");

        const habilidad = await respuesta.json();
        const descripcion = habilidad.effect_entries.find(entry => entry.language.name === "en").effect;

        alert(`Descripción de la habilidad: ${descripcion}`);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
