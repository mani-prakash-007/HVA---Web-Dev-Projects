const API = "https://api.github.com/users/";
const form = document.getElementById("user-form");
const search = document.getElementById("input-field");
const card_container = document.querySelector('#card-container');



//Adding Repository to Card....

function  addReposToCard(repos) {
    const ReposElement = document.getElementById("repos");
    ReposElement.innerHTML = "";
    const ReposSlice = repos.slice(0,5);
    ReposSlice.forEach((repository) => {
        const Repository = document.createElement("a");
        Repository.classList.add("repo");
        Repository.href = repository.html_url;
        Repository.target = "_blank";
        Repository.innerText = repository.name;
        console.log(repository.name)
        console.log(repository.html_url)
        ReposElement.appendChild(Repository); 
    });
}



//Getting Repository from username
const getRepo = async(userName) => {
    try{
        const data = await fetch(API + userName + "/repos?sort=created");
        const response = await data.json();
        console.log(response);
        console.log(response.length);
        addReposToCard(response);
    }catch(error){
        createErrorCard("Problem Fetching Repository")
    }
}
// const getRepo = async(userName) => {
//         const data = await fetch(API + userName + "/repos?sort=created");
//         const response = await data.json();
//         console.log(response);
//         console.log(response.length);
//         addReposToCard(response);
// }


//Error Card Creating
const createErrorCard = (message) => {
  const cardHTML = `<div class = "card"> <h1>${message}</h1></div>`;
  card_container.innerHTML = cardHTML;
};




//Getting User from Github...
async function getuser(username) {
    try {
        const data = await fetch(API + username);
        const response = await data.json();
        console.log(response);
        card_container.innerHTML = "";
        if(response.message == "Not Found"){
            createErrorCard("No Profile Found")
        }else{
        createUserCard(response);
        getRepo(username);
        }
    } catch (error) {
    if (error.response.status == 404) {
      createErrorCard("No Profile Found");
    }
  }
}

//User Card Creation for search value....
const createUserCard = (user) => {
  const cardHTML = `
    <div class="card">
    <div class="img">
        <img src="${user.avatar_url}" class="avatar" alt="${user.name}">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos}<strong>Repositories</strong></li>
        </ul>
        <div id="repos"></div>
    </div>
    </div>
    `;
    card_container.innerHTML = cardHTML;
};


//submit event for input field......

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = search.value;
  console.log(user)
  if (user) {
    getuser(user);
    search.value="";
  }
});

// const API = "https://api.github.com/users/";
// const form = document.getElementById("user-form");
// const main = document.getElementById("main");

// const createUserCard = (user) => {
//   const cardHTML = `
//     <div class="card">
//       <div class="img">
//         <img src="${user.avatar_url}" class="avatar" alt="${user.name}">
//       </div>
//       <div class="user-info">
//         <h2>${user.name}</h2>
//         <p>${user.bio}</p>
//         <ul>
//           <li>${user.followers}<strong>Followers</strong></li>
//           <li>${user.following}<strong>Following</strong></li>
//           <li>${user.public_repos}<strong>Repositories</strong></li>
//         </ul>
//         <div class="repo" id="repos"></div>
//       </div>
//     </div>
//   `;
//   main.innerHTML = cardHTML;
// };

// const addReposToCard = (repos) => {
//   const ReposElem = document.getElementById("repos");
//   repos.slice(0, 5).forEach((repo) => {
//     const reposElem = document.createElement("a");
//     reposElem.classList.add("repo");
//     reposElem.href = repo.html_url;
//     reposElem.target = "_blank";
//     reposElem.innerText = repo.name;
//     ReposElem.appendChild(reposElem);
//   });
// };

// const getRepo = async (userName) => {
//   try {
//     const { data } = await axios(API + userName + "/repos?sort=created");
//     addReposToCard(data);
//   } catch(error) {
//     createErrorCard("Problem Fetching Repository");
//   }
// };

// const createErrorCard = (message) => {
//   const cardHTML = `<div class="card"> <h1>${message}</h1></div>`;
//   main.innerHTML = cardHTML;
// };

// const getUser = async (username) => {
//   try {
//     const { data } = await axios(API + username);
//     createUserCard(data);
//     getRepo(username);
//   } catch (error) {
//     if (error.response && error.response.status == 404) {
//       createErrorCard("No Profile Found");
//     } else {
//       createErrorCard("Error Occurred");
//     }
//   }
// };

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const user = document.getElementById("form-input").value;
//   if (user) {
//     getUser(user);
//     form.reset();
//   }
// });

