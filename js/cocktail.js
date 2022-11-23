//llamo a fetchData cuando se termina de cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    //array con ingredientes para pasar como parametro aleatorio a la consulta API
    const iPrincipal = ["Tequila", "Vodka", "Gin"]
    const random = getRandomInt(0, 3)

    //paso a fechData un ingrediente
    fetchData(iPrincipal[random])
})


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // Maximo excluido y minimo incluido
  }


//funcion flecha que almaceno en una constante fetchData
const fetchData = async (ingrediente) => {
    try{
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
        const data= await res.json();
        console.log(data);
 
        //recorro el array drinks que esta de ntro del objeto data
        data.drinks.forEach((cocktails) => {
        //console.log(cocktails);
            
            //creo el objeto cocktail
            const cocktail = {
                nombre: cocktails.strDrink,
                img: cocktails.strDrinkThumb
                
            }
            // llamo a la funcion que dibuja la tarjeta del cocktail, pasandole el objeto cocktail y el ingrediente
            pintarCocktail(cocktail,ingrediente)
        });     
    }
    catch(error){
        console.log(error);
    }
}

const pintarCocktail = (cocktail,ingrediente) => {
    console.log(cocktail);
    const lista =document.querySelector('#cocktaillist')
    
    const cardCocktail = document.createElement('article');
    cardCocktail.classList.add('card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h1');
    cardTitle.classList.add('card-body-title');
    cardTitle.textContent = cocktail.nombre


    const cardImg = document.createElement('img');
    cardImg.classList.add('card-body-img');
    cardImg.src= cocktail.img

    document.querySelector('span').textContent = ingrediente
    lista.appendChild(cardCocktail)
    cardCocktail.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardImg)
  
}