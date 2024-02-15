//Unsplash Api 
const apiKey = "BMCL8-yxWvw-tyIzXhgEzQqi3tUTZGAhTsZFWk4H9ts";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");

//Function for Image Fetching using Unsplash API..

let inputdata = "";
let page = 1;

async function searchImage(){
    inputdata = inputElement.value ;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${apiKey}`;

    const response = await fetch(url);
    const responseData = await response.json();

    const results = responseData.results;
    console.log(results);

    if(page === 1){
        searchResult.innerHTML = '';
    }

    results.map((result) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add("result");
        const img = document.createElement('img');
        img.src = result.urls.small;
        img.alt = result.alt_description ;
        const imgLink = document.createElement('a')
        imgLink.href = result.links.html;
        imgLink.target = "_blank" ;
        imgLink.textContent = result.alt_description ;

        //Append the Created elements
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(imgLink);
        searchResult.appendChild(imgWrapper);

    });

    //Images are more Increment Page number
    page++
    if (page > 1) {
        showMore.style.display = "block";
    }

}

formElement.addEventListener("submit", (event)=> {
    event.preventDefault();
    console.log("Working...");
    page = 1;
    searchImage()
})
showMore.addEventListener("click",searchImage);