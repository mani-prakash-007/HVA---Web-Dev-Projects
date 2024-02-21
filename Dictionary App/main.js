// Selecting elements from the DOM
const form = document.querySelector('form');
const searchInput = document.querySelector('#input-field');
const results = document.querySelector('#results');

// Event listener for form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Preventing default form submission behavior
    searchWord(); // Calling the searchWord function
});

// Async function to search for a word
const searchWord = async () => {
    // Extracting and formatting the search value
    let value = searchInput.value.trim();
    const searchvalue = value.toLowerCase();

    console.log(searchvalue); // Logging the search value to the console

    // Displaying a message indicating that the word is being searched for
    results.style.display = "flex";
    results.innerHTML = `<h2>Searching Defnitions for   "${searchvalue}"</h2>`;

    // Fetching data from the API
    const url = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchvalue}`);
    const response = await url.json();
    const data = response;

    console.log(data); // Logging the response data to the console

    // Checking if no definitions are found
    if (data.title == "No Definitions Found") {
        NoMatch(data); // Calling the NoMatch function
    } else {
        AddResults(data); // Calling the AddResults function
    }
}

// Function to handle case where no match is found
const NoMatch = () => {
    // Extracting and formatting the search value
    const Searchvalue = searchInput.value.trim();

    // Displaying a message indicating no match was found
    results.innerHTML = `<h2> No Match found for the word - <i> " ${Searchvalue} "</i></h2>`;
}

// Function to add results to the DOM
const AddResults = (Searchword) => {
    const word = Searchword[0]; // Extracting the first word object from the response

    // Constructing the HTML for displaying the word's details
    const wordContainer = `
        <div class="result-container">
            <h2>Meaning of the Word - ${word.word}</h2>
            <p class="dict-line">Definitions from <a href="https://dictionaryapi.dev/" class="anchor-elem">Free Dictionary</a></p>
            <ul class="spl-list-sound">
                <li class="sound"><i class="fas fa-volume-up"></i> &nbsp; &nbsp; ${word.word}&nbsp;&nbsp;${word.phonetic || ""}</li>
            </ul>
            <h2>Noun</h2>
            <ul>
                <li>&nbsp;${word.meanings && word.meanings[0] && word.meanings[0].definitions && word.meanings[0].definitions[0] ? word.meanings[0].definitions[0].definition : 'Definition not found'}</li>
            </ul>
            <h2>Verb</h2>
            <ul>
                <li>&nbsp;${word.meanings && word.meanings[1] && word.meanings[1].definitions && word.meanings[1].definitions[0] ? word.meanings[1].definitions[0].definition : 'Definition not found'}</li>
            </ul>
            <h2>Reference</h2>
            <p class="dict-line"><a href="${word.sourceUrls && word.sourceUrls[0] ? word.sourceUrls[0] : '#'}" class="anchor-elem" target = "_blank">${word.sourceUrls && word.sourceUrls[0] ? 'Reference URL' : 'No Reference URLs' }</a></p>
            <!-- If there is a reference URL, display it. Otherwise, display 'No Reference URLs' -->
        </div>
    `;

    results.innerHTML = wordContainer; // Displaying the word details in the results container

    const button = document.querySelector('.sound'); // Selecting the sound button
    const WordReader = () => { // Function to read the word
        let QuoteReader = new SpeechSynthesisUtterance(`${word.word}`);
        speechSynthesis.speak(QuoteReader);
    }

    // Event listener for the sound button click
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Preventing default button behavior
        WordReader(); // Calling the WordReader function to read the word
    });
}
