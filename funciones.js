
let contVecesCargadas = 2




function Esconder() {
  document.querySelector("#esconder").style.display = 'none';
}




function CargarDatos() {
  axios
    .get("https://pokeapi.co/api/v2/pokemon/3/")
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function CargarPokemones(url = "https://pokeapi.co/api/v2/pokemon?limit=20") {
  document.querySelector("#esconder").style.display = 'block';
  document.querySelector("#bontonPrincipal").style.display = 'none';


  axios
    .get(url)
    .then((result) => {
      const pokemones = result.data.results;
      document.querySelector("#listado").innerHTML = ""

      pokemones.map((pokemon, index) => {
        const { name, url } = pokemon;


        document.querySelector("#listado").innerHTML += `<div class="col pt-5">
          <div class="card1 rounded zoom" style="width: 18rem;">
            <img class="card-img-top fotoPoke" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png" alt="Card image cap" onclick="CargarDatosPoke('${url}',${index})" data-toggle="modal" data-target="#exampleModal">
              <div class="card-body">
                <h5 class="card-title text-center" onclick="CargarDatosPoke('${url}',${index})"}>${name}</h5>
          </div>

        </div></div>`




      });
    })
    .catch((error) => {
      console.log(error);
    });
}


function CargarDatosPoke(url, index) {

  axios
    .get(url)
    .then((result) => {
      const datosPoke = result.data;
      const { name, base_experience, height, stats } = datosPoke
      console.log(url)
      document.querySelector("#datos").innerHTML = "";
      document.querySelector("#datos").innerHTML += `<center><div class="card" style="width: 18rem;">
      
      <img class="card-img-top" id="img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title pb-1">${name}</h4>
        
       
        <p class="card-text"> XP: ${base_experience}</p>
       
        <p class="card-text">HP: ${stats[0].base_stat}</p>
        
       
       
        <p class="card-text">Ataque: ${stats[1].base_stat}</p>
      
        <p class="card-text">Velocidad: ${stats[5].base_stat}</p>
       
        <p class="card-text">Tipo: ${datosPoke.types[0].type.name}</p>
     
        <button onclick="RotarImagen()" class="btn-danger rounded">Hacer que baile</button>
      </div>
    </div><center>`

    })
    .catch((error) => {
      console.log(error);



    })



}


function RotarImagen() {

  const imagen = document.getElementById('img');
  let espejo = false;
  let zoom = true;

  setInterval(() => {
    espejo = !espejo;
    zoom = !zoom;
    imagen.style.transform = `scaleX(${espejo ? -1 : 1})`;
    imagen.style.transform += `scale(${zoom ? 1 : 1.2})`;
  }, 500);
}


function CargarMasPokemones() {


  let url = "https://pokeapi.co/api/v2/pokemon?limit="
  const cont = 20
  let limite = cont * contVecesCargadas

  let urlConLimite = url + limite
  console.log(urlConLimite)

  CargarPokemones(urlConLimite)
  contVecesCargadas++

}