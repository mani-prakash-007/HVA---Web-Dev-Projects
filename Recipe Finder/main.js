const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const results = document.querySelector('#results');

searchForm.addEventListener('submit' , (event) =>{
    event.preventDefault();
    searchRecipes();
});



const searchRecipes = async() =>{
    const searchValue = searchInput.value.trim();
    results.innerHTML = "<h2>Please Wait Recipes are Loading...</h2>";
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=248a9ca1&app_key=
    c7ccb87ff5991b6e3e04b96faabf212a&form=0to=10`);
    const data = await response.json();
    results.innerHTML = "";

    console.log(data);
    console.log(data.hits);
    displayRecipes(data.hits);
}


function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((dishName) =>{
        html += `
        <div>
            <img src="${dishName.recipe.image}" alt="${dishName.recipe.label}">
            <h3>${dishName.recipe.label}</h3>
            <ul>
                ${dishName.recipe.ingredientLines.map( ingredient => `<li>${ingredient}</li>`)}
            </ul>
            <a href="${dishName.recipe.url}" target="_blank">View Recipe</a>
        </div>
        `
    });
    results.innerHTML = html;
}